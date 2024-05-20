import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import CreatePost from "./Components/CreatePost";
import Links from "./Components/Links";
import Logout from "./Components/Logout";
import Login from "./Components/Login";
import { useState } from "react";
import SignUpForm from "./Components/SignUpForm";
import Slide1 from "./Components/Slide1";
import EmailLoginForm from "./Components/EmailLoginForm";
import ResetPassword from "./Components/ResetPassword";
import Schedule from "./Components/Schedule";
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router>
      <Navbar isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/link" element={<Links />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/signupform" element={<SignUpForm />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/slide1" element={<Slide1 />} />
        <Route
          path="/emaillogin"
          element={<EmailLoginForm setIsAuth={setIsAuth} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
