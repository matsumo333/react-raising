import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./Login.css";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const firebaseAuth = getAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    if (isSignInWithEmailLink(firebaseAuth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(firebaseAuth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem("emailForSignIn");
          navigate("/"); // サインイン成功後にリダイレクト
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [firebaseAuth, navigate]);

  const loginInWithGoogle = () => {
    //Googleでログイン
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      console.log(result);
      navigate("/");
    });
  };
  const redirectToSignupForm = () => {
    navigate("/signupform");
  };

  const handleEmailSignIn = () => {
    setIsModalOpen(true);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        console.log("Email:", email);
        setUserEmail(email);
        localStorage.setItem("userEmail", email);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to sign in. Please check your email and password.");
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  useEffect(() => {
    console.log("更新後userEmail", email);
  }, [email]);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(firebaseAuth, resetEmail)
      .then(() => {
        alert("Password reset email sent!");
        setIsResetModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Error sending password reset email");
      });
  };

  return (
    <div className="container">
      <div className="content">
        <p>Googleでログイン</p>
        <button className="login-button" onClick={loginInWithGoogle}>
          Googleでログイン
        </button>
      </div>
      <div className="content">
        <p>メールアドレスでログイン</p>
        <button className="login-button" onClick={handleEmailSignIn}>
          メールアドレスでログイン
        </button>
      </div>
      <div className="content">
        <p>新たに登録を実施</p>
        <button onClick={redirectToSignupForm}>新規登録</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Email Sign-In Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <button className="close-button" onClick={() => setIsModalOpen(false)}>
          ｘ
        </button>
        <h2>メールアドレスでログイン</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
        >
          <div className="modal-content">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="modal-input"
              required
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="modal-input"
              required
            />
          </div>
          <button type="submit" className="modal-button">
            ログイン
          </button>
          <button
            type="button"
            className="modal-button2"
            onClick={() => setIsResetModalOpen(true)}
          >
            パスワードを忘れた場合
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={isResetModalOpen}
        onRequestClose={() => setIsResetModalOpen(false)}
        contentLabel="Password Reset Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <button
          className="close-button"
          onClick={() => setIsResetModalOpen(false)}
        >
          ｘ
        </button>
        <h2>パスワードをリセット</h2>
        <form onSubmit={handlePasswordReset}>
          <div className="modal-content">
            <label>Email:</label>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="modal-input"
              required
            />
          </div>
          <button type="submit" className="modal-button">
            パスワードリセット
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Login;
