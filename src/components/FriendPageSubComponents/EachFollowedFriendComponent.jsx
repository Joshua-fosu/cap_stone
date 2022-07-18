import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";

export default function EachFollowedFriendComponent({
  eachUserFollowedFriend,
}) {
  const [userFriendDetails, setUserFriendDetails] = useState([]);
  const { userDetails } = useUserData();
  useEffect(() => {
    async function fetchUserFriend() {
      const q = query(
        collection(database, "users"),
        where("userName", "==", eachUserFollowedFriend)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserFriendDetails(doc.data());
      });
    }
    fetchUserFriend();
  }, []);

  return (
    <>
      <div class="nearby-user">
        <div class="row">
          <div class="col-md-2 col-sm-2">
            <img
              src={userFriendDetails?.userAvatar_pic}
              alt="user"
              class="profile-photo-lg"
            />
          </div>
          <div class="col-md-7 col-sm-7">
            <h5>
              <a href="#" class="profile-link">
                {userFriendDetails?.userName}
              </a>
            </h5>
            <p>Software Engineer</p>
            <p class="text-muted">500m away</p>
          </div>
          <div class="col-md-3 col-sm-3">
            <Link
              to={`/user/${userDetails?.userID}/${userFriendDetails?.userID}/view/`}
            >
              <button class="btn btn-primary pull-right">Go To Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
