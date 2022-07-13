import React from "react";

export default function CommentButton({
  displayPostTextBox,
  setDisplayPostTextBox,
}) {
  return (
    <>
      <a
        className="d-flex align-items-center text-muted mr-4"
        onClick={() => {
          setDisplayPostTextBox(displayPostTextBox ? false : true);
        }}
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
          className="feather feather-message-square icon-md"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <p className="d-none d-md-block ml-2">Comment</p>
      </a>
    </>
  );
}
