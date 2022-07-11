import REACT from "react";
import { useUserData } from "../contexts/UserDataContext";
import UserAboutComponent from "../components/UserProfileComponents/UserAboutComponent";
import UserSavedEventsComponent from "../components/UserProfileComponents/UserSavedEventsComponent";
import UserFeedComponent from "../components/UserProfileComponents/UserFeedComponent";
import UserProfileRightWrapper from "../components/UserProfileComponents/UserProfileRightWrapper";
export default function UserProfile() {
  const { userDetails } = useUserData();
  console.log("user details", userDetails);
  return (
    <>
      <div className="row profile-body">
        <UserAboutComponent />
        <UserFeedComponent />
        <UserProfileRightWrapper />
      </div>
    </>
  );
}
