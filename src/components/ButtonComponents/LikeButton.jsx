import React, { useEffect, useState } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  getDoc,
} from "firebase/firestore";
import { database } from "../../firebase/firebase";

export default function LikeButton({
  userPostDetails,
  hasLiked,
  setHasLiked,
  numberOfLikes,
  setNumberOfLikes,
}) {
  const { userDetails } = useUserData();

  useEffect(() => {
    if (userPostDetails?.likesUsers?.includes(userDetails?.userName)) {
      setHasLiked(true);
    }
  }, [userPostDetails, userDetails]);

  const handleClickedLiked = async (event) => {
    const postRef = doc(database, "posts", userPostDetails?.id);
    if (hasLiked) {
      setHasLiked(false);
      setNumberOfLikes(numberOfLikes - 1);
      await updateDoc(postRef, {
        likes: increment(-1),
        likesUsers: arrayRemove(userDetails?.userName),
      });
    } else {
      setHasLiked(true);
      setNumberOfLikes(numberOfLikes + 1);
      await updateDoc(postRef, {
        likes: increment(1),
        likesUsers: arrayUnion(userDetails?.userName),
      });
    }
  };

  return (
    <>
      <a
        className="d-flex align-items-center text-muted mr-4"
        onClick={handleClickedLiked}
        style={{ minWidth: "fit-content !important" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={hasLiked ? "red" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-heart icon-md"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span className="d-inline d-md-inline ml-2">
          {numberOfLikes} {numberOfLikes === 1 ? "Like" : "Likes"}
        </span>
      </a>
    </>
  );
}

export const dbClickToLike = async (userPostDetails, currUserName) => {
  const postRef = doc(database, "posts", userPostDetails?.id);
  const postData = await getDoc(postRef);
  console.log(postData.data());
  if (postData.data().likesUsers.includes(currUserName)) {
    await updateDoc(postRef, {
      likes: increment(-1),
      likesUsers: arrayRemove(currUserName),
    });
  } else {
    await updateDoc(postRef, {
      likes: increment(1),
      likesUsers: arrayUnion(currUserName),
    });
  }
};
