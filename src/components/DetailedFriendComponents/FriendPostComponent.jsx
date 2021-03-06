import React, { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import LikeButton from "../ButtonComponents/LikeButton";
import CommentButton from "../ButtonComponents/CommentButton";
import PostTextBox from "../ButtonComponents/PostTextBox";

export default function FriendPostComponent({ eachFriendPost }) {
  const [displayPostTextBox, setDisplayPostTextBox] = useState(false);

  return (
    <>
      <div className="card rounded mb-5">
        <div className="card-header">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img
                className="img-xs rounded-circle"
                src={eachFriendPost?.userDetails?.userAvatar_pic}
                alt=""
              />
              <div className="ml-2">
                <p>@{eachFriendPost?.userName}</p>
                <p className="tx-11 text-muted">1 min ago</p>
              </div>
            </div>
            <OverlayTrigger
              trigger="click"
              // key={}
              placement="bottom"
              overlay={
                <Popover id={`popover-positioned-bottom`}>
                  <Popover.Header as="h3">{`Popover bottom`}</Popover.Header>
                  <Popover.Body>
                    <strong>Holy guacamole!</strong> Check this info.
                  </Popover.Body>
                </Popover>
              }
            >
              <button
                className="btn"
                type="button"
                id="dropdownMenuButton2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
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
                  class="feather feather-more-horizontal icon-lg pb-3px"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </OverlayTrigger>
          </div>
        </div>
        <div className="card-body">
          <div
            style={{
              scrollSnapType: "x mandatory !important",
              display: "flex",
              WebkitOverflowScrolling: "touch",
              overflowX: "auto",
              gap: "10px",
            }}
          >
            {eachFriendPost?.imageURL.length > 1 ? (
              eachFriendPost?.imageURL.map((eachPost) => (
                <div
                  className="snap-center"
                  style={{
                    scrollSnapAlign: "center",
                    position: "relative",
                    width: "100%",
                    minWidth: "100%",
                    flex: "0 0 50px",
                    maxHeight: "30rem",
                  }}
                >
                  <img className="singlepost_img" src={eachPost} />
                </div>
              ))
            ) : (
              <>
                <img
                  className="singlepost_img"
                  src={eachFriendPost?.imageURL}
                  alt=""
                  srcset=""
                />
              </>
            )}
          </div>
          <p className="mb-3 tx-14">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
            minima delectus nemo unde quae recusandae assumenda.
          </p>
        </div>
        <div className="card-footer">
          <div className="d-flex post-actions">
            <LikeButton userPostDetails={eachFriendPost} />
            <CommentButton
              displayPostTextBox={displayPostTextBox}
              setDisplayPostTextBox={setDisplayPostTextBox}
            />
            <a href="#" className="d-flex align-items-center text-muted">
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
                className="feather feather-share icon-md"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
              <p className="d-none d-md-block ml-2">Share</p>
            </a>
          </div>
        </div>
      </div>
      {displayPostTextBox ? (
        <>
          <PostTextBox userPost={eachFriendPost} />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
