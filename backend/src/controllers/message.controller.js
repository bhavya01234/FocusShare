
import {Message} from "../models/message.model.js"

// const sendMessage = async (data) => {
//     const { roomId, message, senderId } = data;
//     //const senderId = req.user._id; //auth middleware
//     try {
//         // Create a new message
//         const newMessage = new Message({
//             roomId,
//             senderId,
//             message
//         });

//         // Save the message to the database
//         await newMessage.save();
//         console.log(newMessage);
//         // Broadcast the message to all users in the room via WebSocket
//         // This step depends on your WebSocket implementation
//         // You would emit the message to the appropriate room here

//         return res.status(201).json({ message: "Message sent successfully" });
//     } catch (error) {
//         console.error("Error sending message:", error);
//         return res.status(500).json({ error: "Something went wrong while sending the message" });
//     }
// };


const createMessage = async (roomId, message, senderId) => {
    if (!message) {
        throw new Error('Missing message data');
    }

    try {
        // Create a new message
        const newMessage = new Message({
            roomId,
            senderId,
            message
        });

        // Save the message to the database
        await newMessage.save();
        console.log(newMessage);
        
        // Return the new message
        return newMessage;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

const sendMessage = async (req, res) => {
    const { roomId, message } = req.body;
    const senderId = req.user._id;

    try {
        const newMessage = await createMessage(roomId, message, senderId);
        return res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ error: "Something went wrong while sending the message" });
    }
};




// last start
// const sendMessage = async (data) => {
//     const { roomId, message, senderId } = data;

//     if (!message) {
//         throw new Error('Missing message data');
//     }

//     try {
//         // Create a new message
//         const newMessage = new Message({
//             roomId,
//             senderId,
//             message
//         });

//         // Save the message to the database
//         await newMessage.save();
//         console.log(newMessage);
        
//         // Return the new message
//         return newMessage;
//     } catch (error) {
//         console.error("Error sending message:", error);
//         throw error;
//     }
// };

// const sendMessage = async (req, res) => {
//     const { roomId, message } = req.body;
//     const senderId = req.user._id; // Assuming you store sender information in the request object

//     try {
//         // Create a new message
//         const newMessage = new Message({
//             roomId,
//             senderId,
//             message
//         });

//         // Save the message to the database
//         await newMessage.save();

//         // Emit newMessage event to all connected sockets
//         // io.emit("newMessage", newMessage);

//         // Return response with the new message
//         return res.status(201).json(newMessage);
//     } catch (error) {
//         console.error("Error sending message:", error);
//         return res.status(500).json({ error: "Something went wrong while sending the message" });
//     }
// };


const getMessagesByRoom = async (req, res) => {
    const roomId = req.params.roomId;

    try {
        // Retrieve messages for the specified room from the database
        const messages = await Message.find({ roomId });

        return res.status(200).json(messages);
    } catch (error) {
        console.error("Error retrieving messages:", error);
        return res.status(500).json({ error: "Something went wrong while retrieving messages" });
    }
};

export {sendMessage, getMessagesByRoom, createMessage}




// import { Message } from "../models/message.model.js";

// const sendMessage = async (io, data) => {
//     try {
//         // Extract roomId and message from data
//         const { roomId, message } = req.body;

//         // Get senderId from authenticated user
//         const senderId = req.user._id; // Assuming you store user information in the socket

//         // Create a new message
//         const newMessage = new Message({
//             roomId,
//             senderId,
//             message
//         });

//         // Save the message to the database
//         await newMessage.save();

//         // Broadcast the message to all users in the room via WebSocket
//         io.to(roomId).emit('message', newMessage);

//         return newMessage;
//     } catch (error) {
//         console.error('Error sending message:', error);
//         throw error; // Rethrow the error to handle it in the caller
//     }
// };

// const getMessagesByRoom = async (req, res) => {
//     const roomId = req.params.roomId;

//     try {
//         // Retrieve messages for the specified room from the database
//         const messages = await Message.find({ roomId });

//         return res.status(200).json(messages);
//     } catch (error) {
//         console.error("Error retrieving messages:", error);
//         return res.status(500).json({ error: "Something went wrong while retrieving messages" });
//     }
// };

// export { sendMessage, getMessagesByRoom };
