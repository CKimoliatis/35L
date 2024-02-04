import React, { useState } from "react";
import { Link } from "react-router-dom";
import Landing from "../landing/Landing.js";
import YooniLogo from "../objects/YooniLogo.png";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // You can implement your authentication logic here
    // For simplicity, let's just check if both username and password are not empty
    if (username && password) {
      setLoggedIn(true);
    } else {
      alert("Please enter both username and password");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ height: "100vh", backgroundColor: "#0098dc", color: "white" }}
    >
      {loggedIn ? (
        // Redirect to Landing page if logged in
        <Landing />
      ) : (
        // Display login form
        <div className="text-center">
          <img
            src={YooniLogo}
            alt="Yooni Logo"
            className="img-fluid mb-3"
            style={{ width: "200px", height: "auto" }}
          />
          <h1
            className="mb-4"
            style={{ fontFamily: "cursive", fontSize: "28px" }}
          >
            Connecting Students for a Better Tomorrow
          </h1>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "200px", margin: "auto" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "200px", margin: "auto" }}
            />
          </div>
          <p className="mb-3">
            New Here?{" "}
            <Link to="signup" style={{ color: "white" }}>
              Register!
            </Link>
          </p>
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
