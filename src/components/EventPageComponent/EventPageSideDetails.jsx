import React, { useEffect, useState } from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { useUserData } from "../../contexts/UserDataContext";

export default function EventPageSideDetails({ eventID }) {
  const [specEvent, setSpecEvent] = useState([]);
  const { events } = useUserData();
  const { userDetails } = useUserData();

  let filteredEvent = [];
  useEffect(() => {
    setSpecEvent(
      events.filter((event) => {
        console.log("Unfor", event.id === eventID);
        return event.id === eventID;
      })
    );
  }, [eventID]);

  const addToSavedEvents = async (event) => {
    console.log("user detials", userDetails.userEmail);
    const userDocRef = doc(database, "users", userDetails.userEmail);
    await updateDoc(userDocRef, {
      savedEvents: arrayUnion(specEvent[0].id),
    });
  };

  return (
    <>
      {specEvent.length !== 0 ? (
        <Card style={{ width: "100%", marginTop: "1rem" }}>
          <Card.Img variant="top" src={specEvent[0]?.images[7]?.url} />
          <Card.Body>
            <Card.Title>{specEvent[0]?.name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Button
              onClick={addToSavedEvents}
              style={{ backgroundColor: "blue" }}
            >
              Save
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <h6>Select an Event</h6>
      )}
    </>
  );
}
