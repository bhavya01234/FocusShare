// import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

import abstract from '../images/abstract.jpeg'
import chatbg from '../images/chatbg.jpg'
import logo from '../images/logo.png'
const Chatroom = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const roomId = localStorage.getItem('roomIdls');
    const [userid, setuserid] = useState();
    // const [users , setusers] = useState([]);
    const socketRef = useRef();
    const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in local storage
    console.log("token is thereee :   ", token);

    // Establish WebSocket connection
    useEffect(() => {
        socketRef.current = io('http://localhost:8001', {
            query: {
                token,
            }
        });

        console.log("chatting with cookieee");
        // Event listener for receiving messages
        socketRef.current.on('connect', () => {
            console.log("connected");
        });
        socketRef.current.on('message', (data) => {
            console.log("musicc", data);
            setMessages((prevMessages) => [...prevMessages, data]);
        })

        // Clean up the WebSocket connection on unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

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
                const userid1 = localStorage.getItem('userid');
                console.log('userid of this computer is:', userid1);
                setuserid(userid1);
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

    // Function to send a message
    const sendMessage = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');

            // Make a POST request to send the message
            await axios.post('http://localhost:8001/chatting/sendmsgs', {
                roomId,
                message
            },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

            // Emit sendMessage event to the server
            socketRef.current.emit('sendMessage', { roomId, message });

            // Clear the message input field after sending
            setMessage('');
            console.log(messages);

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="w-full max-h-screen overflow-hidden flex items-center flex-col">
            <div className='fixed top-0 w-full h-16 bg-[--dark] flex justify-between items-center px-6 text-[--light] text-3xl'>
                {/* <img src={logo} className="bg-[--medium] rounded-lg h-12 p-2"/> */}

                <Link to="/room"><IoArrowBackOutline className="text-[--light]"/></Link>
                <div className='flex justify-center items-center'>
                    Chat Room
                    <span className='ml-4 text-[--medium]'>Stay anonymous</span>
                </div>
                <div></div> {/* Placeholder for spacing */}
            </div>
            {/* <Link to="/room" className='fixed top-0 w-full h-16 bg-[--light] flex items-center px-6 text-[--dark] text-3xl'><IoArrowBackOutline /></Link> */}
            <div className="absolute mt-16 w-full h-[700px] -z-10 overflow-y-scroll flex flex-col-reverse" style={{ backgroundImage: `url(${chatbg})` }}>
                <div className="gap-5 flex flex-col p-10 w-full" >
                    {messages.map((msg, index) => {
                        const sender = users.find(x => x.id === msg.senderId);
                        const isCurrentUser = userid === sender.id;
                        const messageClass = isCurrentUser ? 'justify-end' : 'justify-start';

                        return (
                            <div key={index} className={`flex ${messageClass}`}>
                                <div className="border-2 border-[--light] p-3 max-w-[50%] w-fit break-all text-lg bg-[--medium] text-[--dark] rounded-2xl flex gap-2 flex-col">
                                    <div className="text-sm font-bold text-black capitalize">{sender.username}</div>
                                    <div>{msg.message}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
            <div className="fixed bottom-0 w-full p-3 bg-[--dark] flex justify-center gap-10">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="rounded-xl w-96 border-2 border-[--dark]"
                />
                <button onClick={sendMessage} className="font-bold px-6 py-2 text-[--light] border-[1px] bg-[#64584a] rounded-md hover:bg-[#584e41] active:bg-[#494136]">Send</button>
            </div>
        </div>
        // <div>
        //     CHAT ROOM
        //     Display messages
        //     <ul>
        //         {
        //         messages.map((msg, index) => (
        //             <li key={index}>
        //                 <strong>{msg.senderId}</strong>: {msg.message}
        //             </li>
        //         ))}
        //     </ul>

        //     Message input field
        //     <input
        //         type="text"
        //         value={message}
        //         onChange={(e) => setMessage(e.target.value)}
        //     />

        //     Send button
        //     <button onClick={sendMessage}>Send</button>
        // </div>
    );
};

export default Chatroom;







// working without socket io

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Chatroom = () => {


//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     console.log("room id for chat", localStorage.getItem('roomIdls'));
//     const roomId = localStorage.getItem('roomIdls');

//     // Function to send a message
//     const sendMessage = async () => {
//         try {

//             const token = localStorage.getItem('token');
//             console.log("token is present in chat room :   ", token);

//             // Make a POST request to send the message
//             await axios.post('http://localhost:8001/chatting/sendmsgs', {
//                 roomId,
//                 message
//             },
//             {
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`
//             }
//         }
//             );

//             // Clear the message input field after sending
//             setMessage('');
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };

//     // Function to retrieve messages for the room
//     const fetchMessages = async () => {
//         try {
//             // Make a GET request to fetch messages for the room
//             const response = await axios.get(`http://localhost:8001/chatting/getmsgs/${roomId}`);
//             setMessages(response.data);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         }
//     };

//     // Fetch messages when the component mounts
//     useEffect(() => {
//         fetchMessages();
//     }, [roomId]); // Fetch messages when roomId changes



//   return (
//         <div>
//             CHAT ROOM
//             {/* Display messages */}
//             <ul>
//                 {messages.map((msg, index) => (
//                     <li key={index}>
//                         <strong>{msg.senderId}</strong>: {msg.message}
//                     </li>
//                 ))}
//             </ul>

//             {/* Message input field */}
//             <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//             />

//             {/* Send button */}
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// }

// export default Chatroom


