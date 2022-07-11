import React, { useState, useEffect } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { Toast } from "react-bootstrap";

export default function FriendSavedEvents({ friendSavedEvents }) {
  const { events } = useUserData();
  const [userFriendSavedEvents, setUserFriendSavedEvents] = useState([]);

  useEffect(() => {
    function getSavedEventDetails() {
      let interArr = events.filter((event) => {
        return friendSavedEvents?.includes(event.id);
      });
      setUserFriendSavedEvents(interArr);
    }
    getSavedEventDetails();
  }, []);

  return (
    <>
      <div className="card card-white grid-margin">
        <div className="card-heading clearfix">
          <h4 className="card-title">Saved Events</h4>
        </div>
        {userFriendSavedEvents.length !== 0 ? (
          userFriendSavedEvents?.map((userFriendSavedEvent) => (
            <Toast>
              <Toast.Header closeButton={false}>
                <img
                  src="holder.js/20x20?text=%20"
                  classNameName="rounded me-2"
                  alt=""
                />
                <strong classNameName="me-auto">
                  {userFriendSavedEvent?.title}
                </strong>
                <small>11 mins ago</small>
              </Toast.Header>
              <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
            </Toast>
          ))
        ) : (
          <>User has no saved Events</>
        )}
      </div>
    </>
  );
}
