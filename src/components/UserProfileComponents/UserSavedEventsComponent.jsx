import React, { useState, useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import blackImg from "./A_black_image.jpg";
import { useUserData } from "../../contexts/UserDataContext";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { database } from "../../firebase/firebase";

export default function UserSavedEventsComponent() {
  const [toastSavedEvents, setToastSavedEvents] = useState([]);
  const { userDetails, events } = useUserData();

  useEffect(() => {
    async function fetchSavedEvents() {
      const docRef = doc(database, "users", userDetails?.userEmail);
      const docSnap = await getDoc(docRef);
      setToastSavedEvents(
        events?.filter((event) => {
          console.log("State");
          return docSnap?.data()?.savedEvents.find((savedEvent) => {
            return savedEvent === event.id;
          });
        })
      );
    }
    fetchSavedEvents();
  }, [events, userDetails]);

  return (
    <>
      <div
        className="col-md-12 grid-margin"
        style={{ height: "25rem", overflowY: "scroll" }}
      >
        <div className="card rounded">
          <div className="card-body">
            <h6 className="card-title">Saved Events</h6>
            <div className="latest-photos">
              <div className="row">
                {toastSavedEvents.length !== 0 ? (
                  toastSavedEvents.map((toastSavedEvent) => (
                    <Toast>
                      <Toast.Header closeButton={false}>
                        <img
                          src="holder.js/20x20?text=%20"
                          classNameName="rounded me-2"
                          alt=""
                        />
                        <strong classNameName="me-auto">
                          {toastSavedEvent.title}
                        </strong>
                        <small>11 mins ago</small>
                      </Toast.Header>
                      <Toast.Body>
                        Hello, world! This is a toast message.
                      </Toast.Body>
                    </Toast>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
