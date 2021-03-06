import React, { useState, useEffect } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UserSuggestedFriends() {
  const { getSuggestedProfiles, userSuggestedProfiles, userDetails } =
    useUserData();
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );

  return (
    <>
      <div className="col-md-12 grid-margin">
        <div className="card rounded">
          <div className="card-body">
            <h6 className="card-title">Suggested Friends</h6>
            <div className="latest-photos">
              <div className="row">
                {userSuggestedProfiles.length !== 0 ? (
                  userSuggestedProfiles.map((friend) => (
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          @{friend.userName}
                        </Tooltip>
                      }
                    >
                      <div className="col-md-4">
                        <Link
                          to={`/user/${userDetails?.userID}/${friend?.userID}/view/`}
                        >
                          <figure>
                            <img
                              className="img-fluid"
                              src={friend.userAvatar_pic}
                              alt=""
                            />
                          </figure>
                        </Link>
                      </div>
                    </OverlayTrigger>
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
