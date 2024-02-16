import React, { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [school, setSchool] = useState("");

  const handleSignup = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        school: school,
        username: username
      })
    };
    fetch("/api/create-user", requestOptions).then((response)=>
      response.json()
    ).then((data)=>console.log(data));
  }; 

  return (
    <div>
      <h1>Signup Page</h1>
      <label>
        First Name:
        <input
          type="fname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <br/>
      <label>
        Last Name:
        <input
          type="lname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <br/>
      <label>
        Username:
        <input
          type="uname"
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
      <label>
        School:
        <input
          type="school"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
