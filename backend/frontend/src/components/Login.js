import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import YooniLogo from "../objects/YooniLogo.png";
import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const getUser = async (username, password) => {
    if (!username || !password) {
      setErrorMessage("Please enter both username and password");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/get-user/", {
        username,
        password,
      });

      if (response.data.error) {
        if (response.data.error.includes("Incorrect password")) {
          setErrorMessage("Incorrect password provided");
        } else if (response.data.error.includes("not found")) {
          const loginLink = <a href="/signup">Sign up</a>;
          setErrorMessage(<>Account not found. {loginLink}?</>);
        }
      }
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setErrorMessage("Failed to fetch user data");
    }
  };

  const handleLogin = async () => {
    try {
      const userData = await getUser(username, password);
      if (userData !== null && userData !== undefined) {
        localStorage.setItem("userData", JSON.stringify(userData));
        setLoggedIn(true);
        navigate("/landing");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setLoggedIn(false);
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ height: "100vh", backgroundColor: "#0098dc", color: "white" }}
    >
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
        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Login;
