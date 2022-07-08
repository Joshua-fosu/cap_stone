import React, { useState, useEffect } from "react";
import { useUserData } from "../../contexts/UserDataContext";

export default function UserSuggestedFriends() {
  const { getSuggestedProfiles, userSuggestedProfiles } = useUserData();

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
                    <div className="col-md-4">
                      <figure>
                        <img
                          className="img-fluid"
                          src={friend.userAvatar_pic}
                          alt=""
                        />
                      </figure>
                    </div>
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
