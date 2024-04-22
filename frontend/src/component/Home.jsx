


import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import study from '../images/study.jpg'
import study2 from '../images/study2.jpg'
import study3 from '../images/study3.jpg'
// import locomotive from 'locomotive-scroll'
// import LocomotiveScroll from 'locomotive-scroll'
import study4 from '../images/study4.png'
// import study5 from '../images/study5.jpg'
import { MdOutlineMarkChatRead, MdOutlineUpload } from "react-icons/md";
import { MdOutlineAssignment } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa6";

import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";

// import "./Home.css"
function Home() {
    // const scroll = new LocomotiveScroll();

    const history = useNavigate();
    const [roomid, setRoomId] = useState('');

    const [roomname, setRoomName] = useState('');

    const [occupancy, setOccupancy] = useState('');
    const [participantName, setparticipantName] = useState('');

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
        <>
            <div className="h-screen w-full bg-gradient-to-r from-pink-200 to-purple-900 via-purple-700 relative">
                <div className="p-16 flex flex-col items-center">
                    <div className="flex w-full h-full gap-24">
                        <div className=" w-2/3 h-4/5 rounded-xl p-3 flex flex-col items-center gap-4">
                            <div className="text-5xl text-purple-900 font-bold text-center">Focus Share</div>
                            <div className="w-full h-[0.5px] rounded-full bg-white"></div>
                            <div className="text-2xl text-white tracking-tighter">Empower your study sessions: Join or create rooms to collaborate with friends and track each other's progress effortlessly.</div>
                            <div className="flex items-center justify-center gap-10 mt-10">
                                <div style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${study3})`}} className="font-semibold w-full h-36 text-purple-800 relative justify-between rounded-2xl p-4 border-pink-300 border-2 text-center flex flex-col items-center">
                                    <div>
                                        <MdOutlineUpload className="w-10 h-10 absolute top-4 left-1/2 -translate-x-1/2" />
                                    </div>
                                    Upload assignments and do your to-do lists.
                                </div>
                                <div className="font-semibold w-full h-36 bg-purple-800 text-white relative justify-between rounded-2xl p-4 border-pink-300 border-2 text-center flex flex-col items-center">
                                    <div>
                                        <MdOutlineAssignment className="w-10 h-10 absolute top-4 left-1/2 -translate-x-1/2" />
                                    </div>
                                    See each other's progress with respect to the assignments.
                                </div>
                                <div style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${study4})`}} className="font-semibold w-full h-36 text-purple-800 relative justify-between rounded-2xl p-4 border-pink-300 border-2 text-center flex flex-col items-center">
                                    <div>
                                        <MdOutlineMarkUnreadChatAlt className="w-10 h-10 absolute top-4 left-1/2 -translate-x-1/2" />
                                    </div>
                                    Chat with each other to solve doubts.
                                </div>

                            </div>
                            <div className="text-2xl mt-10 text-purple-900">Success is a journey best traveled together. Join our group path.</div>
                        </div>
                        <div className="w-1/4 h-full mt-24 -mr-16 flex items-center justify-center">
                            {/* <div className="overflow-hidden relative h-screen w-full bg-gradient-to-b from-pink-200 to-purple-900 via-purple-700 flex items-center justify-center">
            <img src={study} className="rounded-full absolute -left-10 -bottom-10 w-[400px] h-[400px] opacity-80 z-0"></img>
            <img src={study2} className="rounded-full absolute -right-10 -bottom-10 w-[400px] h-[400px] opacity-80 z-0"></img> */}
                            {/* <div className="flex gap-60 mb-28 z-10"> */}
                            <div className="p-10 w-[300px] h-[400px] bg-white/30 rounded-lg flex flex-col justify-center items-center gap-10">
                                <h2 className="text-pink-400 tracking-tighter text-5xl font-bold">Create Room</h2>
                                <div className="flex flex-col gap-2">
                                    <div className="text-white text-xl">Create a Room ID</div>
                                    <input className="rounded-md text-purple-900" type="text" placeholder="Room Id" onChange={(e) => { setRoomId(e.target.value) }} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-white text-xl">Enter Room Name</div>
                                    <input className="rounded-md text-purple-900" type="text" placeholder="Room Name" onChange={(e) => { setRoomName(e.target.value) }} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-white text-xl">Set Occupancy</div>
                                    <input className="rounded-md text-purple-900" type="text" placeholder="Occupancy" onChange={(e) => { setOccupancy(e.target.value) }} />
                                </div>
                                <button className="bg-purple-900 hover:text-purple-900 text-white hover:bg-pink-200 p-3 rounded-full border-2 border-pink-400" onClick={handleCreateRoom}>Create Room</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-6 my-10 items-center justify-center">
                    {/* <div className="border-white border-2 rounded-full h-[1px]"></div> */}
                    <div className="text-white text-base">Swipe to join room</div>
                    <FaArrowDown className="animate-bounce text-white rounded-full border-[1px] border-white w-8 h-8 p-2" />
                    {/* <div className="border-white border-2 rounded-full h-[1px]"></div> */}
                </div>
                <div data-scroll data-scroll-section data-scroll-speed=".2" >
                    <div className="w-full h-36 bg-zinc-800 text-white flex items-center justify-center">
                        <Link to="/join" className="bg-pink-400 border-pink-400 border-2 text-purple-900 w-36 py-3 text-center flex justify-center rounded-full hover:bg-purple-900 hover:text-white">Join Room</Link>
                    </div>
                </div>
            </div>





        </>
        // <div className="homepage">

        //     <div className="columns">
        //         {/* <div className="column">
        //             <h3>Join Room</h3>

        //             <input
        //                 type="text"
        //                 placeholder="Room Id"
        //                 onChange={(e) => { setRoomId(e.target.value) }}
        //             />
        //             <button onClick={handleJoinRoom}>Join Room</button>
        //         </div> */}
        //         <div className="column">
        //             <h3>Create Room</h3>
        //             <input
        //                 type="text"
        //                 placeholder="Room Id"
        //                 onChange={(e) => { setRoomId(e.target.value) }}
        //             />
        //             <input
        //                 type="text"
        //                 placeholder="Room Name"
        //                 onChange={(e) => { setRoomName(e.target.value) }}
        //             />
        //             <input
        //                 type="number"
        //                 placeholder="Occupancy"
        //                 onChange={(e) => { setOccupancy(e.target.value) }}
        //             />
        //             <button onClick={handleCreateRoom}>Create Room</button>
        //         </div>
        //     </div>
        //     {/* <Link to="/joinroom" className="link">Join Room</Link> */}

        // </div>
    )
}

export default Home
