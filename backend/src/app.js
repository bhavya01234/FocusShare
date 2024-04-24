//correct try

// import express from "express"
// import cors from "cors"
// // kind of crud operations from cookies 
// import cookieParser from "cookie-parser"
// import http from "http"
// import { Server } from "socket.io";


// //////
// const app = express()
// //////

// const server = http.createServer(app);
// const io = new Server(server);

// ///////
// // Enable CORS with specific origin
// const corsOpts = {
//     origin: 'http://localhost:5173', // Specify the exact origin of your frontend
//     credentials: true,
//     methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     exposedHeaders: ['Content-Type']
// };
// app.use(cors(corsOpts));



// //////



// //multiplexing
// io.on('connection', (socket) => {

//     console.log('New WebSocket connection', socket.id);

//     socket.on('sendMessage', async (data) => {
//         try {
//             // Save the message to the database
//             const newMessage = await saveMessageToDatabase(data);
//             console.log(newMessage)
//             // Broadcast the message to all connected clients
//             io.emit('message', newMessage);
//         } catch (error) {
//             console.error('Error saving message:', error);
//         }
//     });

// });
// // io.on('connection', (socket) => {
// //     console.log('New WebSocket connection', socket.id);

// //     socket.on('sendMessage', async (data) => {
// //         try {
// //             // Save the message to the database
// //             const newMessage = await saveMessageToDatabase(data);

// //             // Broadcast the message to all connected clients
// //             io.emit('message', newMessage);
// //         } catch (error) {
// //             console.error('Error saving message:', error);
// //         }
// //     });
// // });










// // to set limit of accepting data 
// app.use(express.json({limit: "16kb"}))

// // urlencoded for making code understand that it is a url in request not a json so handle accordingly :) 
// //extended not needed but it is for adding objects in objects
// app.use(express.urlencoded({extended: true, limit: "16kb"}))

// //for assets
// app.use(express.static("public"))
// app.use(cookieParser())

// //routes import
// import userRouter from "./routes/user.routes.js"
// import chatRouter from "./routes/message.routes.js"
// //routes declaration
// // using middleware (app.use) instead of app.get since we separated everything now
// app.use("/users", userRouter)
// app.use("/chatting", chatRouter)

// // http:/localhost:8000/users/register    -> this is how it will get carried forward 

// export {app}


import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http"
import { Server } from "socket.io";
import { sendMessage } from "./controllers/message.controller.js";
import jwt from "jsonwebtoken";
import { User } from "./models/user.model.js";
import {createMessage} from "./controllers/message.controller.js"
const app = express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Content-Type']
    },
});

const corsOpts = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts));

io.on('connection', async (socket) => {
    const token = socket.handshake.query.token;
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if (!user) {
            throw new Error('Invalid access token');
        }

        socket.user = user;

        console.log('New WebSocket connection', socket.id);

        // socket.on('sendMessage', async (data) => {
        //     console.log(data);
        //     console.log("starrrr"); 
        //     try {
        //         const newMessage = await sendMessage({ ...data, senderId: socket.user._id });
        //         io.emit('message', newMessage);
        //     } catch (error) {
        //         console.error('Error saving message:', error);
        //     }
        // });
        socket.on('sendMessage', async (data) => {
    console.log('Received sendMessage event with data:', data);
    try {
        const newMessage = await createMessage(data.roomId, data.message, socket.user._id);
        io.emit('message', newMessage);
    } catch (error) {
        console.error('Error saving message:', error);
    }
});

        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id);
        });

    } catch (error) {
        console.error('Invalid access token:', error);
        socket.disconnect();
    }
});

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
import chatRouter from "./routes/message.routes.js"

app.use("/users", userRouter)
app.use("/chatting", chatRouter)

export {app, server, io}






// import express from "express"
// import cors from "cors"
// // kind of crud operations from cookies 
// import cookieParser from "cookie-parser"
// import http from "http"
// import { Server } from "socket.io";
// import { sendMessage } from "./controllers/message.controller.js";

// //////
// const app = express()
// //////

// const server = http.createServer(app);
// //const io = new Server(server);
// const io = new Server(server, {
// 	cors: {
// 		origin: 'http://localhost:5173',
// 		credentials: true,
//     methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     exposedHeaders: ['Content-Type']
// 	},
// });
// ///////
// // Enable CORS with specific origin
// const corsOpts = {
//     origin: 'http://localhost:5173', // Specify the exact origin of your frontend
//     credentials: true,
//     methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     exposedHeaders: ['Content-Type']
// };
// app.use(cors(corsOpts));



// //////



// //multiplexing
// io.on('connection', (socket) => {

//     const token = socket.handshake.query.token;
//     console.log("hello socket");
//     console.log('New WebSocket connection', socket.id);

//     socket.on('sendMessage', async (data) => {
//         console.log("swastik");
//         try {
            
//             // Save the message to the database
//             const newMessage = await sendMessage(data);
//             console.log("dataaaa ::: ", data);
//             console.log(newMessage)
//             // Broadcast the message to all connected clients
//             io.emit('message', newMessage);
//             socket.on("disconnect", () => {
// 		console.log("user disconnected", socket.id);
		
// 	});
//         } catch (error) {
//             console.error('Error saving message:', error);
//             console.error('Error stack:', error.stack);

//         }
//     });

// });



// // to set limit of accepting data 
// app.use(express.json({limit: "16kb"}))

// // urlencoded for making code understand that it is a url in request not a json so handle accordingly :) 
// //extended not needed but it is for adding objects in objects
// app.use(express.urlencoded({extended: true, limit: "16kb"}))

// //for assets
// app.use(express.static("public"))
// app.use(cookieParser())

// //routes import
// import userRouter from "./routes/user.routes.js"
// import chatRouter from "./routes/message.routes.js"
// //routes declaration
// // using middleware (app.use) instead of app.get since we separated everything now
// app.use("/users", userRouter)
// app.use("/chatting", chatRouter)

// // http:/localhost:8000/users/register    -> this is how it will get carried forward 

// export {app, server, io}
