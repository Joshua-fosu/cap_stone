import React, { useContext, useState, useEffect, Component } from "react";
import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  getDoc,
  doc,
  setDoc,
  limit,
  Timestamp,
} from "firebase/firestore";
import { database } from "../firebase/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDataContext = React.createContext();

export function useUserData() {
  return useContext(UserDataContext);
}

export function UserDataProvider({ children }) {
  const [userDetails, setUserDetails] = useState({});
  const [events, setEvents] = useState([]);
  const [userSuggestedProfiles, setUserSuggestedProfiles] = useState([]);
  const [includeInFeed, setIncludeInFeed] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const Navigate = useNavigate();

  async function getUserDetails(currentUserEmail) {
    try {
      setUserEmail(currentUserEmail);
      const docRef = doc(database, "users", currentUserEmail);
      const docSnap = await getDoc(docRef);
      setUserDetails(docSnap.data());
      getSuggestedProfiles(currentUserEmail);
      Navigate(`/user/${docSnap.data().userID}/`);
      getUserCoords();
      return docSnap.data().userEmail;
    } catch (err) {
      console.log("Unable to read", err);
    }
  }
  function getUserCoords() {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          console.log(
            "position",
            position.coords.latitude,
            position.coords.longitude
          );
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  }

  async function addNewFriendRoom(friendID) {
    const q = query(
      collection(database, "users"),
      where("userName", "==", friendID)
    );
    var newObjj = {};

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      var newObj = {
        userName: doc.data().userName,
        userAvartar: doc.data().userAvatar_pic,
      };
      newObjj = newObj;
    });
    const docRef = await addDoc(collection(database, "rooms"), {
      owners: [newObjj.userName, userDetails?.userName],
    });
    await setDoc(doc(database, "messages", docRef.id), {
      messages: [],
    });
  }

  async function uploadImageObject(url, eventName, eventDescription) {
    const id = "_" + Math.random().toString(36).substr(4, 19);
    const newImgObj = {
      userID: userDetails.userID,
      userDetails: userDetails,
      eventName: eventName,
      eventDescription: eventDescription,
      imageURL: url,
      userName: userDetails.userName,
      userEmail: userDetails.userEmail,
      comments: [],
      likes: 0,
      likesUsers: [],
      id: id,
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(database, "posts", id), newImgObj);
  }

  async function getSuggestedProfiles(userEmail) {
    const arrProfiles = [];
    const q = query(
      collection(database, "users"),
      where("userEmail", "!=", userEmail)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arrProfiles.push(doc.data());
    });
    setUserSuggestedProfiles(arrProfiles);
    console.log("user profiles", userSuggestedProfiles);
    return userSuggestedProfiles;
  }

  const getAttendees = async (eventToAdd) => {
    const q = query(
      collection(database, "users"),
      where("savedEvents", "array-contains", eventToAdd[0]?.id)
    );

    const querySnapshot = await getDocs(q);
    var interArr = [];
    querySnapshot.forEach((doc) => {
      interArr.push(doc.data()?.userEmail);
    });
    interArr.filter((attendee) => {
      return attendee !== userDetails?.userName;
    });

    return interArr;
  };

  const setEventStartEndTime = (eventToAdd) => {
    const startTime = eventToAdd[0]?.dates?.start?.dateTime;
    var futureDate = new Date(Date.parse(startTime) + 30 * 60000);
    const endTime = futureDate.toISOString();
    const timeZone = eventToAdd[0]?._embedded?.venues[0]?.timezone;

    const startEndTimes = {
      start: startTime,
      end: endTime,
      timeZone: timeZone,
    };
    return startEndTimes;
  };

  const addToCalendar = (event) => {
    var gapi = window.gapi;

    var CLIENT_ID =
      "200592532449-ieu5ld03a7abkbedtlvvfbdv2aolktl1.apps.googleusercontent.com";
    var API_KEY = "AIzaSyAc1wXM5yPn380XdavL4BciDBKtqCcx8eM";
    var DISCOVERY_DOCS = [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ];
    var SCOPES = "https://www.googleapis.com/auth/calendar.events";

    let eventToAdd = events?.filter((eachEvent) => {
      return eachEvent?.id === event.target.id;
    });
    const attendees = getAttendees(eventToAdd);
    const startEndTimes = setEventStartEndTime(eventToAdd);

    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("bam!"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: eventToAdd[0]?.name,
            location: eventToAdd[0]?._embedded?.venues[0]?.address?.line1,
            description: "This event was added from the ReachMe App",
            start: {
              dateTime: startEndTimes?.start,
              timeZone: startEndTimes?.timeZone,
            },
            end: {
              dateTime: startEndTimes?.end,
              timeZone: startEndTimes?.timeZone,
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
            attendees: attendees,
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          var request = gapi.client.calendar?.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request?.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
          });
        });
    });
  };

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer FaxaHps5PGFaZI7qmJF-qb62W-xehMjApnKARcuj",
    },
  };

  const URL =
    "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=xAUT6SWiZgDpKhJFiEoGXRuo4igpPS26";

  useEffect(() => {
    async function fetchEvents() {
      // You can await here
      const response = await axios
        .get(URL)
        .then((res) => {
          console.log("all events", res.data._embedded.events);
          setEvents(res.data._embedded.events);
        })
        .catch((err) => console.log(err));
    }
    fetchEvents();
  }, []);

  const value = {
    getUserDetails,
    userDetails,
    setUserDetails,
    uploadImageObject,
    getSuggestedProfiles,
    userSuggestedProfiles,
    events,
    setEvents,
    setUserSuggestedProfiles,
    addToCalendar,
    addNewFriendRoom,
    lat,
    lng,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}
