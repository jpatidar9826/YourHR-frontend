/* Packages */
import React, {useState } from "react";

/* CSS */
import "./Auth.css";
import Login from "../components/Login";
import Signup from "../components/Signup";

/* Components */

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const onClickHandler = () => {
    setIsLoginForm(!isLoginForm);
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-content-wrap">
        <div className="btn-wrap">
          <div className="btn-holder">
            <div
              className={
                isLoginForm ? "btn-slider" : "btn-slider btn-slider-left"
              }
            ></div>
            <button
              onClick={onClickHandler}
              className={isLoginForm ? "" : "btn-color"}
            >
              Log In
            </button>
            <button
              onClick={onClickHandler}
              className={isLoginForm ? "btn-color" : ""}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="input-wrap">
          <div className="input-holder">
            {isLoginForm ? <Login /> : <Signup />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
