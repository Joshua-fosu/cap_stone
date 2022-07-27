import React, { useEffect, useState, useRef } from "react";
import "./AllFriendsComponent.css";
import FilterFriendsByStartLetter from "./FilterFriendsByStartLetter";
import EachAllFriendComponent from "./EachAllFriendComponent";
import UserChatSkeleton from "../SkeletonLoaders/UserChatSkeleton";
import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { useUserData } from "../../contexts/UserDataContext";

export default function AllFriendsComponent() {
  const [allFriends, setAllFriends] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userSuggestedProfiles } = useUserData();
  const { userDetails } = useUserData();

  useEffect(() => {
    async function fetchAllFriends() {
      setAllFriends(userSuggestedProfiles);
    }
    async function fetchUserFriends() {
      const q = query(
        collection(database, "users"),
        where("userName", "==", userDetails.userName)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUserFriends(doc.data().followingFriends);
      });
      setLoading(false);
    }

    fetchAllFriends();
    fetchUserFriends();
  }, [userSuggestedProfiles]);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="block" style={{ minHeight: "70vh" }}>
            <FilterFriendsByStartLetter />
            <div className="row style-alt">
              {loading ? (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <UserChatSkeleton />{" "}
                </div>
              ) : allFriends.length !== 0 ? (
                allFriends.map((eachFriend) => (
                  <>
                    <EachAllFriendComponent
                      eachFriend={eachFriend}
                      userFriends={userFriends}
                    />
                  </>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
