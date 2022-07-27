import React from "react";
import "./UserProfileSkeleton.scss";

export default function UserProfileSkeleton() {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "flex-start",
        alignContent: "flex-start",
        alignSelf: "flex-start",
      }}
    >
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
    </div>
  );
}
