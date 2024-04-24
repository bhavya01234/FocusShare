// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// // const socket = io();
// const Chatroom = () => {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     // const roomId = localStorage.getItem('roomIdls');
// let socket;
//         console.log("room id for chat", localStorage.getItem('roomIdls'));
//     const roomId = localStorage.getItem('roomIdls');

//     // Establish WebSocket connection
//     useEffect(() => {
//         //const socket = io(`http://localhost:8001/chatting/getmsgs/${roomId}`);
//         socket = io(`http://localhost:8001`);
//         console.log("chatting with cookieee");
//         // Event listener for receiving messages
//         socket.on('connect', ()=> {

//             console.log("connected");
            
//         });
//         socket.on('message', (data) => {
//             console.log("musicc", data);
//             setMessages((prevMessages) => [...prevMessages, data]);
//         })

//         // Clean up the WebSocket connection on unmount
//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     // Function to send a message
//     const sendMessage = async (event) => {
//         event.preventDefault();
//         try {
//             const token = localStorage.getItem('token'); 

//             // Make a POST request to send the message
//             await axios.post('http://localhost:8001/chatting/sendmsgs', {
//                 roomId,
//                 message
//             },
//             {
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             socket.emit('sendMessage', {roomId, message});
//             // Clear the message input field after sending
//             setMessage('');
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };

//     return (
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
// };

// export default Chatroom;






import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const Chatroom = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const roomId = localStorage.getItem('roomIdls');
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
        socketRef.current.on('connect', ()=> {
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
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            CHAT ROOM
            {/* Display messages */}
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>{msg.senderId}</strong>: {msg.message}
                    </li>
                ))}
            </ul>

            {/* Message input field */}
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            {/* Send button */}
            <button onClick={sendMessage}>Send</button>
        </div>
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
