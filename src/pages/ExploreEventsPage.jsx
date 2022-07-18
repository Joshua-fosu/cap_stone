import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import axios from "axios";
import "./ExploreEvents.css";
import EventPageModalComponent from "../components/EventPageComponent/EventPageModalComponent";
import EventSearchbar from "../components/EventPageComponent/EventSearchbar";
import EventPageSideDetails from "../components/EventPageComponent/EventPageSideDetails";
import { useUserData } from "../contexts/UserDataContext";
import Paginationn from "../components/Pagination/Pagination";

export default function ExploreEventsPage() {
  const [eventID, setEventID] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [filterEvent, setFilterEvent] = useState("");
  const { events } = useUserData();
  const [posts, setPosts] = useState(events);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const noDescription = "There are no descriptions yet for this event!";

  let eventsFiltered = events;
  if (filterEvent !== "") {
    eventsFiltered = events.filter((event) => {
      var typedLowerCase = filterEvent.toLowerCase();
      var eventTitleLowerCase = event.title.toLowerCase();
      console.log(eventTitleLowerCase);
      return eventTitleLowerCase.includes(typedLowerCase);
    });
    currentPosts = eventsFiltered.slice(indexOfFirstPost, indexOfLastPost);
  }

  // Get current posts

  var currentPosts = eventsFiltered.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Row>
        <EventSearchbar setFilterEvent={setFilterEvent} />
        <Col sm={9} style={{ alignContent: "space-between", alignItems: "" }}>
          <Row style={{ alignContent: "space-between", marginTop: "1rem" }}>
            {currentPosts.map((event, idx) => (
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
            {filterEvent === "" ? (
              <Paginationn
                postsPerPage={postsPerPage}
                totalPosts={posts?.length}
                paginate={paginate}
              />
            ) : (
              <></>
            )}
          </Row>
        </Col>
        <Col sm={3}>
          <EventPageSideDetails eventID={eventID} />
        </Col>
      </Row>
    </>
  );
}
