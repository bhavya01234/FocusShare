// // import { Room } from "./room.model.js";

// // // Middleware function to verify if the room exists
// // export const verifyROOM = async (req, res, next) => {
// //     try {
// //         const { roomId } = req.params;
// //         const room = await Room.findById(roomId);
// //         if (!room) {
// //             return res.status(404).json({ error: "Room not found" });
// //         }
// //         req.room = room; // Attach the room to the request object for later use
// //         next();
// //     } catch (error) {
// //         console.error("Error verifying room:", error);
// //         res.status(500).json({ error: "Internal server error" });
// //     }
// // };



// // import { ApiError } from "../utils/ApiError.js";
// // import { asyncHandler } from "../utils/asyncHandler.js";
// // import { Room } from "../models/room.model.js";

// // export const verifyRoomExists = asyncHandler(async (req, _, next) => {
// //     try {
// //         // Access the room ID from local storage
// //         const roomId = localStorage.getItem('roomId');

// //         // Find the room by ID
// //         const room = await Room.findById(roomId);

// //         // Check if the room exists
// //         if (!room) {
// //             throw new ApiError(404, "Room not found in local storage");
// //         }

// //         // Attach the room ID to the request object for later use
// //         req.roomId = roomId;

// //         // Call the next middleware or route handler
// //         next();
// //     } catch (error) {
// //         // Handle errors
// //         throw new ApiError(404, error.message || "Room not found");
// //     }
// // });



// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";


// export const verifyRoomIdExists = asyncHandler(async (req, _, next) => {
//     try {
//         // Access the task ID from local storage
//         const roomId = localStorage.getItem(`room_${req.params.RoomId}`);

//         // Check if the task ID exists
//         if (!roomId) {
//             throw new ApiError(404, "ROOM ID not found in local storage");
//         }

//         // Attach the task ID to the request object for later use
//         req.roomId = roomId;

//         // Call the next middleware or route handler
//         next();
//     } catch (error) {
//         // Handle errors
//         throw new ApiError(404, error.message || "ROOM ID not found :(");
//     }
// });
