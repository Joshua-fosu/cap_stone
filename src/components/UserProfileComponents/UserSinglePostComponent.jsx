import React, { useState, useEffect } from "react";
import LikeButton from "../ButtonComponents/LikeButton";
import CommentButton from "../ButtonComponents/CommentButton";
import PostTextBox from "../ButtonComponents/PostTextBox";
import { Overlay, Popover, Button, OverlayTrigger } from "react-bootstrap";
import { findTimeElapsed } from "../../utils/TimeConversion";
import UnfollowButton from "../ButtonComponents/UnfollowButton";
import GoToPageButton from "../ButtonComponents/GoToPageButton";
import DeletePost from "../ButtonComponents/DeletePost";
import DownloadButton from "../ButtonComponents/DownloadButton";
import { useUserData } from "../../contexts/UserDataContext";
import { dbClickToLike } from "../ButtonComponents/LikeButton";
import "./UserSinglePostComponent.css";

export default function UserSinglePostComponent({ userPost }) {
  const [displayPostTextBox, setDisplayPostTextBox] = useState(false);
  const [displayTimeElapsed, setDisplayTimeElapsed] = useState("");
  const { userDetails } = useUserData();
  const [deletePost, setDeletePost] = useState(false);
  const [show, setShow] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(userPost?.likes);

  useEffect(() => {
    setDisplayTimeElapsed(findTimeElapsed(userPost?.createdAt));
  }, []);

  return (
    <>
      <div className={deletePost ? "d-none" : "col-md-12 grid-margin"}>
        <div className="card rounded">
          <div className="card-header">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img
                  className="img-xs rounded-circle"
                  src={userPost?.userDetails?.userAvatar_pic}
                  alt=""
                />
                <div className="ml-2">
                  <p>@{userPost.userName}</p>
                  <p className="tx-11 text-muted">{displayTimeElapsed}</p>
                </div>
              </div>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                show={show}
                overlay={
                  <Popover id={`popover-positioned-bottom`}>
                    <Popover.Header as="h3">Menu</Popover.Header>
                    <Popover.Body>
                      {userDetails?.userName === userPost?.userName ? (
                        <>
                          <DeletePost
                            eachPost={userPost}
                            setDeletePost={setDeletePost}
                            setShow={setShow}
                          />{" "}
                        </>
                      ) : (
                        <>
                          <UnfollowButton
                            eachPost={userPost}
                            setShow={setShow}
                          />
                          <GoToPageButton eachPost={userPost} />
                        </>
                      )}
                      <DownloadButton eachPost={userPost} />
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
                  onClick={() => {
                    setShow(!show);
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
                    className="feather feather-more-horizontal icon-lg pb-3px"
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
              onClick={() => {
                dbClickToLike(userPost, userDetails?.userName);
                setHasLiked(hasLiked ? false : true);
                setNumberOfLikes(
                  hasLiked ? numberOfLikes - 1 : numberOfLikes + 1
                );
              }}
              style={{
                scrollSnapType: "x mandatory !important",
                display: "flex",
                WebkitOverflowScrolling: "touch",
                overflowX: "auto",
                gap: "10px",
              }}
            >
              {userPost?.imageURL.length > 1 ? (
                userPost?.imageURL.map((eachPost) => (
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
                    <img
                      className="singlepost_img"
                      src={eachPost}
                      onDoubleClick={(e) => {}}
                    />
                  </div>
                ))
              ) : (
                <>
                  <img
                    className="singlepost_img"
                    src={userPost?.imageURL}
                    alt=""
                    srcset=""
                    onDoubleClick={() => {}}
                  />
                </>
              )}
            </div>
            <p className="mb-3 tx-14 text-muted text-lowercase">
              {userPost?.eventName}
            </p>
            <p className="mb-3 tx-14 text-muted text-lowercase">
              {userPost?.eventDescription}
            </p>
          </div>
          <div className="card-footer">
            <div className="d-flex post-actions">
              <LikeButton
                userPostDetails={userPost}
                hasLiked={hasLiked}
                setHasLiked={setHasLiked}
                numberOfLikes={numberOfLikes}
                setNumberOfLikes={setNumberOfLikes}
              />
              <CommentButton
                displayPostTextBox={displayPostTextBox}
                setDisplayPostTextBox={setDisplayPostTextBox}
              />

              {/* <DownloadButton eachPost={userPost} /> */}
            </div>
          </div>
        </div>
        {displayPostTextBox ? (
          <>
            <PostTextBox userPost={userPost} />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
