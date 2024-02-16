import React, { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Implement your signup logic here
    // For simplicity, you can just log the form data for now
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    // Add your actual signup logic (e.g., API request) here
  };

  return (
    <div>
      <h1>Signup Page</h1>
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
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
