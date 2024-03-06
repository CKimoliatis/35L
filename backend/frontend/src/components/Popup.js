import React from "react";

const Popup = ({ show }) => {
  if (!show) return null;

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>You must be logged in to view this page!</h2>
        <button onClick={redirectToSignIn}>Log In</button>
      </div>
    </div>
  );
};

const redirectToSignIn = () => {
  // Redirect logic to your sign-in page
  // For example:
  window.location.href = "/";
};

export default Popup;
