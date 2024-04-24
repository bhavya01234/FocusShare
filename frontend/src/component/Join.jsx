


import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
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
        <div className="container">

            <h1 className="heading">join Room Page</h1>

            <div className="column">
                    <h3>Join Room</h3>
                    
                    <input
                        type="text"
                        placeholder="Room Id"
                        onChange={(e) => { setRoomId(e.target.value) }}
                    />
                    <button onClick={handleJoinRoom}>Join Room</button>
                </div>

          
            <p>OR</p>
           

            <Link to="/home" className="link">Create Room</Link>

        </div>
    )
}

export default JoinRoom