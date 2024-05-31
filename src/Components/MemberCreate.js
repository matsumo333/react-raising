import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase"; // Firebaseの初期化設定が含まれているモジュールをインポート
import "./MemberCreate.scss";

const MemberCreate = () => {
  const [member, setMember] = useState({
    accountname: "",
    email: "",
    tel_num: "",
    rank: "",
    profile: "",
    photo: "",
    video: "",
    administrator: false,
    author: {
      username: "",
      id: ""
    }
  });

  const [error, setError] = useState("");

  // useEffectを使ってコンポーネントの初期化時にcurrentUserのデータを設定
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setMember(prevMember => ({
        ...prevMember,
        author: {
          username: currentUser.displayName,
          id: currentUser.uid
        }
      }));
    } else {
      setError("ユーザーが認証されていません。ログインしてください。");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMember(prevMember => ({
      ...prevMember,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setError("ユーザーが認証されていません。ログインしてください。");
      return;
    }
    try {
      const memberRef = collection(db, "members");
      await addDoc(memberRef, member);
      // フォーム送信後に入力フィールドをクリアするなどの追加のロジックをここに追加することができます
      setError(""); // エラーをクリア
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("データの登録中にエラーが発生しました。");
    }
  };

  return (
    <div className="MemberCreateContainer">
      <h2>利用される前に会員情報を入力してください。</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="formField">
          <label>アカウントネーム:</label>
          <input type="text" name="accountname" value={member.accountname} onChange={handleChange} />
        </div>
        <div className="formField">
          <label>連絡用メールアドレス:</label>
          <input type="email" name="email" value={member.email} onChange={handleChange} />
        </div>
        <div className="formField">
          <label>連絡用携帯電話番号:</label>
          <input type="tel" name="tel_num" value={member.tel_num} onChange={handleChange} />
        </div>
        <div className="formField">
          <label>種別:</label>
          <input type="text" name="rank" value={member.rank} onChange={handleChange} />
        </div>
        <div className="formField">
          <label>プロフ:</label>
          <input type="text" name="profile" value={member.profile} onChange={handleChange} />
        </div>
        <div className="formField">
          <label>写真:</label>
          <input type="text" name="photo" value={member.photo} onChange={handleChange} />
        </div>
        <div className="formField">
          <label>ビデオ:</label>
          <input type="text" name="video" value={member.video} onChange={handleChange} />
        </div>
        <div className="formField">
          <label>管理権限:</label>
          <input type="checkbox" name="administrator" checked={member.administrator} onChange={handleChange} />
        </div>
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default MemberCreate;
