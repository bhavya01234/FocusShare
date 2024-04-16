



import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
// import "./Signup.css"

function Login() {

    const history=useNavigate();

    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

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
    async function submit(e){
    e.preventDefault();

    try{
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
    } catch(e) {
        console.error("Error:", e);
        alert("An error occurred. Please try again later.");
    }
}



    return (
        <div className="container">

            <h1 className="heading">Login Page</h1>

            <form action="POST">
                <input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder="UserName"  />
                <input type="text" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                <input type="submit" onClick={submit} className="submitbtn" value="Login"/>

            </form>

          
            <p>OR</p>
           

            <Link to="/signup" className="link">Signup Page</Link>

        </div>
    )
}

export default Login