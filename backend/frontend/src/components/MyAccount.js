import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import "../CSS/MyAccount.css";
import EditProfileModal from "./EditProfileModal";

const MyAccount = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(true);
  const [passwordConditionsVisible, setPasswordConditionsVisible] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    minLength: false,
    uppercase: false,
    symbol: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  // Initialize state with structure for user data
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    username: "",
  });
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  useEffect(() => {
    // Fetch and parse user data from localStorage
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userDataParsed = JSON.parse(userDataString);
      setUserData({
        name: userDataParsed.first_name || "",
        lastName: userDataParsed.last_name || "",
        email: userDataParsed.email || "",
        username: userDataParsed.username || "",
      });
    }
  }, []);

  //switch between Change Password and Edit Profile
  const handleInputChange = (e, field) => {
    setUserData({ ...userData, [field]: e.target.value });
  };
  //perform put request to update first name and last name
  const handleProfileSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const userDataString = localStorage.getItem("userData");
      const userDataParsed = JSON.parse(userDataString);
      const userId = userDataParsed.id;
      const response = await fetch("/api/update-user/", { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          first_name: userData.name,
          last_name: userData.lastName,
        }),
      });
  
      if (!response.ok) throw new Error('Failed to update profile.');
      const updatedUserData = await response.json();
      setUserData({
        ...userData,
        name: updatedUserData.first_name || "",
        lastName: updatedUserData.last_name || "",
      });
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      setModalTitle('Profile Updated');
      setModalBody('Your account\'s information was updated succesfully!');
      setShowModal(true);
    } catch (error) {
      setModalTitle('Error Updating Profile');
      setModalBody('An Error accured when trying to update your account\'s information.');
      setShowModal(true);
    }
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

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Check if any of the password fields are empty
    if (!passwordFields.currentPassword || !passwordFields.newPassword || !passwordFields.confirmPassword) {
      setModalTitle('Password Fields Are Empty');
      setModalBody('Please fill in all password fields.');
      setShowModal(true);
      return; // Return early to avoid making the API call
    }
    // Validate the new password before submitting
    if (!validatePassword(passwordFields.newPassword)) {
      setModalTitle('Password Is Too Weak');
      setModalBody('Please make sure your new password contains at least 8 characters, a symbol, and an uppercase letter.')
      setShowModal(true);
      return;
    }
  
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      setModalTitle('Passwords Did Not Match');
      setModalBody('Please make sure your New Password and confrim New Password match.')
      setShowModal(true);
      return;
    }
  
    try {
      const userDataString = localStorage.getItem("userData");
      const userDataParsed = JSON.parse(userDataString);
      const userId = userDataParsed.id; // Assuming the user's ID is stored in localStorage
      const response = await fetch("/api/change-password/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          old_password: passwordFields.currentPassword,
          new_password: passwordFields.newPassword,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to change password.');
      }
  
      setModalTitle('Password Changed Succesfully!');
      setModalBody('Your New Password has been updated.')
      setShowModal(true);
      // Reset the password fields after successful change
      setPasswordFields({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsEditingProfile(false);

    } catch (error) {
      setModalTitle('Error Changing Password');
      setModalBody('Your old password was entered incorrectly. Please enter it again.')
      setShowModal(true);
    }
  };
  
  return (
    <div className="account-page">
      <NavigationBar />
      <br />
      <br />
      <br />
      <div className="form-toggle-buttons">
        <button
          onClick={() => setIsEditingProfile(true)}
          className={isEditingProfile ? "active" : ""}
        >
          Edit Profile
        </button>
        <button
          onClick={() => setIsEditingProfile(false)}
          className={!isEditingProfile ? "active" : ""}
        >
          Change Password
        </button>
      </div>
      <br />
      {isEditingProfile ? (
        <div className="form-container">
            <h2>Edit Profile</h2>
          <form className="edit-profile-form" onSubmit={handleProfileSubmit}>
            <div className="form-row">
              <div className="form-group half-width">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={userData.name}
                  onChange={(e) => handleInputChange(e, "name")}
                />
              </div>
              <div className="form-group half-width">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={userData.lastName}
                  onChange={(e) => handleInputChange(e, "lastName")}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                disabled
                placeholder="Email"
                value={userData.email}
                onChange={(e) => handleInputChange(e, "email")}
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                disabled
                placeholder="Username"
                value={userData.username}
                onChange={(e) => handleInputChange(e, "username")}
              />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      ) : (
        <div className="form-container">
            <h2>Change Password</h2>
          <form className="change-password-form" onSubmit={handlePasswordChangeSubmit}>
            {/* Password change form can be implemented here */}
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                placeholder="Current Password"
                value={passwordFields.currentPassword}
                onChange={(e) =>
                  setPasswordFields({
                    ...passwordFields,
                    currentPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={passwordFields.newPassword}
                onChange={(e) => {
                  setPasswordFields({...passwordFields, newPassword: e.target.value});
                  validatePassword(e.target.value);
                }}
                onFocus={() => setPasswordConditionsVisible(true)}
                onBlur={() => setPasswordConditionsVisible(false)}
                style={{ width: "100%" }}
              />
              <button type="button" onClick={toggleShowPassword}>
                {showPassword ? "Hide" : "Show"} Password
              </button>
              {passwordConditionsVisible && ( // Assuming you add logic to toggle this state
              <>
              <div>{renderConditionStatus(passwordValid.minLength)} At least 8 characters</div>
              <div>{renderConditionStatus(passwordValid.uppercase)} At least 1 uppercase letter</div>
              <div>{renderConditionStatus(passwordValid.symbol)} At least 1 symbol</div>
              </>
              )}
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={passwordFields.confirmPassword}
                onChange={(e) => {
                  setPasswordFields({...passwordFields, confirmPassword: e.target.value});
                  // Directly compare passwords here or in a dedicated handler
                  setPasswordMatch(passwordFields.newPassword === e.target.value);
                }}
              />
              {!passwordMatch && <span style={{ color: "red" }}>Passwords do not match</span>}
            </div>
            <button type="submit">Change Password</button>
          </form>
        </div>
      )}
      <EditProfileModal
      show={showModal}
      onHide={() => setShowModal(false)}
      title={modalTitle}
      body={modalBody}
    />
    </div>
  );
};

export default MyAccount;