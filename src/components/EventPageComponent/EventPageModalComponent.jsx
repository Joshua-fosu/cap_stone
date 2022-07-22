import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { useUserData } from "../../contexts/UserDataContext";

export default function EventPageModalComponent(props) {
  const [eventDetails, setEventDetails] = useState([]);
  const { userDetails } = useUserData();

  const noDescription = "There are no descriptions yet for this event!";

  useEffect(() => {
    async function fetchEventDetails() {
      let filteredEvent = await props.events.filter((event) => {
        return event.id === props.eventID;
      });
      setEventDetails(filteredEvent);
    }
    fetchEventDetails();
  }, [props.eventID]);

  const addToSavedEvents = async (event) => {
    const userDocRef = doc(database, "users", userDetails?.userEmail);

    await updateDoc(userDocRef, {
      savedEvents: eventDetails,
    });
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ backgroundColor: "white !important" }}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "white !important" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            {eventDetails[0]?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{eventDetails[0]?.category}</h4>
          <p>
            {eventDetails[0]?.description
              ? eventDetails[0]?.description
              : noDescription}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} style={{ backgroundColor: "red" }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
