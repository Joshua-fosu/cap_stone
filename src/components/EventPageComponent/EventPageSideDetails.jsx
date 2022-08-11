import React, { useEffect, useState } from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { useUserData } from "../../contexts/UserDataContext";

export default function EventPageSideDetails({ eventID }) {
  const [specEvent, setSpecEvent] = useState([]);
  const {
    events,
    setEvents,
    setUserSavedEvents,
    userSavedEvents,
    userDetails,
  } = useUserData();

  let filteredEvent = [];
  useEffect(() => {
    setSpecEvent(
      events.filter((event) => {
        return event.id === eventID;
      })
    );
  }, [eventID]);

  const addToSavedEvents = async (event) => {
    setUserSavedEvents([...userSavedEvents, specEvent[0].id]);
    const userDocRef = doc(database, "users", userDetails.userEmail);
    await updateDoc(userDocRef, {
      savedEvents: arrayUnion(specEvent[0].id),
    });
  };

  const deleteFromSavedEvents = async () => {
    let interArr = userSavedEvents.filter((eachUserSavedEvent) => {
      return eachUserSavedEvent !== specEvent[0].id;
    });
    setUserSavedEvents(interArr);
    const userDocRef = doc(database, "users", userDetails.userEmail);
    await updateDoc(userDocRef, {
      savedEvents: arrayRemove(specEvent[0].id),
    });
  };

  return (
    <>
      {specEvent.length !== 0 ? (
        <Card style={{ width: "100%", marginTop: "1rem" }}>
          <Card.Img variant="top" src={specEvent[0]?.images[7]?.url} />
          <Card.Body>
            <Card.Title>{specEvent[0]?.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              {specEvent[0]?.classifications[0]?.genre?.name}
            </ListGroupItem>
            <ListGroupItem>
              {" "}
              {specEvent[0]?.classifications[0]?.segment?.name}
            </ListGroupItem>
            <ListGroupItem>
              {" "}
              {specEvent[0]?.classifications[0]?.subGenre?.name}
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            {userSavedEvents.includes(specEvent[0].id) ? (
              <Button
                onClick={deleteFromSavedEvents}
                style={{ backgroundColor: "blue" }}
              >
                UnSave
              </Button>
            ) : (
              <Button
                onClick={addToSavedEvents}
                style={{ backgroundColor: "blue" }}
              >
                Save
              </Button>
            )}
          </Card.Body>
        </Card>
      ) : (
        <h6>Select an Event</h6>
      )}
    </>
  );
}
