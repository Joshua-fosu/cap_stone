import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import blackImg from "./A_black_image.jpg";

export default function UserSavedEventsComponent() {
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  return (
    <>
      <div class="col-md-12 grid-margin">
        <div class="card rounded">
          <div class="card-body">
            <h6 class="card-title">Saved Events</h6>
            <div class="latest-photos">
              <div class="row">
                <Toast onClose={toggleShowB} show={showB} animation={false}>
                  <Toast.Header>
                    <img
                      src="https://image.shutterstock.com/image-vector/events-colorful-typography-banner-260nw-1356206768.jpg"
                      className="rounded me-2"
                      alt=""
                      style={{ width: "30px" }}
                    />
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                  </Toast.Header>
                  <Toast.Body>
                    Woohoo, you're reading this text in a Toast!
                  </Toast.Body>
                </Toast>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
