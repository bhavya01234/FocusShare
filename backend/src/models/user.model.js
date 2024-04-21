import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {Todo} from "./todo.model.js"
import {Room} from "./room.model.js"
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        
        refreshToken: {
            type: String
        },

        isJoined: {
            type: Boolean,
            default: false,
        },
        socketID: {
            type: String,
        },
        isPartyLeader: {
            type: Boolean,
            default: false
        },
        // todo: [{
        //     type: mongoose.Schema.Types.ObjectId, 
        //     ref: "Todo" 
        // }],


        // Map of room IDs and their corresponding todo arrays
        roomTodos: {
            type: Map,
            of: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }]
        },
    },
    {
        timestamps: true
    }
)

//pre hook -> hook that helps us execute a piece of code just* before an action (here -> save)
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    // used function so this* identifies pw (thats what hooks are)
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    // sign - generates token
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET ,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET ,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)