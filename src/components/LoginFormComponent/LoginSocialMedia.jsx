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
      const userDetails = await socialMediaAuth(provider);
      const userName = userDetails.displayName.replace(/ +/g, "");
      Navigate(`/user/${userName}`);

      const userRef = doc(database, "users", userDetails.email);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        await setDoc(doc(database, "users", userDetails.email), {
          userName: userName,
          userEmail: userDetails.email,
          numOfPosts: 0,
          Following: 0,
          userFriends: [],
          Followers: 0,
          About: "",
          userAvatar_pic: `https://api.multiavatar.com/${userName}.svg?apikey=${multiAvatarAPI}`,
          userID: user_id,
          savedEvents: 0,
          createdAt: new Date().toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        });
      }
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
