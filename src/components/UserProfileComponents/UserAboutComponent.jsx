import React, { useState } from "react";
import UserAboutEditButton from "../ButtonComponents/UserAboutEditButton";
import UserAboutTextArea from "../ButtonComponents/UserAboutTextArea";
import { useUserData } from "../../contexts/UserDataContext";
import { useAuth } from "../../contexts/AuthContext";
import UserStatus from "./UserStatus";

export default function UserAboutComponent() {
  const { userDetails } = useUserData();
  const { userSignOut, setIsLoggedIn } = useAuth();
  const [edit, setEdit] = useState(false);

  const handleOnSignOut = () => {
    setIsLoggedIn(false);
    userSignOut();
  };

  return (
    <>
      <div className="d-none d-md-block col-md-4 col-xl-3 left-wrapper">
        <div className="card rounded">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h6 className="card-title mb-0">About</h6>
              <div className="dropdown">
                <UserAboutEditButton setEdit={setEdit} />
              </div>
            </div>
            {edit ? (
              <>
                <UserAboutTextArea setEdit={setEdit} />
              </>
            ) : (
              <>
                <p>{userDetails?.About}</p>
              </>
            )}

            <div className="mt-3">
              <label className="tx-11 font-weight-bold mb-0 text-uppercase">
                Joined:
              </label>
              <p className="text-muted">{userDetails?.createdAt}</p>
            </div>

            <div className="mt-3">
              <label className="tx-11 font-weight-bold mb-0 text-uppercase">
                Email:
              </label>
              <p className="text-muted">{userDetails?.userEmail}</p>
            </div>

            <button
              className="btn btn-theme mt-2"
              onClick={handleOnSignOut}
              style={{ backgroundColor: "black", color: "white" }}
            >
              Sign Out
            </button>
          </div>
        </div>
        <UserStatus />
      </div>
    </>
  );
}
