import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import "../CSS/MyAccount.css";

const MyAccount = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(true);

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

  const handlePasswordChangeClick = () => {
    setPasswordFields({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsEditingProfile(false);
  };

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
          <form className="edit-profile-form">
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
          <form className="change-password-form">
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
                type="text"
                placeholder="New Password"
                value={passwordFields.newPassword}
                onChange={(e) =>
                  setPasswordFields({
                    ...passwordFields,
                    newPassword: e.target.value,
                  })
                }
                autocomplete="new-password"
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="text"
                placeholder="Confirm New Password"
                value={passwordFields.confirmPassword}
                onChange={(e) =>
                  setPasswordFields({
                    ...passwordFields,
                    confirmPassword: e.target.value,
                  })
                }
                autocomplete="new-password"
              />
            </div>
            <button type="submit">Change Password</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
