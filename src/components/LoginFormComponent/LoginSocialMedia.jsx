import React, { useId } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { useUserData } from "../../contexts/UserDataContext";

export default function LoginSocialMedia() {
  const { socialMediaAuth, FacebookProvider } = useAuth();
  const user_id = useId();
  const multiAvatarAPI = "s6n39c8ltBQdAV";
  const { setUserDetails } = useUserData();

  const Navigate = useNavigate();

  const handleOnClick = async (provider) => {
    try {
      await socialMediaAuth(provider);
    } catch (err) {}
  };

  return (
    <>
      <div className="socials">
        <a
          href="#"
          className="zmdi zmdi-facebook"
          onClick={() => handleOnClick(FacebookProvider)}
        ></a>
      </div>
    </>
  );
}
