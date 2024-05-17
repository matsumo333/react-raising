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
        {email && <li className="email">メールアドレス: {email}</li>}
        <li>
          <Link to="/">ホーム</Link>
        </li>
        <li>
          <Link to="/createpost">投稿</Link>
        </li>
        <li>
          <Link to="/schedule">日程</Link>
        </li>
        <li>
          <a href="https://l--l.jp/gtlist/in.cgi?cd=sc2v4y2qdqq6">参加表明</a>
        </li>
        <li>
          <Link to="/link">リンク</Link>
        </li>
        <li>
          <Link to="/login">ログイン</Link>
        </li>
        <li>
          <Link to="/logout">ログアウト</Link>
        </li>
        <li>
          <Link to="/signupform">サインアップ</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
