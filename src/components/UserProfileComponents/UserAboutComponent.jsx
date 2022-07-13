import React from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { useAuth } from "../../contexts/AuthContext";

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
              <p className="text-muted">November 15, 2015</p>
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
              <p className="text-muted">me@nobleui.com</p>
            </div>
            <div className="mt-3">
              <label className="tx-11 font-weight-bold mb-0 text-uppercase">
                Website:
              </label>
              <p className="text-muted">www.nobleui.com</p>
            </div>
            <button className="btn btn-theme btn-sm" onClick={handleOnSignOut}>
              Sign Out
            </button>
            <div className="mt-3 d-flex social-links">
              <a
                href="#"
                className="btn d-flex align-items-center justify-content-center border mr-2 btn-icon github"
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
                  className="feather feather-github"
                  data-toggle="tooltip"
                  title=""
                  data-original-title="github.com/nobleui"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a
                href="#"
                className="btn d-flex align-items-center justify-content-center border mr-2 btn-icon twitter"
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
                  className="feather feather-twitter"
                  data-toggle="tooltip"
                  title=""
                  data-original-title="twitter.com/nobleui"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="btn d-flex align-items-center justify-content-center border mr-2 btn-icon instagram"
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
                  className="feather feather-instagram"
                  data-toggle="tooltip"
                  title=""
                  data-original-title="instagram.com/nobleui"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
