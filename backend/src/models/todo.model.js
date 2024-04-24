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
})
export const Todo = mongoose.model("Todo", todoSchema)