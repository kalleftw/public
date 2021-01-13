import "./CreateMemories.css";
import firebase from ".././config";
import React, { useState } from "react";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import AddNewCountryForm from "./CreateNewMemoriesForm";

/**
 * Method which will render the form if user is logged in
 */
const RenderForm = () => {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user.emailVerified) {
      setIsLoggedIn(!!user);
    }
  });

  return (
    <div className="loginprompt">
      {isLoggedin ? (
        <AddNewCountryForm />
      ) : (
        <h1 id="signup">
          <a href="/Signup">You must have a verified account to post memories. Please click this text to create an account</a>
        </h1>
      )}
    </div>
  );
};
export default RenderForm;
