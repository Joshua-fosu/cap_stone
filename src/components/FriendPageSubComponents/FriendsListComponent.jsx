import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AllFriendsComponent from "./AllFriendsComponent";
import FollowedFriendsComponent from "./FollowedFriendsComponent";

export default function FriendsListComponent() {
  const [userFriends, setUserFriends] = useState([]);
  return (
    <>
      <Row>
        <Col sm={8}>
          <AllFriendsComponent />
        </Col>
        <Col sm={4}>
          <FollowedFriendsComponent />
        </Col>
      </Row>
    </>
  );
}
