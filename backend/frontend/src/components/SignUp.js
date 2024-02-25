import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");
  const [school, setSchool] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState({
    minLength: false,
    uppercase: false,
    symbol: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordConditionsVisible, setPasswordConditionsVisible] =
    useState(false);
  const [accountMade, setAccountMade] = useState(false);
  const validateEmail = (inputEmail) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
    setEmailValid(isValid);
    return isValid;
  };

  const validatePassword = (inputPassword) => {
    const hasMinLength = inputPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(inputPassword);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(inputPassword);

    setPasswordValid({
      minLength: hasMinLength,
      uppercase: hasUppercase,
      symbol: hasSymbol,
    });

    return hasMinLength && hasUppercase && hasSymbol;
  };

  const handleSignup = () => {
    // Validate email
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setErrorMessage("Email is not valid");
      return;
    }

    // Validate password
    const isPasswordValid = validatePassword(password);
    if (!isPasswordValid) {
      setErrorMessage("Password is not valid");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setPasswordMatch(false);
      return;
    }

    // Check if email exists in the database (simulated check)
    // const emailExistsInDatabase = null; // For future reference
    // if (emailExistsInDatabase === null) {
    //   setErrorMessage(
    //     "An error occurred while checking email existence. Please try again."
    //   );
    //   return;
    // }

    // if (emailExistsInDatabase) {
    //   setErrorMessage("Account already exists for this email. Log in?");
    //   // Implement your logic to redirect to the login page or show a login modal
    //   return;
    // }

    // If all conditions are met, proceed with signup logic
    setErrorMessage(""); // Clear any previous error messages
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Gender:", gender);
    // Add your actual signup logic (e.g., API request) here

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        school: school,
        username: username,
      }),
    };
    fetch("/api/create-user", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const renderConditionStatus = (condition) => {
    return condition ? (
      <span style={{ color: "green" }}>✔</span>
    ) : (
      <span style={{ color: "red" }}>✘</span>
    );
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      style={{
        background: "#3498db",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
        }}
      >
        <h1 style={{ color: "#3498db", textAlign: "center" }}>Signup Page</h1>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
        <br />
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
        <br />
        <br />
        <label>
          School:
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            style={{ width: "100%" }}
          />
          {/* <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ width: "100%" }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select> */}
        </label>
        <br />
        <br />
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
        <br />
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateEmail(email)}
            style={{ width: "100%" }}
          />
          {!emailValid && <span style={{ color: "red" }}>Invalid email</span>}
        </label>
        <br />
        <br />
        <label>
          Password:
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            onFocus={() => setPasswordConditionsVisible(true)}
            onBlur={() => setPasswordConditionsVisible(false)}
            style={{ width: "100%" }}
          />
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? "Hide" : "Show"} Password
          </button>
          {passwordConditionsVisible && (
            <>
              <div>
                {renderConditionStatus(passwordValid.minLength)} At least 8
                characters
              </div>
              <div>
                {renderConditionStatus(passwordValid.uppercase)} At least 1
                uppercase letter
              </div>
              <div>
                {renderConditionStatus(passwordValid.symbol)} At least 1 symbol
              </div>
            </>
          )}
        </label>
        <br />
        <br />
        <label>
          Confirm Password:
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setPasswordMatch(password === confirmPassword)}
            style={{ width: "100%" }}
          />
        </label>
        {!passwordMatch && (
          <span style={{ color: "red" }}>Passwords do not match</span>
        )}

        <br />
        <br />
        <button
          style={{
            background: "#2980b9",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
          }}
          onClick={handleSignup}
        >
          Signup
        </button>
        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Signup;
