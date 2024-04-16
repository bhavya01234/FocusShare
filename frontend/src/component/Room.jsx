
// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { useNavigate, Link } from "react-router-dom"
// function Room() {
  
//     const history=useNavigate();


//     return (
//         <div className="room-page">
//             <h1>This is room</h1>
//         </div>
//     );
// }

// export default Room;

import React, { useState, useEffect  } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

function Room() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");






    // below for fetching todos

 //   const [todos, setTodos] = useState([]);

    // Fetch todos from the backend when the component mounts
    // useEffect(() => {
    //     const fetchTodos = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:8001/users/get-todos");
    //             setTodos(response.data);
    //         } catch (error) {
    //             console.error("Error fetching todos: <3", error);
    //         }
    //     };
    //     fetchTodos();
    // }, []);

    // above for fetching todos


    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                console.log("room id printing from room.jsx fetchTodo <7", localStorage.getItem('roomIdls'));
                const roomIdfromlsget = localStorage.getItem('roomIdls');

                
                const response = await axios.post("http://localhost:8001/users/get-todos", {
                roomIdfromlsget
            });
                setTodos(response.data);

                console.log("Task fetched successfully:", response.data);
            } catch (error) {
                console.error("Error fetching todos:      :((((", error);
            }
        };

        fetchTodos();
    }, []);





 async function saveTask(e) {
        e.preventDefault();
        try {

          
            // Retrieve room ID from local storage

            // const roomId = localStorage.getItem("roomId");

            // Check if room ID exists

            // if (!roomId) {
            //     console.error("Room ID not found in local storage");
            //     return;
            // }

            // Validate input

            if (!title.trim()) {
                console.error("Title is required");
                return;
            }



            console.log("room id printing from room.jsx", localStorage.getItem('roomIdls'));
  
            const roomIdfromls = localStorage.getItem('roomIdls');

//here debug
            // Call backend API to save task
            const response = await axios.post("http://localhost:8001/users/rooms-savetodo", {
                title,
                description,
                roomIdfromls
            });
console.log("********************************************************");
        

            console.log("Task saved successfully:", response.data);

            
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };


    
    async function updateTodo(todoId) {
         e.preventDefault();
         try{

         }catch(error){
             console.error("Error updating task:", error);
         }
    }
    return (
        <div className="room-page">
            <h1>This is room</h1>
            <form onSubmit={saveTask}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit">Save Task</button>
            </form>




{/* to get todosssssssssss------------------------------------------------ */}
            {/* <h1>Todos:</h1>
        <ul>
            {todos.map(todo => (
                <li key={todo._id}>{todo}something</li>
            ))}
        </ul> */}

{/* to get todosssssssssss-------------------------------------------------- */}
{/* 
<h1>Todos:</h1>
<ul>
    {todos.map(todo => (
        <li key={todo._id}>{todo}</li>
    ))}
</ul> */}
<h1>Todos:</h1>
<ul>
    {todos.map(todo => (
        <li key={todo._id}>
            <strong>Title:</strong> {todo.title}
            <button onClick={updateTodo(todo._id)}>update item</button><br />
            <strong>Description:</strong> {todo.description}<br /><br/>

        </li>
        
    ))}
    
</ul>

        </div>
    );
}

export default Room;
