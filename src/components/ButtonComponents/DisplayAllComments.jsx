import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { findTimeElapsed } from "../../utils/TimeConversion";

export default function DisplayAllComments({ userPost }) {
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    async function fetchPostComments() {
      const unsub = onSnapshot(doc(database, "posts", userPost?.id), (doc) => {
        setAllComments(doc.data().comments);
      });
    }
    fetchPostComments();
  }, [userPost]);

  return (
    <>
      {allComments.length !== 0 ? (
        allComments.map((comment) => (
          <div class="timeline-comment">
            <div class="timeline-comment-header">
              <img src={comment?.userAvartar} alt="" />
              <p>
                {comment?.userName}{" "}
                <small>{findTimeElapsed(comment?.createdAt)}</small>
              </p>
            </div>
            <p class="timeline-comment-text">{comment.comment}</p>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
}
