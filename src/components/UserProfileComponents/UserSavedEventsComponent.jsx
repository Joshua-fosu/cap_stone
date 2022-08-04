import React, { useState, useEffect } from "react";
import { Toast, ToastContainer, Button } from "react-bootstrap";
import blackImg from "./A_black_image.jpg";
import { useUserData } from "../../contexts/UserDataContext";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { gapi } from "gapi-script";
import ApiCalendar from "react-google-calendar-api";

export default function UserSavedEventsComponent() {
  const [toastSavedEvents, setToastSavedEvents] = useState([]);
  const { userDetails, events, addToCalendar } = useUserData();

  const config = {
    clientId:
      "200592532449-ieu5ld03a7abkbedtlvvfbdv2aolktl1.apps.googleusercontent.com",
    apiKey: "AIzaSyAc1wXM5yPn380XdavL4BciDBKtqCcx8eM",
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ],
  };

  const apiCalendar = new ApiCalendar(config);

  const addToStatus = () => {
    toastSavedEvents.forEach(async (eachSavedEvent) => {
      const docRef = await addDoc(collection(database, "statuses"), {
        name: eachSavedEvent?.name,
        id: eachSavedEvent?.id,
        image: eachSavedEvent?.images[7]?.url,
        owner: userDetails?.userName,
      });
    });
  };

  useEffect(() => {
    async function fetchSavedEvents() {
      const docRef = doc(database, "users", userDetails?.userEmail);
      const docSnap = await getDoc(docRef);
      setToastSavedEvents(
        events?.filter((event) => {
          return docSnap?.data()?.savedEvents.find((savedEvent) => {
            return savedEvent === event.id;
          });
        })
      );
    }
    fetchSavedEvents();
  }, [userDetails]);

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
                    <Toast className="mb-2">
                      <Toast.Header closeButton={false}>
                        <img
                          src="holder.js/20x20?text=%20"
                          classNameName="rounded me-2"
                          alt=""
                        />
                        <strong classNameName="me-auto">
                          {toastSavedEvent?.name}
                        </strong>
                        <small>11 mins ago</small>
                      </Toast.Header>
                      <Toast.Body>
                        <Button
                          onClick={addToStatus}
                          style={{
                            backgroundColor: "blue",
                            fontSize: "0.5rem",
                          }}
                        >
                          Add To Status
                        </Button>
                        <Button
                          onClick={addToCalendar}
                          style={{
                            backgroundColor: "blue",
                            fontSize: "0.5rem",
                          }}
                          id={toastSavedEvent?.id}
                        >
                          Add To Calendar
                        </Button>
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
