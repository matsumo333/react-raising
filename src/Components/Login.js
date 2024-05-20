import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsAuth }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const redirectToSignupForm = () => {
    navigate("/signupform");
  };
  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setIsAuth(true);
    } catch (error) {
      console.error("Failed to sign in with Google.", error);
    }
  };

  const handleEmailLogin = () => {
    navigate("/emaillogin");
  };

  return (
    <div className="container">
      <div className="content">
        <p>Googleアカウントでログイン</p>
        <button className="login-button" onClick={handleGoogleLogin}>
          Googleでログイン
        </button>
      </div>
      <div className="content">
        <p>メールアドレスでログイン</p>
        <button className="login-button" onClick={handleEmailLogin}>
          メールアドレスでログイン
        </button>
      </div>
      <div className="content">
        <p>新たに登録を実施</p>
        <button className="login-button" onClick={redirectToSignupForm}>
          新規登録
        </button>
      </div>

      {/* EmailLoginFormコンポーネントはこのまま残しておく */}
      {/* <EmailLoginForm
        setIsAuth={setIsAuth}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      /> */}
    </div>
  );
};

export default Login;
