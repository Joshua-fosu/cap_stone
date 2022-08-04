import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { database } from "../../firebase/firebase";

export default function FriendSubscribedFriendsComponent({ userFriends }) {
  const [subscribedUsersDetails, setSubscribedUserDetails] = useState([]);

  useEffect(() => {
    async function fetchSubscribedFriendsDetails() {
      if (userFriends?.length > 0) {
        const q = query(
          collection(database, "users"),
          where("userName", "in", userFriends)
        );
        const querySnapshot = await getDocs(q);
        let interArr = [];
        querySnapshot.forEach((doc) => {
          interArr.push(doc.data());
        });
        setSubscribedUserDetails(interArr);
      }
    }
    fetchSubscribedFriendsDetails();
  }, [userFriends]);

  return (
    <>
      <div className="card card-white grid-margin">
        <div className="card-heading clearfix">
          <h4 className="card-title">Friends</h4>
        </div>
        <div className="card-body">
          <div className="team">
            {subscribedUsersDetails.length !== 0 ? (
              subscribedUsersDetails.map((subscribeFriend) => (
                <div className="team-member">
                  <div className="online on"></div>
                  <img src={subscribeFriend?.userAvatar_pic} alt="" />
                </div>
              ))
            ) : (
              <>No Friends</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
