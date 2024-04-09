import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
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


export {
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken,
     changeCurrentPassword, 
    //  getCurrentUser,
     updateAccountDetails,
    //  updateUserAvatar,
    //  updateUserCoverImage,
    //  getUserChannelProfile,
    //  getWatchHistory
    }