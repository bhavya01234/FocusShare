


import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
// import "./Home.css"
import booksimage from '../images/booksimage.jpg'
import logo from '../images/logo.png'
import { MdExitToApp } from "react-icons/md";

function Home() {

    const history = useNavigate();
    const [roomid, setRoomId] = useState('');

    const [roomname, setRoomName] = useState('');

    const [occupancy, setOccupancy] = useState('');

    //     async function handleJoinRoom(e){
    //         e.preventDefault();

    //         // Function to save room ID to local storage
    // // function saveRoomIdToLocalStorage(roomId) {
    // //   const key = `room_${roomId}`; // Prefix room ID with 'room_'
    // //   localStorage.setItem(key, roomId);
    // // }

    // // // Function to save task ID to local storage
    // // function saveTaskIdToLocalStorage(taskId) {
    // //   const key = `task_${taskId}`; // Prefix task ID with 'task_'
    // //   localStorage.setItem(key, taskId);
    // // }



    //         try{
    //              const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in local storage
    //             console.log("token is thereee :   ", token);
    //             const response = await axios.post("http://localhost:8001/users/joinroom",{
    //                 roomid
    //             },
    //             {
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }
    //             );
    //             console.log("this is joining status    ", response.status);

    //             if (response.status === 201 || response.status === 200) {
    //             console.log(response.status);




    //             console.log("responseeee data of join roommm: ", response.data);
    //             const { data } = response.data; // Access the 'data' object from the response
    //             const { roomIdInstance } = data._id;

    //             console.log("Room id token before setting:", roomIdInstance);

    //             const key = `room_${roomIdInstance}`; // Prefix room ID with 'room_'
    //             localStorage.setItem(key, roomIdInstance);

    //             // localStorage.setItem('roo', accessToken);

    //             console.log("Room id token after setting:", localStorage.getItem('key'));





    //             history("/room", { state: { id: roomname } });

    //         } else if (response.data === "notexist") {
    //             alert("no such room");
    //         }
    //             // .then(response=>{
    //             //     if(response.status==200){
    //             //         console.log(response.status);
    //             //         history("/room",{state:{id:email}})
    //             //     }
    //             //     else if(response.data=="notexist"){
    //             //         alert("User have not joined room")
    //             //     }
    //             // })   .catch(e=>{
    //             //     alert("wrong details")
    //             //     console.log(e.response.data);
    //             // })

    //         }
    //         catch(e){
    //             console.log(e.response.data);

    //         }

    //     }







    //was using
    async function handleCreateRoom(e) {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in local storage
            console.log("token is thereee :   ", token);
            const response = await axios.post("http://localhost:8001/users/createroom", {
                roomid,
                roomname,
                occupancy
            },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("Request Headers:******************");
            console.log("_________", response.request.headers)

            if (response.status === 201) {
                console.log(response.status);


                //added:
                // console.log("responseeee data of create roommm: ", response.data);
                // const { data } = response.data; // Access the 'data' object from the response
                // const { roomIdInstance } = data._id;
                // //const { accessToken } = data; // Extract the 'accessToken' from the 'data' object
                // console.log("Room id token before setting:", roomIdInstance);

                // const key = `room_${roomIdInstance}`; // Prefix room ID with 'room_'
                // localStorage.setItem(key, roomIdInstance);

                // // localStorage.setItem('roo', accessToken);

                // console.log("Room id token after setting:", localStorage.getItem('key'));

                // history("/home", { state: { id: email } });

                //added till here




                history("/joinroom", { state: { id: roomname } });
            } else if (response.data === "notexist") {
                alert("User have not created room");
            }
        } catch (e) {
            console.log(e.response.data);
            alert("Error occurred while creating room");
        }
    }



    return (
        <div className="w-full h-screen bg-contain bg-[--medium] flex items-center flex-col" style={{ backgroundImage: `url(${booksimage})` }}>
            <div className="w-full h-16 flex justify-between px-10 items-center bg-[--light]">
                <img src={logo} />
                <Link to='/joinroom' className="font-bold px-6 py-2 text-[--light] bg-[--dark] rounded-md hover:bg-[--medium] hover:text-[--dark]">Join Room</Link>
            </div>
            <div className="rounded-2xl mt-24 bg-[--light] border-2 border-[--dark] shadow-[--dark] shadow-lg p-6 flex flex-col gap-3 items-center justify-center">
                <div className="mb-4">
                    <label htmlFor="roomid" className="text-[--dark] text-2xl font-semibold">Set Room ID</label>
                    <input value={roomid} onChange={(e) => { setRoomId(e.target.value) }} type="number" id="roomid" className="mt-1 block w-72 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="Room ID" />
                </div>
                <div className="mb-4">
                    <label htmlFor="roomname" className="text-[--dark] text-2xl font-semibold">Set Room Name</label>
                    <input value={roomname} onChange={(e) => { setRoomName(e.target.value) }} type="text" id="roomname" className="mt-1 block w-72 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="Room Name" />
                </div>
                <div className="mb-4">
                    <label htmlFor="occupancy" className="text-[--dark] text-2xl font-semibold">Set Occupancy</label>
                    <input value={occupancy} onChange={(e) => { setOccupancy(e.target.value) }} type="number" id="occupancy" className="mt-1 block w-72 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="Occupancy" />
                </div>
                <div onClick={handleCreateRoom} className="font-bold px-6 py-2 text-[--light] bg-[--dark] rounded-md hover:bg-[--medium] hover:text-[--dark]">Create Room</div>
            </div>
            <footer className="absolute bottom-0 w-full bg-[--dark] text-[--light] text-center py-4">
                <p className="text-sm">Terms and Conditions | Privacy Policy | © 2024 Focus Share. All rights reserved.</p>
            </footer>
            <Link
                to="/" style={{
                    position: "absolute",
                    margin: "4rem",
                    // Adjust width to fit the icon
                    // Adjust height to fit the icon
                    borderRadius: "45%",
                    boxShadow: "0 0 20px 10px rgba(255, 255, 255, 0.9)",// Shadow effect
                    zIndex: 10, // Ensure it's above other elements
                    transition: "box-shadow 0.3s, transform 0.3s", // Add transition for the glowing effect
                }}
                className="absolute m-3 rounded-full w-20 text-[--light] bg-[--dark] h-16 bottom-0 left-5 hover:bg-[#584e41] active:bg-[#494136] flex justify-center items-center text-3xl"
            >
                <MdExitToApp />
            </Link>
        </div>
    )
}

export default Home
