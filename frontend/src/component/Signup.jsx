// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { useNavigate, Link } from "react-router-dom"
// // import "./Signup.css"
import groupstudy from '../images/groupstudy.png'
import booksimage from '../images/booksimage.jpg'

// function Login() {
//     const history=useNavigate();

//     const [fullName,setfullName]=useState('')
//     const [email,setEmail]=useState('')
//     const [username,setUsername]=useState('')
//     const [password,setPassword]=useState('')

//     async function submit(e){
//         e.preventDefault();

//         try{

//             const response = await axios.post("http://localhost:8001/users/register",{
//                 fullName, email, username, password
//             })
//             .then(res=>{
//                 if(response.status!=200){
//                     alert("User already exists")
//                 }
//                 else if(response.status==200){
//                     console.log(response.status);
//                     history("/home",{state:{id:email}})
//                 }
//             })
//             .catch(e=>{
//                 alert("wrong details")
//                 console.log(e.response.data);
//             })

//         }
//         catch(e){
//             console.log(e.response.data);

//         }

//     }


//     return (
//         <div className="container">

//             <h1 className="heading">Signup Page</h1>

//             <form action="POST">
//                 <input type="text" onChange={(e) => { setfullName(e.target.value) }} placeholder="FullName"  />
//                 <input type="text" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
//                 <input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder="Username"  />
//                 <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
//                 <input type="submit" onClick={submit} className="submitbtn" value="Sign Up"/>

//             </form>
//             <p>OR</p>
//             <Link to="/" className="link">Login Page</Link>

//         </div>
//     )
// }

// export default Login




import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const history = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8001/users/register", {
                fullName,
                email,
                username,
                password
            });
            console.log(response.data)
            
            if (response.status == 201) {
                console.log(response.data);
                console.log("*******************************")
                console.log(response.status); 
                console.log(response.data.accessToken);
                //201 user created (actual response status)

                // const accessToken = JSON.stringify(response.data.accessToken);
                // localStorage.setItem('token', accessToken);

            //     const accessToken = response.headers['authorization']; // Extract access token from headers
            //     const refr = response.headers['authorization'];
            // console.log("Access token:", accessToken); // Log the access token
      
            // if (accessToken) {
            //     localStorage.setItem('token', accessToken); // Store the access token
            //     history("/home", { state: { id: email } });
            // } else {
            //     console.log("Access token not found in response headers");
            //     // Handle error appropriately, maybe redirect or show an error message
            // }
                history("/");
            } else {
                console.log(response.status);
                alert("User already exists");
            }
        } catch (e) {
            if (e.response) {
                console.log(e.response.data);
                alert("Wrong details. Please check your inputs.");
            } else {
                console.error("Axios error:", e.message);
                alert("An error occurred. Please try again later.");
            }
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
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Enter Full Name</label>
                                <input value={fullName} onChange={(e)=>{setFullName(e.target.value)}} type="text" id="fullName" className="mt-1 block w-72 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="Enter Full Name" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter Email Address</label>
                                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" id="email" className="mt-1 block w-72 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="Enter Email Address" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Enter Username</label>
                                <input value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" id="username" className="mt-1 block w-72 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="Enter Username" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Set Password</label>
                                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" className="mt-1 block w-72 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="Enter Password" />
                            </div>
                            <div className="flex items-center w-full justify-between">
                                <button onClick={submit} type="submit" className="px-6 py-2 text-[--light] bg-[--dark] rounded-md hover:bg-[--medium] hover:text-[--dark]">Sign Up</button>
                                <Link to="/" className="text-[--dark] underline">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Login;
