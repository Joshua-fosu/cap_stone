import React, { useState, useEffect } from "react";
import { database } from "../../firebase/firebase";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useUserData } from "../../contexts/UserDataContext";

export default function UnfollowButton({ eachPost, setShow }) {
  const { userDetails } = useUserData();
  const unFollowRequest = async () => {
    setShow(false);
    const userToUnfollowRef = doc(database, "users", userDetails?.userEmail);
    await updateDoc(userToUnfollowRef, {
      followingFriends: arrayRemove(eachPost?.userName),
    });
  };

  return (
    <a
      className="dropdown-item d-flex align-items-center"
      onClick={unFollowRequest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-meh icon-sm mr-2"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="8" y1="15" x2="16" y2="15"></line>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>{" "}
      <span className="">Unfollow</span>
    </a>
  );
}
