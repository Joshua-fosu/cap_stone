import React, { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";

export default function LoginForm({ setError }) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const userEmailRef = useRef("");
  const userPasswordRef = useRef("");
  const { login, currentUser, isLoggedIn } = useAuth();
  const { getUserDetails, userDetails } = useUserData();

  const Navigate = useNavigate();

  const handleUserEmailInput = (event) => {
    setUserEmail(event.target.value);
  };

  const handleUserPasswordInput = (event) => {
    setUserPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      login(userEmail, userPassword);
    } catch (err) {}
  };

  return (
    <>
      <div className="hero-body">
        <form className="p-3 mt-3">
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              ref={userEmailRef}
              type="email"
              name="userEmail"
              id="userEmail"
              placeholder="Username"
              onChange={handleUserEmailInput}
              value={userEmail}
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
              onChange={handleUserPasswordInput}
              value={userPassword}
            />
          </div>
          <button className="btn mt-3" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
