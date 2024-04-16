import mongoose from "mongoose";

const todoSchema =  new mongoose.Schema({

    title: {
        required: true,
        type: String,
       
    },
    description: {
        type: String,
    },
    
    status: { 
        type: String,
        enum: ['pending', 'completed'], 
        default: 'pending' 
    },
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },    
})
export const Todo = mongoose.model("Todo", todoSchema)