import React from "react";
import HeaderProfileBackgroundImg from "./HeaderProfileBackgroundImg";
import HeaderProfileLinks from "./HeaderProfileLinks";

export default function HeaderProfilePage() {
  return (
    <>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="profile-header">
            <HeaderProfileBackgroundImg />
            <HeaderProfileLinks />
          </div>
        </div>
      </div>
    </>
  );
}
