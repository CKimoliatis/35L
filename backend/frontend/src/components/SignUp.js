import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfimSignupModal from "./Intermediary";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [school, setSchool] = useState(null);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState({
    minLength: false,
    uppercase: false,
    symbol: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordConditionsVisible, setPasswordConditionsVisible] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
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
    let errorMsg = "";

    if (!firstName) errorMsg += "First Name is blank. \n";
    if (!lastName) errorMsg += "Last Name is blank. \n";
    if (!username) errorMsg += "Username is blank. \n";
    if (!email) errorMsg += "Email is blank. \n";
    if (!password) errorMsg += "Password is blank. \n";
    if (!school) errorMsg += "School is blank.";

    if (errorMsg) {
      setErrorMessage(errorMsg);
      return;
    }

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setErrorMessage("Email is not valid");
      return;
    }

    const isPasswordValid = validatePassword(password);
    if (!isPasswordValid) {
      setErrorMessage("Password is not valid");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setPasswordMatch(false);
      return;
    }

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
      .then((response) => {
        if (response.status === 201) {
          setShowModal(true);          
        } else if (response.status == 400) {
          return response.json().then((error) => {
            if (
              error.email.some((message) =>
                message.includes("already exists")
              ) ||
              error.username.some((message) =>
                message.includes("already exists")
              )
            ) {
              const loginLink = <a href="/">Log in</a>;
              setErrorMessage(
                <>
                  Account with this email or username already exists.{" "}
                  {loginLink}?
                </>
              );
            } else {
              setErrorMessage("An error occurred during signup.");
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      <ConfimSignupModal show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default Signup;
