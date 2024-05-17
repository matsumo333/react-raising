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
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [username, setUsername] = useState(localStorage.getItem("userName"));
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleLogin = (email) => {
    setEmail(email);
    localStorage.setItem("userEmail", email);
  };

  return (
    <Router>
      <Navbar isAuth={isAuth} email={email} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/createpost" element={<CreatePost />}></Route>
        <Route path="/schedule" element={<Schedule />}></Route>
        <Route path="/link" element={<Links />}></Route>
        <Route path="/login" element={<Login onLogin={handleLogin} />}></Route>
        <Route
          path="/logout"
          element={<Logout setIsAuth={setIsAuth} />}
        ></Route>
        <Route path="/signupform" element={<SignUpForm />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
