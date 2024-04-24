


import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
// import "./Home.css"
function Home (){

   const history=useNavigate();
    const [roomid, setRoomId] = useState('');
    
    const[roomname, setRoomName] = useState('');

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
        <div className="homepage">

            <div className="columns">
                {/* <div className="column">
                    <h3>Join Room</h3>
                    
                    <input
                        type="text"
                        placeholder="Room Id"
                        onChange={(e) => { setRoomId(e.target.value) }}
                    />
                    <button onClick={handleJoinRoom}>Join Room</button>
                </div> */}
                <div className="column">
                    <h3>Create Room</h3>
                    <input
                        type="text"
                        placeholder="Room Id"
                        onChange={(e) => { setRoomId(e.target.value) }}
                    />
                    <input
                        type="text"
                        placeholder="Room Name"
                        onChange={(e) => { setRoomName(e.target.value) }}
                    />
                    <input
                        type="number"
                        placeholder="Occupancy"
                        onChange={(e) => { setOccupancy(e.target.value) }}
                    />
                    <button onClick={handleCreateRoom}>Create Room</button>
                </div>
            </div>
            {/* <Link to="/joinroom" className="link">Join Room</Link> */}

        </div>
    )
}

export default Home
