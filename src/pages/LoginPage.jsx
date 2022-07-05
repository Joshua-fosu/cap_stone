import React, { useState, lazy, Suspense } from "react";
import LoginForm from "../components/LoginFormComponent/LoginForm";
import SignUpForm from "../components/SignUpFormComponent/SignUpForm";
import { AlternateLoginSignUp } from "./LoginPageSubComponents/AlternateLoginSignUp";
import LoginFormLazyLoader from "../components/LoginFormComponent/LoginFormLazyLoader";
import { useAuth } from "../contexts/AuthContext";
import LoginSocialMedia from "../components/LoginFormComponent/LoginSocialMedia";

// const LoginForm = lazy(() =>
//   import("../components/LoginFormComponent/LoginForm")
// );

export default function LoginPage() {
  const [isDisplayLoginForm, setIsDisplayLoginForm] = useState(true);
  const [displayLoginSignUpText, setDisplayLoginSignUpText] =
    useState("Sign Up");

  const { socialMediaAuth, FacebookProvider } = useAuth();

  return (
    <>
      {/* <Suspense fallback={<LoginFormLazyLoader />}> */}
      <LoginHeader />
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="wrapper">
            <div className="logo">
              <img
                src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png"
                alt=""
              />
            </div>
            <div className="text-center mt-4 name">ReachMe</div>

            {isDisplayLoginForm ? <LoginForm /> : <SignUpForm />}

            <AlternateLoginSignUp
              isDisplayLoginForm={isDisplayLoginForm}
              setIsDisplayLoginForm={setIsDisplayLoginForm}
            />
            <h5 className="c-black mb-4 mt-n1">Or Sign In With</h5>
            <LoginSocialMedia
              socialMediaAuth={socialMediaAuth}
              FacebookProvider={FacebookProvider}
            />
          </div>
        </div>
      </div>
      {/* </Suspense> */}
    </>
  );
}

export function LoginHeader() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">Home</a>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-dark">ReachMe</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
