import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import "firebase/auth";
import {
  FacebookAuthProvider,
  setPersistence,
  browserSessionPersistence,
  getAuth,
  signInWithRedirect,
  inMemoryPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase from "firebase/app";
import { useUserData } from "./UserDataContext";
const FacebookProvider = new FacebookAuthProvider();

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getSessionAuth = getAuth();
  const { getUserDetails, userDetails } = useUserData();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    const getR = getAuth();
    signInWithEmailAndPassword(getR, email, password)
      .then((userCredential) => {
        setIsLoggedIn(true);
        const user = userCredential.user;
        setCurrentUser(user);
        return true;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoggedIn(false);
      });
  }

  const socialMediaAuth = (provider) => {
    return auth
      .signInWithPopup(provider)
      .then((res) => {
        setIsLoggedIn(true);

        setCurrentUser(res.user);
        return res.user._delegate;
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log("user", user);
      getUserDetails(user._delegate.email);

      setIsLoggedIn(true);
    });

    return unsubscribe;
  });

  const value = {
    currentUser,
    signup,
    login,
    isLoggedIn,
    socialMediaAuth,
    FacebookProvider,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
