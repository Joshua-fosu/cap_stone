import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import "./ExploreEvents.css";
import EventPageModalComponent from "../components/EventPageComponent/EventPageModalComponent";
import EventSearchbar from "../components/EventPageComponent/EventSearchbar";

export default function ExploreEventsPage() {
  const [events, setEvents] = useState([]);
  const [eventID, setEventID] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [filterEvent, setFilterEvent] = useState("");

  const noDescription = "There are no descriptions yet for this event!";

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer FaxaHps5PGFaZI7qmJF-qb62W-xehMjApnKARcuj",
    },
  };
  const URL = "https://api.predicthq.com/v1/events/?limit=200&offset=200";

  useEffect(() => {
    async function fetchEvents() {
      // You can await here
      const response = await axios
        .get(URL, config)
        .then((res) => {
          setEvents(res.data.results);
        })
        .catch((err) => console.log(err));
      // ...
    }
    fetchEvents();
  }, []); // Or [] if effect doesn't need props or state
  let eventsFiltered = events;
  if (filterEvent !== "") {
    eventsFiltered = events.filter((event) => {
      var typedLowerCase = filterEvent.toLowerCase();
      var eventTitleLowerCase = event.title.toLowerCase();
      return eventTitleLowerCase.includes(typedLowerCase);
    });
  }

  return (
    <>
      <Row>
        <Col sm={12} style={{ alignContent: "space-between", alignItems: "" }}>
          <EventSearchbar setFilterEvent={setFilterEvent} />
          <Row style={{ alignContent: "space-between", marginTop: "1rem" }}>
            {eventsFiltered.map((event, idx) => (
              <>
                <Card
                  style={{
                    width: "18rem",
                    marginRight: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src="https://image.shutterstock.com/image-vector/events-colorful-typography-banner-260nw-1356206768.jpg"
                  />
                  <Card.Body>
                    <Card.Title className="truncate-header">
                      {event.title}
                    </Card.Title>
                    <Card.Text className="truncate-event-description">
                      {event.description ? event.description : noDescription}
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="btn-primary"
                      id={event.id}
                      onClick={(event) => {
                        setModalShow(true);
                        console.log("id", event.target.id);
                        setEventID(event.target.id);
                      }}
                      style={{ backgroundColor: "blue" }}
                    >
                      See details
                    </Button>
                  </Card.Body>
                </Card>
              </>
            ))}
          </Row>
        </Col>
        <EventPageModalComponent
          show={modalShow}
          onHide={() => setModalShow(false)}
          events={events}
          eventID={eventID}
        />
      </Row>
    </>
  );
}
