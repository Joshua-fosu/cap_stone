import React, { useState, useEffect } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import LikeButton from "../ButtonComponents/LikeButton";
import CommentButton from "../ButtonComponents/CommentButton";
import PostTextBox from "../ButtonComponents/PostTextBox";

import { findTimeElapsed } from "../../utils/TimeConversion";

export default function FriendPostComponent({ eachFriendPost }) {
  const [displayPostTextBox, setDisplayPostTextBox] = useState(false);
  const [displayTimeElapsed, setDisplayTimeElapsed] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(eachFriendPost?.likes);

  useEffect(() => {
    setDisplayTimeElapsed(findTimeElapsed(eachFriendPost?.createdAt));
  }, []);

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
                <p className="tx-11 text-muted">{displayTimeElapsed}</p>
              </div>
            </div>
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
            <LikeButton
              userPostDetails={eachFriendPost}
              hasLiked={hasLiked}
              setHasLiked={setHasLiked}
              numberOfLikes={numberOfLikes}
              setNumberOfLikes={setNumberOfLikes}
            />
            <CommentButton
              displayPostTextBox={displayPostTextBox}
              setDisplayPostTextBox={setDisplayPostTextBox}
            />
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
