import React, { useEffect, useState } from "react";
import FriendAboutComponent from "../components/DetailedFriendComponents/FriendAboutComponent";
import FriendPostComponent from "../components/DetailedFriendComponents/FriendPostComponent";
import FriendSubscribedFriendsComponent from "../components/DetailedFriendComponents/FriendSubscribedFriendsComponent";
import FriendSavedEvents from "../components/DetailedFriendComponents/FriendSavedEvents";
import "./DetailedFriendPage.css";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { database } from "../firebase/firebase";
import { useParams } from "react-router-dom";
import { sortPosts } from "../utils/SortingPosts";

export default function DetailedFriendPage() {
  const { friend_id } = useParams();
  const [friendDetails, setFriendDetails] = useState([]);
  const [friendPosts, setFriendPosts] = useState([]);

  useEffect(() => {
    async function fetchFriendDetails() {
      const q = query(
        collection(database, "users"),
        where("userID", "==", friend_id)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setFriendDetails(doc.data());
      });
    }
    async function fetchFriendPosts() {
      const q = query(
        collection(database, "posts"),
        where("userID", "==", friend_id)
      );

      const querySnapshot = await getDocs(q);
      let interArr = [];
      querySnapshot.forEach((doc) => {
        interArr.push(doc.data());
      });
      interArr = await sortPosts(interArr, interArr.length);
      setFriendPosts(interArr);
    }

    fetchFriendDetails();
    fetchFriendPosts();
  }, [friend_id]);

  return (
    <>
      <div class="container">
        <div className="page-inner no-page-title">
          {/* <!-- start page main wrapper --> */}
          <div id="main-wrapper">
            <div className="row">
              <FriendAboutComponent friendDetails={friendDetails} />
              <div className="col-lg-7 col-xl-6 grid-margin">
                {friendPosts.length !== 0 ? (
                  friendPosts.map((friendPost) => (
                    <FriendPostComponent eachFriendPost={friendPost} />
                  ))
                ) : (
                  <>
                    <p>There are no posts</p>
                  </>
                )}
              </div>
              <div className="col-lg-12 col-xl-3">
                <FriendSubscribedFriendsComponent
                  userFriends={friendDetails?.followingFriends}
                />
                <FriendSavedEvents
                  friendSavedEvents={friendDetails?.savedEvents}
                />
              </div>
            </div>
            {/* <!-- Row --> */}
          </div>
          {/* <!-- end page main wrapper --> */}
          <div className="page-footer">
            <p>Copyright © 2020 Evince All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}
