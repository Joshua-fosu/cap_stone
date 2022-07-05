import React, { useState, useRef, useId } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../../firebase/firebase";

export default function SignUpForm() {
  const multiAvatarAPI = "s6n39c8ltBQdAV";
  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setUserConfirmPassword] = useState("");

  const userEmailRef = useRef("");
  const userFullNameRef = useRef("");
  const userNameRef = useRef("");
  const userPasswordRef = useRef("");
  const confirmUserPasswordRef = useRef("");

  const { signup, currentUser } = useAuth();
  const user_id = useId();

  const Navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      signup(userEmailRef.current.value, userPasswordRef.current.value);
      addDoc(collection(database, "users"), {
        userName: userName,
        userEmail: userEmail,
        numOfPosts: 0,
        Following: 0,
        userFriends: [],
        Followers: 0,
        About: "",
        userAvatar_pic: `https://api.multiavatar.com/${userName}.svg?apikey=${multiAvatarAPI}`,
        userID: user_id,
        savedEvents: 0,
        createdAt: new Date().toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      });
      Navigate("/user/osdcdjodicj");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="p-3 mt-3">
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          {/* {currentUser && currentUser.email} */}
          <input
            ref={userEmailRef}
            type="text"
            name="userEmail"
            id="userEmail"
            placeholder="Email"
            onChange={(event) => {
              setUserEmail(event.target.value);
            }}
            value={userEmail}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            ref={userFullNameRef}
            type="text"
            name="Full_name"
            id="full_name"
            placeholder="Full name"
            onChange={(event) => {
              setUserFullName(event.target.value);
            }}
            value={userFullName}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            ref={userNameRef}
            type="text"
            name="userName"
            id="userName"
            placeholder="Username"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            value={userName}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            ref={userPasswordRef}
            type="password"
            name="password"
            id="pwd"
            placeholder="Password"
            onChange={(event) => {
              setUserPassword(event.target.value);
            }}
            value={userPassword}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            ref={confirmUserPasswordRef}
            type="password"
            name="password"
            id="confirm_pwd"
            placeholder="Confirm Password"
            onChange={(event) => {
              setUserConfirmPassword(event.target.value);
            }}
            value={confirmUserPassword}
          />
        </div>
        <button className="btn mt-3" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </>
  );
}
