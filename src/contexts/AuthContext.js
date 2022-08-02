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
  browserLocalPersistence,
  signOut,
} from "firebase/auth";
import firebase from "firebase/app";
import { useUserData } from "./UserDataContext";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import axios from "axios";
const FacebookProvider = new FacebookAuthProvider();

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const Navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getSessionAuth = getAuth();
  setPersistence(getSessionAuth, browserLocalPersistence);
  const { getUserDetails, userDetails, getSuggestedProfiles, setUserDetails } =
    useUserData();

  const createNewUser = (userName, userEmail) => {
    const id = "_" + Math.random().toString(36).substr(2, 9);
    const multiAvatarAPI = "s6n39c8ltBQdAV";
    const newUser = {
      userName: userName,
      userEmail: userEmail,
      numOfPosts: 0,
      Following: 0,
      userFriends: [],
      Followers: 0,
      About: "Hello there!!!",
      userAvatar_pic: `https://api.multiavatar.com/${userName}.svg?apikey=${multiAvatarAPI}`,
      userID: id,
      savedEvents: [],
      createdAt: new Date().toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };
    return newUser;
  };

  async function signup(email, password, userName) {
    auth.createUserWithEmailAndPassword(email, password);
    setIsLoggedIn(true);
    const newUser = createNewUser(userName, email);

    await setDoc(doc(database, "users", email), newUser);
    setUserDetails(newUser);
    Navigate(`/user/${newUser?.userID}`);
  }

  function login(email, password) {
    const getR = getAuth();
    signInWithEmailAndPassword(getR, email, password)
      .then((userCredential) => {
        setIsLoggedIn(true);
        console.log("user cred", userCredential);
        const user = userCredential.user;
        setCurrentUser(user);
        // Navigate(`/user/jfkdl`);
        // return true;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoggedIn(false);
      });
  }

  const socialMediaAuth = (provider, userName) => {
    auth
      .signInWithPopup(provider)
      .then(async (res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        const userSocialDetails = res.user._delegate;
        const userRef = doc(database, "users", userSocialDetails.email);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          console.log("Already exists");
          setUserDetails(docSnap.data());
          Navigate(`/user/${docSnap.data()?.userID}/`);
        } else {
          console.log("Need to create new");
          const newUser = createNewUser(
            userSocialDetails.displayName.replace(/ +/g, ""),
            userSocialDetails.email
          );
          setUserDetails(newUser);
          await setDoc(
            doc(database, "users", userSocialDetails.email),
            newUser
          );
          Navigate(`/user/${newUser?.userID}/`);
        }

        // return res.user._delegate;
      })
      .catch((err) => {});
  };

  const userSignOut = () => {
    const getR = getAuth();
    signOut(getR)
      .then(() => {
        console.log("user signed out successfully!!");
      })
      .catch((error) => {
        console.log("user was not able to sign out", error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("user", user);
      setCurrentUser(user);
      getUserDetails(user._delegate.email);
      getSuggestedProfiles(user._delegate.email);
      setIsLoggedIn(true);
    });

    return unsubscribe;
  }, [setUserDetails]);

  const value = {
    currentUser,
    signup,
    login,
    isLoggedIn,
    socialMediaAuth,
    FacebookProvider,
    userSignOut,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
