



import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
// import "./Signup.css"

function Login() {

    const history=useNavigate();

    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            const response = await axios.post("http://localhost:8001/users/login",{
                email,username,password
            })
            .then(response=>{
                if(response.status==200){
                    console.log(response.status);
                    history("/home",{state:{id:email}})
                }
                else if(res.data=="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e.response.data);
            })

        }
        catch(e){
            console.log(e.response.data);

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