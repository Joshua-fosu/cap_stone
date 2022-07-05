import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { database } from "../firebase/firebase";

const UserDataContext = React.createContext();

export function useUserData() {
  return useContext(UserDataContext);
}

export function UserDataProvider({ children }) {
  const [userDetails, setUserDetails] = useState({});

  async function getUserDetails(currentUserEmail) {
    const docRef = doc(database, "users", currentUserEmail);
    const docSnap = await getDoc(docRef);
    console.log("login data", docSnap.data());
    setUserDetails(docSnap.data());
  }

  const value = {
    getUserDetails,
    userDetails,
    setUserDetails,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}
