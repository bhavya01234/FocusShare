import mongoose from "mongoose";
import {User} from "./user.model.js"
import {Todo} from "./todo.model.js"
const roomSchema =  new mongoose.Schema({

    roomid: {
        required: true,
        type: String,
        unique: true,
    },
    roomname: {
        required: true,
        type: String,
        unique: true,
        trim: true,
    },
    occupancy: {
            required: true,
            type: Number,
            default: 4
        },

    players: [{
        type: mongoose.Schema.Types.ObjectId, // Define players as an array of ObjectIds
        ref: "User" // Reference the User model
    }],

    todo: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Todo" 
    }],

    // todo: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Todo" // Reference the Todo model
    // }
})
export const Room = mongoose.model("Room", roomSchema)