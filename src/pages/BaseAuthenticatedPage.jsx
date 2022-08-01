import React from "react";
import "./BaseAuthenticatedPage.css";
import HeaderProfilePage from "../components/HeaderProfilePage/HeaderProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as ROUTES from "../routes/routes";
import ProtectedRoute from "../routes/ProtectedRoute";
import ExploreEventsPage from "./ExploreEventsPage";
import ExploreFriendsPage from "./ExploreFriendsPage";
import CreatePostPage from "./CreatePostPage";
import UserProfile from "./UserProfile";
import DetailedFriendPage from "./DetailedFriendPage";
import UserChatPage from "./UserChatPage";
import NotFoundPage from "./NotFoundPage";

export default function BaseAuthenticatedPage() {
  return (
    <>
      <div class="container">
        <div class="profile-page tx-13">
          {" "}
          <HeaderProfilePage />
          <Routes>
            <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
            <Route exact path={ROUTES.PROFILE} element={<UserProfile />} />
            <Route
              exact
              path={ROUTES.EXPLORE_FRIENDS}
              element={<ExploreFriendsPage />}
            />
            <Route
              exact
              path={ROUTES.CREATE_POST}
              element={<CreatePostPage />}
            />
            <Route path={ROUTES.EVENTS} element={<ExploreEventsPage />} />
            <Route
              exact
              path={ROUTES.DETAILED_FRIEND_PAGE_VIEW}
              element={<DetailedFriendPage />}
            />
            <Route exact path={ROUTES.CHAT} element={<UserChatPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
