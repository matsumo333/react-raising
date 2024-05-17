import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ email }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <p>メールアドレス: {email}</p>
        <Link to="/">ホーム</Link>
        <Link to="/createpost">投稿</Link>
        <Link to="/schedule">日程</Link>
        <a href="https://l--l.jp/gtlist/in.cgi?cd=sc2v4y2qdqq6">参加表明</a>
        <Link to="/link">リンク</Link>
        <Link to="/login">ログイン</Link>
        <Link to="/logout">ログアウト</Link>
        <Link to="/signupform">サインアップ</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
