import React from "react";
import { Link, useNavigate } from "react-router-dom";
import YooniLogo from "../objects/YooniLogo.png";// Import your company logo component

const IntermediaryPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigate to the login page
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <img
          src={YooniLogo}
          alt="Yooni Logo"
          className="img-fluid mb-3"
          style={{ width: "200px", height: "auto" }}
      />
      <h2>Your account is ready to go!</h2>
      <p>Log in to access your account.</p>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

export default IntermediaryPage;
