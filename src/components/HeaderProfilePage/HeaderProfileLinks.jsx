import React, { useState, useEffect, useReducer, useRef } from "react";
import { Link } from "react-router-dom";

export default function HeaderProfileLinks() {
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
          <Link to="/user/user_id/">
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
          <Link to="/user/user_id/">
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
          <Link to="/user/user_id/friends/">
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
                Friends <span className="text-muted tx-12">3,765</span>
              </a>
            </li>
          </Link>
          <Link to="/user/user_id/events/">
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
        </ul>
      </div>
    </>
  );
}
