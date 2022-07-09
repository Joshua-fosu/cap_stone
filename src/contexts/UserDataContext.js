import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  getDoc,
  doc,
  setDoc,
  limit,
} from "firebase/firestore";
import { database } from "../firebase/firebase";

const UserDataContext = React.createContext();

export function useUserData() {
  return useContext(UserDataContext);
}

export function UserDataProvider({ children }) {
  const [userDetails, setUserDetails] = useState({});
  const [userSuggestedProfiles, setUserSuggestedProfiles] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  async function getUserDetails(currentUserEmail) {
    try {
      setUserEmail(currentUserEmail);
      const docRef = doc(database, "users", currentUserEmail);
      const docSnap = await getDoc(docRef);
      setUserDetails(docSnap.data());
      getSuggestedProfiles();
      return docSnap.data().userEmail;
    } catch (err) {
      console.log("Unable to read", err);
    }
  }

  async function uploadImageObject(url) {
    console.log("url", url);
    const newImgObj = {
      imageURL: url,
      userName: userDetails.userName,
      userEmail: userDetails.userEmail,
      comments: [],
      likes: 0,
      createdAt: new Date().toLocaleDateString("en-us", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
    };
    await addDoc(collection(database, "posts"), newImgObj);
  }

  async function getSuggestedProfiles(userEmail) {
    const arrProfiles = [];
    console.log("This is", userEmail);
    const q = query(
      collection(database, "users"),
      where("userEmail", "!=", userEmail)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("rush", doc.data());
      arrProfiles.push(doc.data());
    });
    setUserSuggestedProfiles(arrProfiles);
    console.log("user profiles", userSuggestedProfiles);
    return userSuggestedProfiles;
  }

  const value = {
    getUserDetails,
    userDetails,
    setUserDetails,
    uploadImageObject,
    getSuggestedProfiles,
    userSuggestedProfiles,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}
