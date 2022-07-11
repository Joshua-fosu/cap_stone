import React, { useEffect, useState } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import UserSinglePostComponent from "./UserSinglePostComponent";

export default function UserFeedComponent() {
  const { userDetails } = useUserData();
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
      setUserPosts(eachArr);
      console.log(userPosts.length);
    }
    fetchUserPosts();
  }, [userDetails]);

  return (
    <>
      <div className="col-md-8 col-xl-6 middle-wrapper">
        <div className="row">
          {userPosts.length !== 0 ? (
            userPosts.map((userPost) => (
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
