import React, { useEffect, useState } from "react";
import FriendAboutComponent from "../components/DetailedFriendComponents/FriendAboutComponent";
import FriendPostComponent from "../components/DetailedFriendComponents/FriendPostComponent";
import FriendSubscribedFriendsComponent from "../components/DetailedFriendComponents/FriendSubscribedFriendsComponent";
import FriendSavedEvents from "../components/DetailedFriendComponents/FriendSavedEvents";
import "./DetailedFriendPage.css";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { database } from "../firebase/firebase";
import { useParams } from "react-router-dom";

export default function DetailedFriendPage() {
  const { friend_id } = useParams();
  const [friendDetails, setFriendDetails] = useState([]);
  const [friendPosts, setFriendPosts] = useState([]);

  useEffect(() => {
    async function fetchFriendDetails() {
      const friendDocRef = doc(database, "users", friend_id);
      const friendDocSnap = await getDoc(friendDocRef);
      setFriendDetails(friendDocSnap.data());
    }
    async function fetchFriendPosts() {
      const q = query(
        collection(database, "posts"),
        where("userEmail", "==", friend_id)
      );

      const querySnapshot = await getDocs(q);
      let interArr = [];
      querySnapshot.forEach((doc) => {
        interArr.push(doc.data());
      });
      setFriendPosts(interArr);
    }

    fetchFriendDetails();
    fetchFriendPosts();
  }, [friend_id]);

  return (
    <>
      <div class="container">
        <div className="page-inner no-page-title">
          {/* <!-- start page main wrapper --> */}
          <div id="main-wrapper">
            <div className="row">
              <FriendAboutComponent friendDetails={friendDetails} />
              {friendPosts.length !== 0 ? (
                friendPosts.map((friendPost) => (
                  <FriendPostComponent eachFriendPost={friendPost} />
                ))
              ) : (
                <>
                  <div className="col-lg-7 col-xl-6">
                    <p>There are no posts</p>
                  </div>
                </>
              )}

              <div className="col-lg-12 col-xl-3">
                <FriendSubscribedFriendsComponent
                  userFriends={friendDetails?.followingFriends}
                />
                <FriendSavedEvents
                  friendSavedEvents={friendDetails?.savedEvents}
                />
              </div>
            </div>
            {/* <!-- Row --> */}
          </div>
          {/* <!-- end page main wrapper --> */}
          <div className="page-footer">
            <p>Copyright © 2020 Evince All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="col-lg-7 col-xl-6">
                <div className="card card-white grid-margin">
                  <div className="card-body">
                    <div className="post">
                      <textarea
                        className="form-control"
                        placeholder="Post"
                        rows="4"
                      ></textarea>
                      <div className="post-options">
                        <a href="#">
                          <i className="fa fa-camera"></i>
                        </a>
                        <a href="#">
                          <i className="fas fa-video"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-music"></i>
                        </a>
                        <button className="btn btn-outline-primary float-right">
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile-timeline">
                  <ul className="list-unstyled">
                    <li className="timeline-item">
                      <div className="card card-white grid-margin">
                        <div className="card-body">
                          <div className="timeline-item-header">
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar7.png"
                              alt=""
                            />
                            <p>
                              Vikash smith <span>posted a status</span>
                            </p>
                            <small>3 hours ago</small>
                          </div>
                          <div className="timeline-item-post">
                            <p>
                              Elavita veritatis et quasi architecto beatae vitae
                              dicta sunt explicabo. Nemo enim ipsam voluptatem
                              quia voluptas sit aspernatur aut odit aut fugit,
                              sed quia consequuntur.
                            </p>
                            <div className="timeline-options">
                              <a href="#">
                                <i className="fa fa-thumbs-up"></i> Like (15)
                              </a>
                              <a href="#">
                                <i className="fa fa-comment"></i> Comment (4)
                              </a>
                              <a href="#">
                                <i className="fa fa-share"></i> Share (6)
                              </a>
                            </div>
                            <div className="timeline-comment">
                              <div className="timeline-comment-header">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                  alt=""
                                />
                                <p>
                                  Jamara Karle <small>1 hour ago</small>
                                </p>
                              </div>
                              <p className="timeline-comment-text">
                                Xullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                              </p>
                            </div>
                            <div className="timeline-comment">
                              <div className="timeline-comment-header">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                  alt=""
                                />
                                <p>
                                  Lois Anderson <small>3 hours ago</small>
                                </p>
                              </div>
                              <p className="timeline-comment-text">
                                Coluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui
                                officia.
                              </p>
                            </div>
                            <textarea
                              className="form-control"
                              placeholder="Replay"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item">
                      <div className="card card-white grid-margin">
                        <div className="card-body">
                          <div className="timeline-item-header">
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar7.png"
                              alt=""
                            />
                            <p>
                              Veema Walkeror <span>uploaded a photo</span>
                            </p>
                            <small>7 hours ago</small>
                          </div>
                          <div className="timeline-item-post">
                            <p>
                              totam rem aperiam, eaque ipsa quae ab illo
                              inventore
                            </p>
                            <img src="img/post-img01.jpg" alt="" />
                            <div className="timeline-options">
                              <a href="#">
                                <i className="fa fa-thumbs-up"></i> Like (22)
                              </a>
                              <a href="#">
                                <i className="fa fa-comment"></i> Comment (7)
                              </a>
                              <a href="#">
                                <i className="fa fa-share"></i> Share (9)
                              </a>
                            </div>
                            <div className="timeline-comment">
                              <div className="timeline-comment-header">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                  alt=""
                                />
                                <p>
                                  Memila moriya <small>1 hour ago</small>
                                </p>
                              </div>
                              <p className="timeline-comment-text">
                                Explicabo Nemo enim ipsam voluptatem quia
                                voluptas.
                              </p>
                            </div>
                            <textarea
                              className="form-control"
                              placeholder="Replay"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> */
}
