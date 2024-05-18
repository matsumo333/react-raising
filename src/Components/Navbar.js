import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isAuth }) => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776; {/* ハンバーガーアイコン */}
      </div>
      <ul className={`nav-links ${menuActive ? "active" : ""}`}>
        <Link to="/">ホーム</Link>
        <Link to="/schedule">日程</Link>
        <Link to="/link">リンク</Link>
        {!isAuth ? (
          <>
            <Link to="/login">ログイン</Link>
          </>
        ) : (
          <>
            <Link to="/createpost">投稿</Link>
            <a href="https://l--l.jp/gtlist/in.cgi?cd=sc2v4y2qdqq6">参加表明</a>
            <Link to="/logout">ログアウト</Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
