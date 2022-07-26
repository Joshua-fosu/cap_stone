import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { useUserData } from "../../contexts/UserDataContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UserChatList({ setFriendToChat }) {
  const { userDetails, userSuggestedProfiles } = useUserData();
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState([]);
  const [friendsDetails, setFriendDetails] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const initializeRooms = () => {
      const q = query(
        collection(database, "rooms"),
        where("owners", "array-contains", userDetails?.userName)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setRooms(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()?.owners.filter((contributor) => {
              return contributor !== userDetails?.userName;
            }),
          }))
        );
      });
      if (activeRoom.length !== 0) {
        setFriendToChat(rooms[0]);
        setActiveRoom(rooms[0]?.id);
        Navigate(`/user/${userDetails?.userID}/chat/${rooms[0]?.id}`);
      }
    };

    initializeRooms();
  }, []);

  return (
    <>
      <div id="plist" class="people-list" style={{ minHeight: "70vh" }}>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-search"></i>
            </span>
          </div>
          <input type="text" class="form-control" placeholder="Search..." />
        </div>
        <ul class="list-unstyled chat-list mt-2 mb-0">
          {rooms.length !== 0 ? (
            rooms?.map((room) => (
              <Link to={`/user/${userDetails?.userID}/chat/${room?.id}`}>
                <li
                  className={
                    activeRoom === room?.id
                      ? "clearfix make-active"
                      : "clearfix"
                  }
                  onClick={() => {
                    setFriendToChat(room);
                    setActiveRoom(room?.id);
                  }}
                >
                  <img
                    src={`https://api.multiavatar.com/${room?.data[0]}.svg`}
                    alt="avatar"
                  />
                  <div class="about">
                    <div class="name">{room?.data[0]}</div>
                    <div class="status">
                      {" "}
                      <i class="fa fa-circle offline"></i> Tap to chat...{" "}
                    </div>
                  </div>
                </li>
              </Link>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  );
}
