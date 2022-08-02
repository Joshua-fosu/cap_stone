import React, { useState, useEffect, useRef } from "react";
import { Overlay, Popover } from "react-bootstrap";

export default function UserAboutEditButton({ setEdit }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleEditClick = () => {
    setEdit(true);
    setShow(!show);
  };

  return (
    <>
      <button
        className="btn p-0"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={handleClick}
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
          className="feather feather-more-horizontal icon-lg text-muted pb-3px"
        >
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </button>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Body>
            <a
              className="dropdown-item d-flex align-items-center"
              onClick={handleEditClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-edit-2 icon-sm mr-2"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>{" "}
              <span className="">Edit</span>
            </a>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
}
