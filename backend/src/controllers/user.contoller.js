import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {Room} from "../models/room.model.js"
import {Todo} from "../models/todo.model.js"
// import { verifyRoomIdExists } from "../middlewares/room.middleware.js";
// import { verifyTaskIdExists } from "../middlewares/task.middleware.js";

// import { uploadOnCloud } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

// below no need of asyncHandler since we are not handling any web request
const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // adding value in an object (object -> user)
        user.refreshToken = refreshToken


        await user.save({validateBeforeSave: false}) 
        // (above) here mongoDB properties for validation kick in which will need the required field (eg->pw) in saving the object
        // so to avoid the validations mentioned in model and directly update the needful (here refresh tokens)
        // so => {validateBeforeSave: false}
        // with this, it will skip the checks since we dont need them now, we just need to update one field 
        
        return {accessToken, refreshToken}

    }
    catch(error){
        throw new ApiError(500, "something went wrong while generating tokens")
    }
}


// asynchandler is made by us. it takes a function as a parameter
const registerUser = asyncHandler( async (req, res) => {

    //get user details from frontend
    //validation
    //check if user already exists through a parameter: user, email,etc
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    //create an object - create entry in db
    // remove pw and refresh token field from response
    // check for user creation
    // return res 

    const {fullName, email, username, password} = req.body
    // console.log("email : ", email);

    // if(fullName===""){
    //     throw new ApiError(400, "full name is required");
    // }

    // BETTER APPROACH : (instead of separate if blocks for each mandatory field)

    if(
        // some like map
        [fullName, email, username, password].some((field) => field?.trim() ==="") //means even after trimming its empty)
    ){
        throw new ApiError(400, "all fields are required")
    }

    const existingUser = await User.findOne({
        $or: [{username}, {email}] //if any of these found 
    })

    if(existingUser){
        throw new ApiError(409, "user with same credentials exists ")
    }
    console.log(req.files);

    // Like req.body, multer gives req.files
    // ? means if not null
    // this whole will return the first property's path of image

    // const avatarLocalPath = req.files?.avatar[0]?.path;

    // const coverImageLocalPath = req.files?.coverImage[0]?.path

    // let coverImageLocalPath;
    // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    //     coverImageLocalPath = req.files.coverImage[0].path
    // }

    // if(!avatarLocalPath){
    //     throw new ApiError(400, "avatar image required")
    // }

    // const avatar = await uploadOnCloud(avatarLocalPath)
    // const coverImage = await uploadOnCloud(coverImageLocalPath)

    // if(!avatar){
    //     throw new ApiError(400, "avatar image required")
    // }

    const user = await User.create({
        fullName,
        // avatar: avatar.url,
        // coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // to check if user was actually created and remove pw and refresh tokens
    // select -> accepts string , with minus sign mention things to remove
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "something went wrong while creating user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )



    // res.status(200).json({
    //     message: "chai and code"
    // })
})


const loginUser = asyncHandler(async(req, res) => {
    // req body -> data
    // username / email
    // find user
    // if not exists -> throw error
    // else pw check
    // generate access and refresh tokens 
    // send cookies

    const {email, username, password} = req.body;
    console.log(email)
    if(!username && !email){
        throw new ApiError(400, "username or email required")
    }
    const user = await User.findOne({
        // or takes array 
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "user does not exist")
    }
    const isPwValid= await user.isPasswordCorrect(password);

    if(!isPwValid){
        throw new ApiError(401, "password incorrect. invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    // below -> loggedInUser created cause above user does not have both tokens in its scope 
    // since saving of token happened after the creation of user*
    // instance loggedInUser has tokens

    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken")

    // COOKIES 
    const options = {
        // without below 2 fields, the cookies can be modified by anyone from frontend
        // with these -> only modified by server
        httpOnly: true,
        sameSite: "None",
        secure: true
    }

    // with cookie parser : 
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            //status
            200,
            //data
            {
                user: loggedInUser, accessToken, refreshToken
            },
            //message
            "User logged in successfully"
            //status code will be managed automatically
        )
    )
})

const logoutUser = asyncHandler(async(req, res) => {
    // we cant find user by id here which we need cause we dont have access to it via email or anything unlinke login
    // obviously we wont ask the user to enter email to logout 
    // so we will design our own middleware for the same

    // now we get access to req.user via verifyJWT middleware so we can access _id too

    await User.findByIdAndUpdate(
        req.user._id,
        {
            // $set: {
            //     refreshToken: undefined
            // }

            // whatever field to unset , put 1
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    //cookies
    const options = {
        httpOnly: true,
        sameSite: "None",
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"))

})

const refreshAccessToken = asyncHandler(async(req, res)=>{
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request")
    }

    try{
        const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )

    const user = await User.findById(decodedToken?._id)

    if(!user){
        throw new ApiError(401, "invalid refresh token")
    }

    //now matching whether the ref token sent by user as req (incoming..) and ref token in user is same
    // then only we can give access token

    if(incomingRefreshToken!==user?.refreshToken){
        throw new ApiError(401, "refresh token is expired or used")
    }

    //now generating tokens since everything ok (matched)

    const options={
        httpOnly: true,
        sameSite: "None",
        secure: true
    }

    const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options).json(
        new ApiResponse(
            200,
            {accessToken, refreshToken:newRefreshToken},
            "Access token refreshed"
        )
    )
    }catch(error){
        throw new ApiError(401, error?.message || "invalid refresh token")
    }
})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldpw, newpw} = req.body;

    const user = await User.findById(req.user?._id)
    
    const isPasswordCorrect = await user.isPasswordCorrect(oldpw)

    if(!isPasswordCorrect){
        throw new ApiError(400, "old password incorrect. enter valid one")
    }

    user.password = newpw
    await user.save({validateBeforeSave: false})   // pre hook will be called which will hash this pw

    return res.status(200).json(
        new ApiResponse(200, {}, "password updated successfully")
    )
})

// const getCurrentUser = asyncHandler(async(req, res)=>{
//     return res.status(200)
//     .json(
//         new ApiResponse(200, req.user, "current user fetched successfully")
//     )
// })

const updateAccountDetails = asyncHandler( async(req, res)=> {
    const {fullName, email} = req.body

    if(!fullName || !email){
        throw new ApiError(400, "all fields required")
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email
            }
        },
        {new: true}    // info after update return via this
    ).select("-password")

    return res.status(200)
    .json(
        new ApiResponse(200, user, "account details updated")
    )
})










// // Function to save room ID to local storage
// function saveRoomIdToLocalStorage(roomId) {
//   const key = `room_${roomId}`; // Prefix room ID with 'room_'
//   localStorage.setItem(key, roomId);
// }

// // Function to save task ID to local storage
// function saveTaskIdToLocalStorage(taskId) {
//   const key = `task_${taskId}`; // Prefix task ID with 'task_'
//   localStorage.setItem(key, taskId);
// }



const createroom = asyncHandler(async(req, res) => {
    const {roomid, roomname, occupancy} = req.body
    
    if(
        // some like map
        [roomid, roomname, occupancy].some((field) => field?.trim() ==="") //means even after trimming its empty)
    ){
        throw new ApiError(400, "all fields are required")
    }

    const existingRoom = await Room.findOne({
        // $or: [{username}, {email}] //if any of these found 
        roomid
    })

    if(existingRoom){
        throw new ApiError(409, "room with same credentials exists ")
    }
    console.log(req.files);

    const room = await Room.create({
        
        roomid,
        roomname,
        occupancy,
       // players: [req.user._id]
    })

    
    
    const createdRoom = await Room.findById(room._id).select()
    if(!createdRoom){
        throw new ApiError(500, "something went wrong while creating user")
    }


    req.user.isPartyLeader = true;
    req.user.isJoined = true;

    await req.user.save();
    
    return res.status(201).json(
        new ApiResponse(200, createdRoom, "Room created successfully")
    )
});




const joinroom = asyncHandler(async(req, res) => {
    const {roomid} = req.body
    
    if(
        // some like map
        [roomid].some((field) => field?.trim() ==="") //means even after trimming its empty)
    ){
        throw new ApiError(400, "all fields are required")
    }

    const existingRoom = await Room.findOne({
        // $or: [{username}, {email}] //if any of these found 
        roomid
    })

    if(!existingRoom){
        throw new ApiError(409, "room not found ")
    }

    console.log(req.files);

    if (existingRoom.occupancy <= existingRoom.players.length) {
        throw new ApiError(409, "Room is full");
    }

    // Check if the user is already in the room
    // if (existingRoom.players.includes(req.user._id)) {
    //     throw new ApiError(409, "User is already in the room");
    // }

      if (existingRoom.players.includes(req.user._id)) {
        // If user is already in the room, return a successful response
        return res.status(200).json(
            new ApiResponse(200, existingRoom, "User is already in the room")
        );
    }


     const room = await Room.findOneAndUpdate(
        { roomid },
        { $push: { players: req.user._id } },
        { new: true }
    );

    
    
    const joinedroom = await Room.findById(room._id).select()
    if(!joinedroom){
        throw new ApiError(500, "something went wrong while creating user")
    }

    // Update user fields
   
    req.user.isJoined = true;

    // Save the updated user in the database
    await req.user.save();
    // saveRoomIdToLocalStorage(room._id);
    // console.log("local storage room id saved while joing ******", room._id)

    return res.status(201).json(
        new ApiResponse(200, joinedroom, "Room entered successfully")
    )
});

// const saveToDo = (req, res) => {
//   const { title, description} = req.body;
//   if(
//         // some like map
//         [title].some((field) => field?.trim() ==="") //means even after trimming its empty)
//     ){
//         throw new ApiError(400, "title required")
//     }

//     const todoItem = await Todo.create({
//         title,
//         description,
//     });

//     if(!todoItem){
//         throw new ApiError(500, "something went wrong while creating user")
//     }


//     // const { roomId } = req.params;
//     room.todo = todoItem._id;

//     const roomFound = await Room.findByIdAndUpdate(room._id){

//     }
//     await room.save();


//     return res.status(201).json(
//         new ApiResponse(200, createdUser, "User registered successfully")
//     )
// };





console.log('hiiiiiiiii');




const saveToDo = asyncHandler(async (req, res) => {
    const { title, description, roomIdfromls } = req.body;

console.log("hellooooooo");
    // Validation
    if (!title || title.trim() === "") {
        return res.status(400).json({ error: "Title is required" });
    }

    if (!roomIdfromls || roomIdfromls.trim() === "") {
        return res.status(400).json({ error: "roomid is required to add task" });
    }

    try {
        

        // Create ToDo item
        const todoItem = await Todo.create({
            title,
            description,
        });

        // Find the room by ID and update it to push the todoItem's ID into the todo array
        const room = await Room.findByIdAndUpdate(
            roomIdfromls,
            { $push: { todo: todoItem._id } },
            { new: true }
        );

        // Check if the room exists
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

         //saveTaskIdToLocalStorage(todoItem._id);
        
        return res.status(201).json({ message: "ToDo item created and added to the room successfully" });
    } catch (error) {
        console.error("Error saving ToDo item:", error);
        return res.status(500).json({ error: "Something went wrong while saving ToDo item" });
    }
});





// const getToDos = asyncHandler(async (req, res) => {
//     const toDos = await Todo.find();
//         res.send(toDos);
        
// });



const getToDos = asyncHandler(async (req, res) => {
    try {
        const { roomIdfromlsget } = req.body;

        if (!roomIdfromlsget || roomIdfromlsget.trim() === "") {
            return res.status(400).json({ error: "roomid is required to fetch todo list" });
        }
        console.log('linelineline888888******************&&&&&&&&&&&');
const roomId = new mongoose.Types.ObjectId(roomIdfromlsget);

        console.log("Converted room ID:", roomId);

        const room = await Room.aggregate([
            { $match: { _id: roomId } },
            { $unwind: "$todo" }, // Unwind the todo array
            {
                $lookup: {
                    from: "todos", // Collection to perform the lookup
                    localField: "todo", // Field from the current collection
                    foreignField: "_id", // Field from the foreign collection
                    as: "todoDetails" // Output array field
                }
            },
            { $unwind: "$todoDetails" }, // Unwind the result of the lookup
            {
                $group: {
                    _id: "$_id", // Group by room id
                    // todos: { $push: "$todoDetails.title" } // Push todo titles into an array
                    todos: { 
                        $push: { 
                            title: "$todoDetails.title", 
                            description: "$todoDetails.description" 
                        } 
                    }
                }
            }
        ]);

        

        if (!room || room.length === 0) {
            throw new ApiError(404, "Room not found or empty");
        }

        res.status(200).json(room[0].todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "Something went wrong while fetching todos" });
    }
});




console.log("earlier getdo")
// const getToDos = asyncHandler(async (req, res) => {
//     try {
//         const { roomIdfromlsget } = req.body; // Assuming roomId is sent in the request body
//         // Find todos associated with the roomId
//         //const room = await Room.find({ room_id: roomId }); // Adjust this query based on your schema
 
 
//         if (!roomIdfromlsget || roomIdfromlsget.trim() === "") {
//         return res.status(400).json({ error: "roomid is required to add task" });
//     }

// //     console.log("hiiiiiiiiideeeeeeee_#_!@_#E_@_#_##__3");
// // console.log(roomIdfromlsget);
// // console.log("hiiiiiiiiideeeeeeee_#_!@_#E_@_#_##__3");
//         const room = await Room.findOne({ _id: roomIdfromlsget });
//         console.log("roommmmmm <<<<<", room);
//         if(!room){
//             throw new ApiError(404, "room not found to fetch todo list");
//         }
//         // console.log(")))))))))))))))))))))))))))");
//         // console.log(room.todo);
//         // console.log(")))))))))))))))))))))))))))");
       
//         //const toDos = await Todo.find();

//         res.status(200).json(room.todo);
//         // res.status(200).json(toDos);
//     } catch (error) {
//         console.error("Error fetching todos:", error);
//         res.status(500).json({ error: "Something went wrong while fetching todos" });
//     }
// });



console.log("separator******************************************************");
// Correct savetask earlier without adding roomid via local 

// const saveToDo = asyncHandler(async (req, res) => {
//     const { title, description } = req.body;

//     // Validation
//     if (!title || title.trim() === "") {
//         return res.status(400).json({ error: "Title is required" });
//     }

//     try {
//         // Retrieve roomId from the request object
//         const roomId = req.roomId;

//         // Check if roomId exists
//         if (!roomId) {
//             return res.status(404).json({ error: "Room ID not found in request" });
//         }

//         // Create ToDo item
//         const todoItem = await Todo.create({
//             title,
//             description,
//         });

//         // Find the room by ID and update it to push the todoItem's ID into the todo array
//         const room = await Room.findByIdAndUpdate(
//             roomId,
//             { $push: { todo: todoItem._id } },
//             { new: true }
//         );

//         // Check if the room exists
//         if (!room) {
//             return res.status(404).json({ error: "Room not found" });
//         }

//          saveTaskIdToLocalStorage(todoItem._id);

//         return res.status(201).json({ message: "ToDo item created and added to the room successfully" });
//     } catch (error) {
//         console.error("Error saving ToDo item:", error);
//         return res.status(500).json({ error: "Something went wrong while saving ToDo item" });
//     }
// });

//past


// const saveToDo = asyncHandler( async (req, res) => {
//     const { roomId } = req.params;
//     const { title, description } = req.body;

//     // Validation
//     if (!title || title.trim() === "") {
//         return res.status(400).json({ error: "Title is required" });
//     }

//     try {
//         // Create ToDo item
//         const todoItem = await Todo.create({
//             title,
//             description,
//         });

//         // Find the room by ID and update it to push the todoItem's ID into the todo array
//         const room = await Room.findByIdAndUpdate(
//             roomId, // Pass roomId as an object
//             { $push: { todo: todoItem._id } },
//             { new: true } // To return the updated room document
//         );

//         // Check if the room exists
//         if (!room) {
//             return res.status(404).json({ error: "Room not found" });
//         }

//         return res.status(201).json({ message: "ToDo item created and added to the room successfully" });
//     } catch (error) {
//         console.error("Error saving ToDo item:", error);
//         return res.status(500).json({ error: "Something went wrong while saving ToDo item" });
//     }
// });


const deleteTask = asyncHandler( async (req, res) => {
    const { roomId, taskId } = req.params; // Access the taskId from req.params

    try {
        // Find the room by ID and update it to pull the taskId from the todo array
        const room = await Room.findByIdAndUpdate(
            roomId,
            { $pull: { todo: taskId } },
            { new: true }
        );

        // Check if the room exists
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        // Delete the task from the Todo collection
        await Todo.findByIdAndDelete(taskId);

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({ error: "Something went wrong while deleting the task" });
    }
});


const updateTask = async (req, res) => {
    const { roomId, taskId } = req.params;
    const { title, description } = req.body;

    // Check if title is provided
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    try {
        // Find the room by ID
        const room = await Room.findById(roomId);

        // Check if the room exists
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        // Find the task by ID
        const task = await Todo.findById(taskId);

        // Check if the task exists
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Update task properties
        task.title = title;
        if (description) {
            task.description = description;
        }

        // Save the updated task
        await task.save();

        return res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ error: "Something went wrong while updating the task" });
    }
};



const markTaskCompleted = asyncHandler( async (req, res) => {
    const { roomId, taskId } = req.params;

    try {
        // Find the room by ID
        const room = await Room.findById(roomId);

        // Check if the room exists
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        // Find the task by ID
        const task = await Todo.findById(taskId);

        // Check if the task exists
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Update the task status to "completed"
        task.status = "completed";

        // Save the updated task
        await task.save();

        return res.status(200).json({ message: "Task marked as completed successfully", task});
    } catch (error) {
        console.error("Error marking task as completed:", error);
        return res.status(500).json({ error: "Something went wrong while marking the task as completed" });
    }
});


export {
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken,
     changeCurrentPassword, 
     updateAccountDetails,
     createroom,
     joinroom,
     saveToDo,
     deleteTask,
     updateTask,
     markTaskCompleted,
     getToDos
    }