import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";

const AuthContext = React.createContext();
// export const FacebookProvider = auth.FacebookAuthProvider();
// export const GoogleProvider = auth.GoogleAuthProvider();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const socialMediaAuth = (provider) => {
    return auth
      .signInWithPopup(provider)
      .then((res) => {
        setCurrentUser(res.user);
      })
      .catch((err) => {
        console.log("Error signing in with Social media", err);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Came here");
      setIsLoggedIn(true);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
