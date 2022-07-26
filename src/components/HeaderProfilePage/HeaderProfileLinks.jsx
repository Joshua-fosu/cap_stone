import React, { useState, useEffect, useReducer, useRef } from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";

export default function HeaderProfileLinks() {
  const { userDetails } = useUserData();
  const initialState = { active: "Timeline" };

  function reducer(state, action) {
    switch (action.type) {
      case "Timeline":
        return { active: "Timeline" };
      case "About":
        return { active: "About" };
      case "Friends":
        return { active: "Friends" };
      case "Events":
        return { active: "Events" };
      case "Chat":
        return { active: "Chat" };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const specificLiClassName = "header-link-item d-flex align-items-center";
  const genericLiClassName =
    "header-link-item ml-3 pl-3 border-start d-flex align-items-center";

  return (
    <>
      <div className="header-links">
        <ul className="links d-flex align-items-center mt-3 mt-md-0">
          <Link to={`/user/${userDetails?.userID}/`}>
            <li
              className={
                state.active === "Timeline"
                  ? genericLiClassName + " active"
                  : genericLiClassName
              }
              onClick={() => dispatch({ type: "Timeline" })}
            >
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
                className="feather feather-columns mr-1 icon-md"
              >
                <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
              </svg>
              <a className="pt-1px d-none d-md-block" href="#">
                Timeline
              </a>
            </li>
          </Link>
          <Link to={`/user/${userDetails?.userID}/`}>
            <li
              className={
                state.active === "About"
                  ? genericLiClassName + " active"
                  : genericLiClassName
              }
              onClick={() => dispatch({ type: "About" })}
            >
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
                className="feather feather-user mr-1 icon-md"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <a className="pt-1px d-none d-md-block" href="#">
                About
              </a>
            </li>
          </Link>
          <Link to={`/user/${userDetails?.userID}/friends`}>
            <li
              className={
                state.active === "Friends"
                  ? genericLiClassName + " active"
                  : genericLiClassName
              }
              onClick={() => dispatch({ type: "Friends" })}
            >
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
                className="feather feather-users mr-1 icon-md"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <a className="pt-1px d-none d-md-block" href="#">
                Friends{" "}
                <span className="text-muted tx-12">
                  ({userDetails?.followingFriends?.length})
                </span>
              </a>
            </li>
          </Link>
          <Link to={`/user/${userDetails?.userID}/events`}>
            <li
              className={
                state.active === "Events"
                  ? genericLiClassName + " active"
                  : genericLiClassName
              }
              onClick={() => dispatch({ type: "Events" })}
            >
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
                className="feather feather-image mr-1 icon-md"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <a className="pt-1px d-none d-md-block" href="#">
                Events
              </a>
            </li>
          </Link>
          <Link to={`/user/${userDetails?.userID}/chat`}>
            <li
              className={
                state.active === "Chat"
                  ? genericLiClassName + " active"
                  : genericLiClassName
              }
              onClick={() => dispatch({ type: "Chat" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-chat-dots"
                viewBox="0 0 16 16"
              >
                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
              </svg>
              <a className="pt-1px d-none d-md-block" href="#">
                Chat
              </a>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}
