import { Router } from "express";
import { changeCurrentPassword, 
    loginUser,
     logoutUser, 
     refreshAccessToken,
      registerUser, 
     updateAccountDetails, 
     createroom,
     joinroom,
     saveToDo,
     getToDos,
     deleteTask,
     updateTask,

     markTaskDummyMe,
     getUsersInRoomDummy
       } from "../controllers/user.contoller.js";
// import { verifyTaskIdExists } from "../middlewares/task.middleware.js";
// import { verifyRoomIdExists } from "../middlewares/room.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { verifyROOM } from "../middlewares/room.middleware.js";

// import {upload} from "../middlewares/multer.middleware.js"
const  router = Router();

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

//secured routes (sure that user is already logged in)

router.route("/logout").post(verifyJWT ,logoutUser)
//next written cause of such cases only where two methods are supposed to be carried out
// next tells that my work is done now you can move forward (can do with multiple middlewares)

router.route("/refresh-token").post(refreshAccessToken)

// applying verifyJWT whereever we need the user to be logged in to perform the following operation
router.route("/change-password").post(verifyJWT, changeCurrentPassword)

//patch to update only required field else all will be updated with post
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

// two middlewares used in order: fristly we need user to be logged in 
// and then only we can check for multer middleware

// router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

// router.route("cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)



router.route("/createroom").post(verifyJWT, createroom)

router.route("/joinroom").post(verifyJWT, joinroom)





router.route("/rooms-savetodo").post(verifyJWT, saveToDo);

router.route("/get-todos").post(verifyJWT, getToDos);

router.route("/rooms-updatetodo").put(verifyJWT, updateTask);

router.route("/rooms-deletetodo").delete(deleteTask);




router.route("/get-users").post(verifyJWT, getUsersInRoomDummy);

router.route("/rooms-marktask").put(verifyJWT, markTaskDummyMe);


//past

// router.post("/rooms/:roomId/savetodo", saveToDo);

// router.delete("/rooms/:roomId/deletetask/:taskId", deleteTask);

// router.put("/rooms/:roomId/updatetask/:taskId", updateTask);

// router.put("/rooms/:roomId/tasks/:taskId/complete", markTaskCompleted);

export default router;