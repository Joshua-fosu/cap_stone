import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  getDoc,
} from "firebase/firestore";
import { database } from "../firebase/firebase";

const UserDataContext = React.createContext();

export function useUserData() {
  return useContext(UserDataContext);
}

export function UserDataProvider({ children }) {
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [userDetails, setUserDetails] = useState();

  const collectionRef = collection(database, "users");

  async function getUserDetails(currentUserEmail) {
    console.log("Retrieving data");
    let userDetails = await query(
      collectionRef,
      where("userEmail", "==", currentUserEmail)
    );
    const querySnapshot = await getDocs(userDetails);
    querySnapshot.forEach((doc) => {
      setUserDetails(doc.data());
    });
  }

  const value = {
    getUserDetails,
    userDetails,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}
