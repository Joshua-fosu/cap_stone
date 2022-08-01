import React, { lazy, Suspense, useState, useEffect } from "react";
import { useUserData } from "../contexts/UserDataContext";
import UserAboutComponent from "../components/UserProfileComponents/UserAboutComponent";
import UserFeedComponent from "../components/UserProfileComponents/UserFeedComponent";
import UserProfileRightWrapper from "../components/UserProfileComponents/UserProfileRightWrapper";
import UserProfileSkeleton from "../components/SkeletonLoaders/UserProfileSkeleton";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { database } from "../firebase/firebase";
import { sortPosts } from "../utils/SortingPosts";

export default function UserProfile() {
  const { userDetails } = useUserData();
  const [loadingUserProfile, setLoadingUserProfile] = useState(true);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    async function fetchUserPosts() {
      const includedInPost = [
        ...userDetails?.followingFriends,
        ...[userDetails?.userName],
      ];
      const q = query(
        collection(database, "posts"),
        where("userName", "in", includedInPost)
      );
      let eachArr = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log("post", doc.data());
        eachArr.push(doc.data());
      });
      console.log("eachArr", eachArr);
      eachArr = await sortPosts(eachArr, eachArr.length);
      setUserPosts(eachArr);
      setLoadingUserProfile(false);
    }
    fetchUserPosts();
  }, [userDetails]);

  return (
    <>
      {loadingUserProfile ? (
        <>
          {" "}
          <UserProfileSkeleton />{" "}
        </>
      ) : (
        <>
          {" "}
          <div className="row profile-body">
            <UserAboutComponent />
            <UserFeedComponent userPosts={userPosts} />

            <UserProfileRightWrapper />
          </div>
        </>
      )}
    </>
  );
}
