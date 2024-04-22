


import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
// import "./Home.css"
function JoinRoom() {

    const history = useNavigate();
    const [roomid, setRoomId] = useState('');

    async function handleJoinRoom(e) {
        e.preventDefault();

        // Function to save room ID to local storage
        // function saveRoomIdToLocalStorage(roomId) {
        //   const key = `room_${roomId}`; // Prefix room ID with 'room_'
        //   localStorage.setItem(key, roomId);
        // }

        // // Function to save task ID to local storage
        // function saveTaskIdToLocalStorage(taskId) {
        //   const key = `task_${taskId}`; // Prefix task ID with 'task_'
        //   localStorage.setItem(key, taskId);
        // }



        try {
            const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in local storage
            console.log("token is thereee :   ", token);
            const response = await axios.post("http://localhost:8001/users/joinroom", {
                roomid
            },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("this is joining status    ", response.status);

            if (response.status === 201 || response.status === 200) {



                console.log(response.status);


                if (response.data) {
                    const { data } = response.data; // Access the 'data' object from the response
                    // const { roomIdInstance } = data._id;
                    const { _id: roomIdInstance } = data;

                    const { roomname: rmname } = data;

                    console.log("Room id token before setting:", roomIdInstance);

                    // const key = `room_${roomIdInstance}`; // Prefix room ID with 'room_'
                    const key = `roomIdls`;
                    localStorage.setItem(key, roomIdInstance);

                    // localStorage.setItem('roo', accessToken);

                    console.log("Room id token after setting:", localStorage.getItem(key));


                    /////////////////////////////////////////////////////////////////




                    history("/room", { state: { id: rmname } });
                } else {
                    console.error("Response data is undefined");
                }

                //correct below
                //             console.log(response.status);

                // /////////////////////////////////////////////////////////////////


                //             console.log("responseeee data of join roommm: ", response.data);
                //             const { data } = response.data; // Access the 'data' object from the response
                //            // const { roomIdInstance } = data._id;
                //            const { _id: roomIdInstance } = data;

                //             console.log("Room id token before setting:", roomIdInstance);

                //             const key = `room_${roomIdInstance}`; // Prefix room ID with 'room_'
                //             localStorage.setItem(key, roomIdInstance);

                //             // localStorage.setItem('roo', accessToken);

                //             console.log("Room id token after setting:", localStorage.getItem(key));


                // /////////////////////////////////////////////////////////////////




                //             history("/room", { state: { id: roomname } });

            } else if (response.data === "notexist") {
                alert("no such room");
            }

        }
        catch (e) {
            console.log(e);

        }

    }







    return (
        <>
            <div className="bg-zinc-900 relative h-screen w-full flex flex-col p-20">
                <div className="text-4xl text-pink-400 font-bold text-center">Join Room</div>
                <div className="flex flex-col mt-20 gap-4 items-center justify-center">
                    <div className="text-white text-xl">Enter Room ID</div>
                    <input className="rounded-md w-72 text-purple-900" type="text"
                        placeholder="Room Id"
                        onChange={(e) => { setRoomId(e.target.value) }} />
                    <button className="mt-20 w-40 bg-purple-900 hover:text-purple-900 text-white hover:bg-pink-200 p-3 rounded-full border-2 border-pink-400" onClick={handleJoinRoom}>Join Room</button>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-60 bg-pink-200 flex items-center justify-center flex-col gap-16">
                    <div className="flex gap-10 items-center justify-center w-full">
                        <div className="w-full bg-purple-900 h-[1px] rounded-full"></div>
                        <p className=" text-purple-900">OR</p>
                        <div className="w-full bg-purple-900 h-[1px] rounded-full"></div>
                    </div>
                    <Link to="/home" className="w-40 bg-zinc-900 hover:text-purple-900 text-center text-white hover:bg-pink-200 p-3 rounded-full border-2 border-pink-400">Create Room</Link>
                </div>
            </div>

        </>
        // <div className="container">

        //     <h1 className="heading">join Room Page</h1>

        //     <div className="column">
        //             <h3>Join Room</h3>

        //             <input
        //                 type="text"
        //                 placeholder="Room Id"
        //                 onChange={(e) => { setRoomId(e.target.value) }}
        //             />
        //             <button onClick={handleJoinRoom}>Join Room</button>
        //         </div>





        // </div>
    )
}

export default JoinRoom