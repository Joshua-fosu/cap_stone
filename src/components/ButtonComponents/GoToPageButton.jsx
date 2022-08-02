import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";

export default function GoToPageButton({ eachPost }) {
  const Navigate = useNavigate();
  const { userDetails } = useUserData();
  const handleGoToPage = () => {
    Navigate(`/user/${userDetails?.userID}/${eachPost?.userID}/view/`);
  };

  return (
    <a
      className="dropdown-item d-flex align-items-center"
      onClick={handleGoToPage}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="feather feather-corner-right-up icon-sm mr-2"
      >
        <polyline points="10 9 15 4 20 9"></polyline>
        <path d="M4 20h7a4 4 0 0 0 4-4V4"></path>
      </svg>{" "}
      <span className="">Go to post</span>
    </a>
  );
}
