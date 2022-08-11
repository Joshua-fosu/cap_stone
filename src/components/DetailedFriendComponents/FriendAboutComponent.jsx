import React, { useState, useEffect } from "react";

export default function FriendAboutComponent({ friendDetails }) {
  return (
    <>
      <div className="col-lg-5 col-xl-3">
        <div className="card card-white grid-margin">
          <div className="card-heading clearfix">
            <h4 className="card-title">
              @ {friendDetails?.userName}'s Profile
            </h4>
          </div>
          <div className="card-body user-profile-card mb-3">
            <img
              src={friendDetails?.userAvatar_pic}
              className="user-profile-image rounded-circle"
              alt=""
            />
            <h4 className="text-center h6 mt-2">{friendDetails?.userName}</h4>
            <button
              className="btn btn-theme btn-sm"
              onDoubleClick={() => {
                console.log("Hello");
              }}
            >
              Unfollow
            </button>
            <button className="btn btn-theme btn-sm">Message</button>
          </div>

          <hr />
          <div className="card-heading clearfix mt-3">
            <h4 className="card-title">Contact Information</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-borderless mb-0 text-muted">
                <tbody>
                  <tr>
                    <th scope="row">Email:</th>
                    <td>{friendDetails?.userEmail}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
