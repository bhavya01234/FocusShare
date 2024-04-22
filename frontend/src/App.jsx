import Home from "./component/Home"
import Login from "./component/Login"
import Signup from "./component/Signup"
import Room from "./component/Room";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinRoom from "./component/Join"
import locomotive from 'locomotive-scroll'
import LocomotiveScroll from 'locomotive-scroll'


function App() {
  const loco = new LocomotiveScroll();
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