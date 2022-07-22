import React, { useState, useEffect } from "react";
import UserStatDisplayCarousel from "./UserStatDisplayCarousel";

export default function UserStatus() {
  return (
    <>
      <div className="card rounded">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h6 className="card-title mb-0">Status</h6>
          </div>
          <UserStatDisplayCarousel />
        </div>
      </div>
    </>
  );
}
