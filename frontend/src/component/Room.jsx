import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineUpdate } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { MdDownloadDone } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { MdExitToApp } from "react-icons/md";
import { MdComputer } from 'react-icons/md';

import { useNavigate, Link, useLocation } from "react-router-dom"

function Room() {

    const history = useNavigate();
    const [saved, setsaved] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userid, setuserid] = useState();


    // const location = useLocation();
    // const { id } = location.state;
    // console.log("id in room is:" ,id);

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storeduserid = localStorage.getItem('userid');
        console.log("this is stored user id:", storeduserid)
        if (storeduserid) {
            setuserid(storeduserid);
            // localStorage.removeItem('userid'); // Remove email from storage after reading
        }
        console.log("this is user id:", userid);
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
                // console.log("users users:",users);
                // console.log("response",response.data);
                // localStorage.setItem('users' , response.data);
                // console.log("users in room:",localStorage.getItem('users'));

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
        try {
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

        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }



    async function updateTodo(todoIdd) {
        //e.preventDefault();
        //roomId, taskId, title, description
        try {
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

        } catch (error) {
            console.error("Error updating task:", error);
        }
    }




    async function markTask(userIdd, todoIdd) {
        try {
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
        } catch (error) {
            console.error("Error marking task:", error);
        }
    }



    return (
        <div className="min-h-screen h-full w-full bg-[--medium] text-[--dark]">
            <div className="w-full h-16 flex justify-between px-10 items-center bg-[--light]">
                <div className="font-bold text-xl text-[--dark]">Focus Share</div>
                <div className="flex gap-2">
                    <Link to='/home' className="font-bold px-6 py-2 text-[--light] bg-[--dark] rounded-md hover:bg-[--medium] hover:text-[--dark]">Create Room</Link>
                    <Link to='/joinroom' className="font-bold px-6 py-2 text-[--light] bg-[--dark] rounded-md hover:bg-[--medium] hover:text-[--dark]">Join Room</Link>
                </div>
            </div>
            <div className="p-10 flex items-start justify-center gap-10">

                <div className="flex w-[25%] h-full">
                    <div className="w-full m-4 flex flex-col items-center justify-center gap-4">
                        <form onSubmit={saveTask} className="flex flex-col gap-8">
                            <div className="text-5xl font-bold text-center text-white text-shadow">Create new Goals</div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xl font-bold">Enter Objectives:</label>
                                <input className="border-[--dark] border-2 mt-1 block w-full px-3 py-2 bg-white rounded-md shadow-sm" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xl font-bold">Challenge:</label>
                                <textarea className="w-full h-40 mt-1 px-3 py-2 bg-white border-[--dark] border-2 rounded-md shadow-sm" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                            </div>
                            {saved && <div className="text-green-600 text-xl -mt-6">
                                Task saved successfully!
                            </div>}
                            <button type="submit" className="font-bold px-6 py-2 text-[--light] bg-[--dark] rounded-md hover:bg-[#584e41] active:bg-[#494136]">Launch</button>
                        </form>
                    </div>
                </div>

                <table className="w-[75%] p-2 text-center">
                    <thead className="bg-[--dark] text-[--light]">
                        <th>Objective <br></br>Title</th>
                        <th className="w-40">Challenge<br></br> Description</th>
                        <th>Mark <br></br>as Done/<br></br>Pending</th>
                        <th>Update<br></br> Activity</th>
                        <th>Delete<br></br> Mission</th>
                        {users.map((user) => (
                            <th key={user.id}>{user.username}</th>
                        ))}
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td className="w-60 break-all">{todo.description}</td>
                                <td key={todo.id} onClick={() => markTask(userid, todo.id)} className="hover:bg-[#bdab94] active:bg-[#9a8b79] cursor-pointer"><div className="flex justify-center"><MdDownloadDone /></div></td>
                                <td key={todo.id} onClick={() => updateTodo(todo.id)} className="hover:bg-[#bdab94] cursor-pointer active:bg-[#9a8b79]"><div className="flex justify-center"><MdOutlineUpdate /></div></td>
                                <td key={todo.id} onClick={() => deleteTodo(todo.id)} className="hover:bg-[#bdab94] cursor-pointer active:bg-[#9a8b79]"><div className="flex justify-center text-red-500"><MdDeleteOutline /></div></td>
                                {users.map(user => {
                                    const userTodo = user.todos.find(item => item.id === todo.id);
                                    return (
                                        <>
                                            <td key={`${user.id}-${todo.id}`}>
                                                {userTodo ? (userTodo.status === "completed" ? <div className="flex justify-center text-green-600 text-2xl"><MdDone /></div> : <div className="flex justify-center"><MdOutlinePending /></div>) : null}
                                            </td>
                                        </>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

<Link 
    to="/" 
    className="absolute m-3 rounded-full w-20 text-[--light] bg-[--dark] h-16 bottom-0 left-5 hover:bg-[#584e41] active:bg-[#494136] flex justify-center items-center text-3xl"
    style={{
        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3), -3px -3px 5px rgba(255, 255, 255, 0.3)" // Pop-out effect
    }}
>
    <MdExitToApp />
</Link>

<Link 
    to="/bot" 
    className="absolute m-3 rounded-full w-20 text-[--light] bg-[--dark] h-20 bottom-24 right-5 hover:bg-[#584e41] active:bg-[#494136] flex justify-center items-center text-3xl"
    style={{
        boxShadow: "3px 3px 60px rgba(700, 100, 1600, 3), -3px -3px 5px rgba(155, 205, 855, 0.3)" // Pop-out effect
    }}
>
    <MdComputer />
</Link>

<Link 
    to="/chatroom" 
    className="absolute m-3 rounded-full w-20 text-[--light] bg-[--dark] h-16 bottom-0 right-5 hover:bg-[#584e41] active:bg-[#494136] flex justify-center items-center text-3xl"
    style={{
        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3), -3px -3px 5px rgba(255, 255, 255, 0.3)" // Pop-out effect
    }}
>
    <AiOutlineMessage/>
</Link>

            </div>
    );
}






export default Room;
