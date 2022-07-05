import REACT from "react";
import { useUserData } from "../contexts/UserDataContext";

export default function UserProfile() {
  const { userDetails } = useUserData();
  console.log("user details", userDetails);
  return <>This is the user's profile page</>;
}
