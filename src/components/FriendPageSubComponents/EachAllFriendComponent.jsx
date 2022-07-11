import React, { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { useUserData } from "../../contexts/UserDataContext";

export default function EachAllFriendComponent({ eachFriend, userFriends }) {
  const {
    userDetails,
    setUserDetails,
    userSuggestedProfiles,
    setUserSuggestedProfiles,
  } = useUserData();
  const [hasAddedFriend, setHasAddedFriend] = useState(false);
  const [addedFriendID, setAddedFriendID] = useState("");

  useEffect(() => {
    setAddedFriendID(eachFriend.userName);
    if (userFriends?.includes(eachFriend.userName)) {
      setHasAddedFriend(true);
    }
  }, [userFriends, userDetails, eachFriend]);

  const handleAddDeleteFriend = async (event) => {
    const addFriendRef = doc(database, "users", userDetails.userEmail);
    // setAddedFriendID(event.target.id);
    if (!hasAddedFriend) {
      // setAddedFriendID(event.target.id);
      console.log("printed");

      await updateDoc(addFriendRef, {
        followingFriends: arrayUnion(addedFriendID),
      });
    } else {
      await updateDoc(addFriendRef, {
        followingFriends: arrayRemove(addedFriendID),
      });
    }
    setHasAddedFriend(hasAddedFriend ? false : true);
  };

  return (
    <>
      <div className="col-sm-6 col-md-4">
        <div
          className="widget"
          style={{
            overflow: "hidden",
            whiteSpace: "no-wrap",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          <div className="widget-simple">
            <a href="#">
              <img
                src={eachFriend.userAvatar_pic}
                alt="avatar"
                className="widget-image img-circle pull-left animation-fadeIn"
              />
            </a>
            <h4
              className="widget-content text-right"
              style={{
                overflow: "hidden",
                whiteSpace: "no-wrap",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              <a href="#">
                <strong>{eachFriend.userName}</strong>
              </a>
              <br />
              <span className="btn-group" onClick={handleAddDeleteFriend}>
                <a
                  href="javascript:void(0)"
                  className="btn btn-xs btn-primary"
                  data-toggle="tooltip"
                  title=""
                  data-original-title="Edit"
                >
                  {!hasAddedFriend ? (
                    <>
                      <i className="fa fa-pencil" id={eachFriend.userName}></i>
                    </>
                  ) : (
                    <>
                      <i class="bi bi-archive" id={eachFriend.userName}></i>
                    </>
                  )}
                </a>
              </span>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
