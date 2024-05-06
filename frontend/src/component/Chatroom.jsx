


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
    const socketRef = useRef();
    const token = localStorage.getItem('token');

    useEffect(() => {
        socketRef.current = io('http://localhost:8001', {
            query: { token }
        });

        socketRef.current.on('connect', () => {
            console.log("connected");
        });
        socketRef.current.on('message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const roomIdfromlsget = localStorage.getItem('roomIdls');
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
                setuserid(userid1);

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const sendMessage = async (event) => {
        event.preventDefault();
        try {
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

            socketRef.current.emit('sendMessage', { roomId, message });

            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="w-full max-h-screen overflow-hidden flex items-center flex-col">
            <div className='fixed top-0 w-full h-16 bg-[--dark] flex justify-between items-center px-6 text-[--light] text-3xl'>
                <Link to="/room"><IoArrowBackOutline className="text-[--light]"/></Link>
                <div className='flex justify-center items-center'>
                    Chat Room
                    <span className='ml-4 text-[--medium]'>Stay anonymous</span>
                </div>
                <div></div> {/* Placeholder for spacing */}
            </div>
            <div className="absolute mt-16 w-full h-[650px] -z-10 overflow-y-scroll flex flex-col-reverse" style={{ backgroundImage: `url(${chatbg})`, marginBottom: '50px' }}>
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
    );
};

export default Chatroom;
