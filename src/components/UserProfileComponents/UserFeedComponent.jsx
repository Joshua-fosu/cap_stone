import React, { useEffect, useState } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import UserSinglePostComponent from "./UserSinglePostComponent";

export default function UserFeedComponent({ userPosts }) {
  return (
    <>
      <div className="col-md-8 col-xl-6 middle-wrapper">
        <div className="row">
          {userPosts?.length !== 0 ? (
            userPosts?.map((userPost) => (
              <UserSinglePostComponent userPost={userPost} />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
