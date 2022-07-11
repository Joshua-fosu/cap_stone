import React, { useState, useEffect } from "react";
import "./FollowedFriendsComponent.css";
import { useUserData } from "../../contexts/UserDataContext";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../../firebase/firebase";
import EachFollowedFriendComponent from "./EachFollowedFriendComponent";

export default function FollowedFriendsComponent() {
  const [userFriends, setUserFriends] = useState([]);
  const { userDetails } = useUserData();

  useEffect(() => {
    async function getUserFriendsData() {
      const unsub = onSnapshot(
        doc(database, "users", userDetails.userEmail),
        (doc) => {
          setUserFriends(doc.data().followingFriends);
        }
      );
    }
    getUserFriendsData();
  }, []);
  return (
    <>
      <div class="row">
        <div class="col-md-12">
          <h1>Followed Friends</h1>
          <div class="people-nearby">
            {userFriends?.length !== 0 ? (
              userFriends?.map((userFriend) => (
                <EachFollowedFriendComponent
                  eachUserFollowedFriend={userFriend}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
