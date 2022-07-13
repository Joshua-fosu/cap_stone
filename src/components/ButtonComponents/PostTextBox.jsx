import React, { useRef, useState, useEffect } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { database } from "../../firebase/firebase";
import DisplayAllComments from "./DisplayAllComments";

export default function PostTextBox({ userPost }) {
  const [userPostText, setUserPostText] = useState("");
  const { userDetails } = useUserData();
  const commentRef = useRef();

  const handleTypingComment = (event) => {
    setUserPostText(event.target.value);
  };

  const handlePostComment = async (event) => {
    const postRef = doc(database, "posts", userPost?.id);
    await updateDoc(postRef, {
      comments: arrayUnion({
        userName: userDetails?.userName,
        userAvartar: userDetails?.userAvatar_pic,
        comment: commentRef.current.value,
      }),
    });
    setUserPostText("");
  };

  return (
    <>
      <div class="card" style={{ height: "10rem", overflowY: "scroll" }}>
        <div class="card-body">
          <div class="post">
            <textarea
              ref={commentRef}
              class="form-control"
              placeholder="Post"
              rows="1"
              onChange={handleTypingComment}
              value={userPostText}
            ></textarea>
            <div class="post-options">
              <button
                class="btn btn-outline-primary float-right"
                onClick={handlePostComment}
              >
                Post
              </button>
            </div>
          </div>
        </div>
        <DisplayAllComments userPost={userPost} />
      </div>
    </>
  );
}
