import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import student from '../images/student.avif'
// import "./Signup.css"

function Login() {

    const history = useNavigate();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // async function submit(e){
    //     e.preventDefault();

    //     try{

    //         const response = await axios.post("http://localhost:8001/users/login",{
    //             email,username,password
    //         })
    //         .then(response=>{
    //             if(response.status===200){
    //                 console.log(response.status);
    //                 console.log("responseeee data: ", response.data)
    //                 console.log("accessss:::  ", response.data.accessToken)
    //                 // const accessToken = response.data.accessToken;
    //                 // localStorage.setItem('token', accessToken);

    //                 const { accessToken } = response.data; // Destructure accessToken from response.data
    //                 localStorage.setItem('token', accessToken);

    //                 // const responseData = JSON.parse(response);
    //                 // const accessToken = responseData.accessToken;
    //                 // // Save the access token in local storage
    //                 // localStorage.setItem('accessToken', accessToken);
    //                 // console.log('Access token saved to local storage:', accessToken);

    //                 history("/home",{state:{id:email}})
    //             }
    //             else if(response.data=="notexist"){
    //                 alert("User have not sign up")
    //             }
    //         })
    //         .catch(e=>{
    //             alert("wrong details")
    //             console.log(e.response.data);
    //         })
    //         console.log("Response from backend:************_________  ", response); 
    //     }
    //     catch(e){
    //         console.log(e.response.data);

    //     }

    // }
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
                            <h1 className="text-4xl font-bold text-purple-900">Login</h1>
                            <form action="POST" className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-semibold text-base">Enter Username</h3>
                                    <input className="w-72 h-8 rounded-md text-purple-900" type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder="UserName" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-semibold text-base">Enter Email Address</h3>
                                    <input className="w-72 h-8 rounded-md text-purple-900" type="text" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-semibold text-base">Enter Password</h3>
                                    <input className="w-72 h-8 rounded-md text-purple-900" type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                                </div>
                            </form>
                            <input className="p-2 items-center w-20 bg-pink-400 text-white rounded-lg hover:bg-pink-200 hover:text-purple-900 shadow-lg" type="submit" onClick={submit} value="Login" />
                            <p>OR</p>
                            <Link to="/signup" className="underline text-xl text-purple-900 font-semibold">Signup</Link>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Login