// import React from 'react'
// import "./App.css";
// import { BrowserRouter as Router } from "react-router-dom";
// // import { Toaster } from 'react-hot-toast';

// // import Login from './components/Login/Login';
// // import Signup from './components/Signup/Signup';
// const App = () => {
//   return (
//     <Router>
//       {/* <Login/>
//       <Signup/> */}
//     </Router>
//   );
// }

// export default App


// import './App.css'
import Home from "./component/Home"
import Login from "./component/Login"
import Signup from "./component/Signup"
import Room from "./component/Room";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import JoinRoom from "./component/Join"


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/room" element={<Room/>}/>
          <Route path="/joinroom" element={<JoinRoom/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;