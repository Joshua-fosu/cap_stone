import React from "react";

export default function HeaderProfileBackgroundImg() {
  return (
    <>
      <div className="cover">
        <div className="gray-shade"></div>
        <figure>
          <img
            src="https://bootdey.com/img/Content/bg1.jpg"
            className="img-fluid"
            alt="profile cover"
          />
        </figure>
        <div className="cover-body d-flex justify-content-between align-items-center">
          <div>
            <img
              className="profile-pic"
              src="https://bootdey.com/img/Content/avatar/avatar6.png"
              alt="profile"
            />
            <span className="profile-name">Amiah Burton</span>
          </div>
          <div className="d-none d-md-block">
            <button className="btn btn-primary btn-icon-text btn-edit-profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-edit btn-icon-prepend"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>{" "}
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
