import React, { useState, useEffect  } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

function Room() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                console.log("room id printing from room.jsx fetchTodo <7", localStorage.getItem('roomIdls'));
                const roomIdfromlsget = localStorage.getItem('roomIdls');


                const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in local storage
                console.log("token is thereee :   ", token);
                

                const response = await axios.post("http://localhost:8001/users/get-todos", {
                roomIdfromlsget
            },
            {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
            );
                setTodos(response.data);

                console.log("Task fetched successfully:", response.data);
            } catch (error) {
                console.error("Error fetching todos:      :((((", error);
            }
        };

        fetchTodos();
    }, []);


////////////////


 const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log("room id printing from room.jsx fetchUsers <7", localStorage.getItem('roomIdls'));
                const roomIdfromlsget = localStorage.getItem('roomIdls');


                const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in local storage
                console.log("token is thereee :   ", token);
                

                const response = await axios.post("http://localhost:8001/users/get-users", {
                    roomIdfromlsget
                },
            {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
            );
                setUsers(response.data);

                console.log("Users fetched successfully:", response.data);
            } catch (error) {
                console.error("Error fetching users:      :((((", error);
            }
        };

        fetchUsers();
    }, []);

/////////////////


 async function saveTask(e) {
        e.preventDefault();
        try {
            if (!title.trim()) {
                console.error("Title is required");
                return;
            }



            console.log("room id printing from room.jsx", localStorage.getItem('roomIdls'));
  
            const roomIdfromls = localStorage.getItem('roomIdls');

//here debug
 const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in local storage
            console.log("token is thereee :   ", token);
            // Call backend API to save task
            const response = await axios.post("http://localhost:8001/users/rooms-savetodo", {
                title,
                description,
                roomIdfromls
            },
            {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
            );
console.log("********************************************************");
        

            console.log("Task saved successfully:", response.data);

            
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };


    async function deleteTodo(todoIdd) {
         //e.preventDefault();
         //roomId, taskId, title, description
         try{
             console.log("room id printing from room.jsx for update", localStorage.getItem('roomIdls'));
            
            const roomIdfromls = localStorage.getItem('roomIdls');
            console.log(roomIdfromls, todoIdd);
            
             const response = await axios.delete("http://localhost:8001/users/rooms-deletetodo", {
            //  roomIdfromls,
            //  todoIdd,

            // note: whenenever deleting task, this is how req.body data is passed
            data: { roomIdfromls, todoIdd }
            });

            console.log("___+++__");
            console.log("long time no see <><<<<<>>>>>>");
            console.log("Task Deleted successfully:", response.data);

         }catch(error){
             console.error("Error deleting task:", error);
         }
    }


    
    async function updateTodo(todoIdd) {
         //e.preventDefault();
         //roomId, taskId, title, description
         try{
             console.log("room id printing from room.jsx for update", localStorage.getItem('roomIdls'));
             const updatedTitle = prompt("Enter new title:", title); // Prompt the user to enter a new title
            const updatedDescription = prompt("Enter new description:", description); // Prompt the user to enter a new description

            const roomIdfromls = localStorage.getItem('roomIdls');
            console.log(roomIdfromls, todoIdd, updatedTitle, updatedDescription);
            const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in local storage
                console.log("token is thereee to update task ... :   ", token);
                
             const response = await axios.put("http://localhost:8001/users/rooms-updatetodo", {
             roomIdfromls,
             todoIdd,
            //  title, 
            //  description
            title: updatedTitle,
            description: updatedDescription
            },
            {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
          }
            );

            console.log(title);
            console.log(description);
            console.log("___+++__");
            console.log("long time no see <><<<<<>>>>>>");
            console.log("Task updated successfully:", response.data);

         }catch(error){
             console.error("Error updating task:", error);
         }
    }




    async function markTask(userIdd, todoIdd){
      try{
         console.log("room id printing from room.jsx", localStorage.getItem('roomIdls'));
  
            const roomIdfromls = localStorage.getItem('roomIdls');
            console.log("55555")
            console.log(roomIdfromls);

            const token = localStorage.getItem('token'); 
            console.log("token is thereee :   ", token);

            const response = await axios.put("http://localhost:8001/users/rooms-marktask", {
                userIdd,
                roomIdfromls,
                todoIdd
            },
            {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
            );
            
              console.log("Task updated successfully:", response.data);
      }catch(error){
        console.error("Error marking task:", error);
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


<h1>Todos:</h1>


<ul>
    {todos.map(todo => (
        <li key={todo._id}>
            
            <strong>Title:</strong> {todo.title}
            <button onClick={() => updateTodo(todo.id)}>Update item</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete item</button><br/>
            
            <strong>Description:</strong> {todo.description} 
            <input type="checkbox" id={`todo-${todo._id}`} /> 
        </li> 
     ))}
 </ul>






<h1>Users</h1>
<ul>
  {users.map(user => (
    <li key={user.id}>
      <strong>Username:</strong> {user.username}
      <ul>
        {user.todos && user.todos.map(todo => (
          <li key={todo.id}>
            <strong>Title:</strong> {todo.title}
            <br />
            <strong>Description:</strong> {todo.description}
            <br />
            <strong>Status:</strong> {todo.status}
            <button onClick={() => markTask(user.id, todo.id)}>Mark Done</button>
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>







{/* 
 <h1>Users</h1>
<ul>
  {users.map(user => (
    <li key={user.id}>
      <strong>Username:</strong> {user.username}
      
      <ul>
        {Object.entries(user.roomTodos).map(([roomId, todoList]) => (
          <li key={roomId}>
           
            <ul>
              {todoList.map(todo => (
                <li key={todo.id}>
                  <strong>Title:</strong> {todo.title}
                  <br />
                  <br />
                  <strong>Status:</strong> {todo.status}
                   <button onClick={() => markTask(user.id,todo.id)}>Mark Done</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul> */}

        </div>
    );
}






export default Room;
