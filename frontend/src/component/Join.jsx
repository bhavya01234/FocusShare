


import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import left from '../images/left.png'
import middle from '../images/middle.png'
import right from '../images/right.png'
import booksimage from '../images/booksimage.jpg'
import { MdExitToApp } from "react-icons/md";

// import "./Home.css"
function JoinRoom (){

   const history=useNavigate();
    const [roomid, setRoomId] = useState('');
    
    async function handleJoinRoom(e){
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



        try{
             const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in local storage
            console.log("token is thereee :   ", token);
            const response = await axios.post("http://localhost:8001/users/joinroom",{
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

           const { roomname: rmname} = data;
            
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
        catch(e){
            console.log(e);

        }

    }



    return (
        <div className="w-full h-screen bg-[--medium] bg-cover flex items-center flex-col" style={{backgroundImage:`url(${booksimage})`}}>
                <div className="w-full h-16 flex justify-between px-10 items-center bg-[--light]">
                    <div className="font-bold text-xl text-[--dark]">Focus Share</div>
                    <Link to='/home' className="font-bold px-6 py-2 text-[--light] bg-[--dark] rounded-md hover:bg-[--medium] hover:text-[--dark]">Create Room</Link>
                </div>
                <div className="rounded-2xl mt-16 bg-[--light] border-2 border-[--dark] shadow-[--dark] shadow-lg p-6 flex flex-col gap-3 items-center justify-center">
                    <div className="mb-4">
                                <label htmlFor="roomid" className="text-[--dark] text-2xl font-semibold">Enter Room ID</label>
                                <input value={roomid} onChange={(e)=>{setRoomId(e.target.value)}} type="number" id="roomid" className="mt-1 block w-72 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="Room ID" />
                            </div>
                    <div onClick={handleJoinRoom} className="font-bold px-6 py-2 text-[--light] bg-[--dark] rounded-md hover:bg-[--medium] hover:text-[--dark]">Join Room</div>
                </div>
                <div>
                    <img src={left} className="scale-[0.7] absolute -bottom-16 left-1/4 -translate-x-[50%]"/>
                    <img src={middle} className="scale-[0.7] absolute -bottom-14 left-1/2 -translate-x-[50%]"/>
                    <img src={right} className="scale-[0.7] absolute -bottom-16 left-3/4 -translate-x-[50%]"/>
                </div>
                <Link 
            to="/" style={{
        position: "absolute",
        margin: "3rem",
         // Adjust width to fit the icon
       // Adjust height to fit the icon
        borderRadius: "45%",
        boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)",// Shadow effect
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

export default JoinRoom