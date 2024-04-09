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

            if (response.status !== 200) {
                console.log(response.status); 
                //201 user created (actual response status)
                history("/home", { state: { id: email } });
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
        <div className="container">
            <h1 className="heading">Signup Page</h1>
            <form>
                <input type="text" onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
                <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="submit" onClick={submit} className="submitbtn" value="Sign Up" />
            </form>
            <p>OR</p>
            <Link to="/" className="link">Login Page</Link>
        </div>
    );
}

export default Login;
