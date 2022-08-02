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
  const [filterLetter, setFilterLetter] = useState("");

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

  let filteredAllFriends = allFriends;

  if (filterLetter !== "") {
    filteredAllFriends = allFriends?.filter((eachFriend) => {
      return eachFriend?.userName[0].toUpperCase() === filterLetter;
    });
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="block" style={{ minHeight: "70vh" }}>
            <FilterFriendsByStartLetter
              setFilterLetter={setFilterLetter}
              filterLetter={filterLetter}
            />
            <div className="row style-alt">
              {loading ? (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <UserChatSkeleton />{" "}
                </div>
              ) : filteredAllFriends.length !== 0 ? (
                filteredAllFriends.map((eachFriend) => (
                  <>
                    <EachAllFriendComponent
                      eachFriend={eachFriend}
                      userFriends={userFriends}
                    />
                  </>
                ))
              ) : (
                <>There are no usernames starting with '{filterLetter}'</>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
