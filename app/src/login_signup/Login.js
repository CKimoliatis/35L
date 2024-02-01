import React, { useState } from "react";
import Landing from "../landing/Landing";
import { Link, Route } from "react-router-dom";
import Signup from "./Signup";

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
    <div>
      {loggedIn ? (
        <Landing />
      ) : (
        <div>
          <h1>Login Page</h1>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <p>
            New Here? <Link to="signup">Register!</Link>
          </p>
          
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};
export default Login;
