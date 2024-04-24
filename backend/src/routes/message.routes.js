import { Router } from "express";
import {sendMessage, getMessagesByRoom} from "../controllers/message.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const  router = Router();


router.route("/sendmsgs").post(verifyJWT, sendMessage);

router.route("/getmsgs/:roomId").get(getMessagesByRoom);



export default router;