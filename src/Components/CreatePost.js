import React, { useState } from "react";
import "./CreatePost.css";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState();
  const [postText, setPostText] = useState();
  const navigate = useNavigate();

  const createPost = () => {
    console.log("コロッケ" + title);
    console.log(postText);
  };

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h1>記事を投稿するCreatePost</h1>
        <div className="inputPost">
          <div>タイトル</div>
          <input
            type="text"
            placeholder="タイトルを記入"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputPost">
          <div>投稿</div>
          <textarea
            placeholder="投稿内容を記入"
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
        </div>
        <button className="postButton" onClick={createPost}>
          投稿する
        </button>
      </div>
    </div>
  );
};
export default CreatePost;
