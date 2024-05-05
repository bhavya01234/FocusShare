import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import booksimage from '../images/booksimage.jpg'
import groupstudy from '../images/groupstudy.png'
// import "./Signup.css"

function Login() {

    const history = useNavigate();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userid, setuserid] = useState();

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8001/users/login", {
                email,
                username,
                password
            });

            console.log("Response from backend:", response); // Check the entire response object

            if (response.status === 200) {
                console.log("responseeee data: ", response.data);
                const { data } = response.data; // Access the 'data' object from the response
                console.log(data);
                console.log("id is: ", data.user._id);
                setuserid(data.user._id);
                localStorage.setItem('userid', data.user._id);
                console.log("hello:", localStorage.getItem('userid'));

                // history.push("/room", { id: data.user._id });
                const { accessToken } = data; // Extract the 'accessToken' from the 'data' object
                console.log("Access token before setting:", accessToken);
                localStorage.setItem('token', accessToken);
                console.log("Access token after setting:", localStorage.getItem('token'));
                history("/joinroom", { state: { id: email } });
            } else if (response.data === "notexist") {
                alert("User has not signed up");
            } else {
                alert("Login failed. Please try again.");
            }
        } catch (e) {
            console.error("Error:", e);
            alert("An error occurred. Please try again later.");
        }
    }



    return (
        <div className="bg-[--light] w-full h-screen">
            <div className="flex w-full h-full">
                <div className="w-1/3 h-full bg-[--medium] flex p-[32px] items-center flex-col relative">
                    <img src={booksimage} className="w-[400px] h-[500px]" />
                    <img src={groupstudy} className="absolute bottom-0 left-1/2 -translate-x-[50%]" />
                </div>
                <div className="w-2/3 h-full flex items-center justify-center">
                    <div className="p-10 gap-6 bg-[#fff8f2] shadow-[--dark] shadow-lg rounded-xl flex flex-col items-center justify-center">
                        <div className="text-[--dark] font-bold text-5xl italic">Focus Share</div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter Email Address</label>
                            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" id="email" className="mt-1 block w-72 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="Enter Email Address" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Enter Username</label>
                            <input value={username} onChange={(e) => { setUsername(e.target.value); }} type="text" id="username" className="mt-1 block w-72 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="Enter Username" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Enter Password</label>
                            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" id="password" className="mt-1 block w-72 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="Enter Password" />
                        </div>
                        <div className="flex items-center w-full justify-between">
                            <button onClick={submit} type="submit" className="px-6 py-2 text-[--light] bg-[--dark] rounded-md hover:bg-[--medium] hover:text-[--dark]">Login</button>
                            <Link to="/signup" className="text-[--dark] underline">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
