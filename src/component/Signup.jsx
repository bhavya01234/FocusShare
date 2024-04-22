// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { useNavigate, Link } from "react-router-dom"
// // import "./Signup.css"

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
import student from '../images/student.avif'

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
        <>
        <div className="h-screen w-full bg-gradient-to-r from-pink-200 to-purple-900 via-purple-700 flex">
            <div className="m-20 w-full bg-white/30 rounded-xl flex justify-between items-center px-20 gap-32">
                <div className="flex flex-col gap-4">
                    <div className="text-5xl text-purple-900 tracking-tighter font-bold">Focus Share ...</div>
                    <img src={student} className="rounded-full" />
                    <p className="text-center">Foster your connections with friends as you navigate your academic journey together.</p>
                </div>
                <div className="mr-12">
                    <div className="p-4 rounded-xl text-white flex items-center justify-center flex-col gap-4">
                        <h1 className="text-3xl font-bold text-purple-900">Signup</h1>
                        <form action="POST" className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold text-base">Enter your Full Name</h3>
                                <input className="w-72 h-8 rounded-md text-purple-900" type="text" onChange={(e) => setFullName(e.target.value)} placeholder="Name" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold text-base">Enter Email Address</h3>
                                <input className="w-72 h-8 rounded-md text-purple-900" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">Enter Username</h3>
                                <input className="w-72 h-8 rounded-md text-purple-900" type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold text-base">Enter Password</h3>
                                <input className="w-72 h-8 rounded-md text-purple-900" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            </div>
                        </form>
                        <input className="p-2 items-center w-20 bg-pink-400 text-white rounded-lg hover:bg-pink-200 hover:text-purple-900 shadow-lg" type="submit" onClick={submit} value="SignUp" />
                        <p>OR</p>
                        <Link to="/" className="underline text-xl text-purple-900 font-semibold">Login</Link>
                    </div>

                </div>
            </div>

        </div>
    </>
    );
}

export default Login;
