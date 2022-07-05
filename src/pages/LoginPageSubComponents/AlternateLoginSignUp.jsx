import React from "react";

export function AlternateLoginSignUp({
  isDisplayLoginForm,
  setIsDisplayLoginForm,
}) {
  return (
    <>
      {isDisplayLoginForm ? (
        <div className="text-center fs-6">
          <a href="#">Forgot password?</a> or{" "}
          <a
            href="#"
            onClick={(event) => {
              setIsDisplayLoginForm(false);
            }}
          >
            Sign Up
          </a>
        </div>
      ) : (
        <>
          {" "}
          <div className="text-center fs-6">
            <p>Have an account?</p>{" "}
            <a
              href="#"
              onClick={(event) => {
                setIsDisplayLoginForm(true);
              }}
            >
              Login
            </a>
          </div>
        </>
      )}
    </>
  );
}
