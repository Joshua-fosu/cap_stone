import React, { useState, useEffect } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { database } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function UserAboutTextArea({ setEdit }) {
  const { userDetails } = useUserData();
  const [userTypedAbout, setUserTypedAbout] = useState("");

  const handleUserTyped = (event) => {
    setUserTypedAbout(event.target.value);
  };

  const updateUserAbout = async () => {
    userDetails.About = userTypedAbout;
    setEdit(false);
    const userRef = doc(database, "users", userDetails?.userEmail);
    await updateDoc(userRef, {
      About: userTypedAbout,
    });
  };

  return (
    <>
      <textarea
        className="form-control"
        id="validationTextarea"
        placeholder="type..."
        onChange={handleUserTyped}
        value={userTypedAbout}
      ></textarea>
      <button
        style={{ backgroundColor: "blue" }}
        className="btn btn-primary mt-2"
        type="submit"
        onClick={updateUserAbout}
      >
        Edit
      </button>
    </>
  );
}
