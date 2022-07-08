import React from "react";
import UserSuggestedFriends from "./UserSuggestedFriends";
import UserSavedEventsComponent from "./UserSavedEventsComponent";

export default function UserProfileRightWrapper() {
  return (
    <>
      <div class="d-none d-xl-block col-xl-3 right-wrapper">
        <div class="row">
          <UserSuggestedFriends />
          <UserSavedEventsComponent />
        </div>
      </div>
    </>
  );
}
