// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

// export const verifyTaskIdExists = asyncHandler(async (req, _, next) => {
//     try {
//         // Access the task ID from local storage
//         const taskId = localStorage.getItem(`task_${req.params.taskId}`);

//         // Check if the task ID exists
//         if (!taskId) {
//             throw new ApiError(404, "Task ID not found in local storage");
//         }

//         // Attach the task ID to the request object for later use
//         req.taskId = taskId;

//         // Call the next middleware or route handler
//         next();
//     } catch (error) {
//         // Handle errors
//         throw new ApiError(404, error.message || "Task ID not found");
//     }
// });
