import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import CreatePost from "./Components/CreatePost";
import Links from "./Components/Links";
import Logout from "./Components/Logout";
import Schedule from "./Components/Schedule";
import Login from "./Components/Login";
import SignUpForm from "./Components/SignUpForm";
import { useState, useEffect } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <Navbar isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/link" element={<Links />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} />
        <Route path="/signupform" element={<SignUpForm />} />
      </Routes>
    </Router>
  );
}

export default App;
