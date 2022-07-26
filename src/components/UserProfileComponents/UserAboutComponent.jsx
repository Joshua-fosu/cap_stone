import React from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { useAuth } from "../../contexts/AuthContext";
import UserStatus from "./UserStatus";

export default function UserAboutComponent() {
  const { userDetails } = useUserData();
  const { userSignOut, setIsLoggedIn } = useAuth();

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
                <button
                  className="btn p-0"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
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
                    className="feather feather-more-horizontal icon-lg text-muted pb-3px"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
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
                      className="feather feather-edit-2 icon-sm mr-2"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg>{" "}
                    <span className="">Edit</span>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
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
                      className="feather feather-git-branch icon-sm mr-2"
                    >
                      <line x1="6" y1="3" x2="6" y2="15"></line>
                      <circle cx="18" cy="6" r="3"></circle>
                      <circle cx="6" cy="18" r="3"></circle>
                      <path d="M18 9a9 9 0 0 1-9 9"></path>
                    </svg>{" "}
                    <span className="">Update</span>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
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
                      className="feather feather-eye icon-sm mr-2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>{" "}
                    <span className="">View all</span>
                  </a>
                </div>
              </div>
            </div>
            <p>Hello there!!!</p>
            <div className="mt-3">
              <label className="tx-11 font-weight-bold mb-0 text-uppercase">
                Joined:
              </label>
              <p className="text-muted">{userDetails?.createdAt}</p>
            </div>
            <div className="mt-3">
              <label className="tx-11 font-weight-bold mb-0 text-uppercase">
                Lives:
              </label>
              <p className="text-muted">New York, USA</p>
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
