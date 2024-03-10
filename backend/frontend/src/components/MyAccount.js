import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import "../CSS/MyAccount.css";

const MyAccount = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(true); // State to toggle between forms

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
        <form className="edit-profile-form">
          <div className="name-fields">
            <div className="form-group half-width">
              <label>Name</label>
              <input type="text" placeholder="Name" />
            </div>
            <div className="form-group half-width">
              <label>Last Name</label>
              <input type="text" placeholder="Last Name" />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Username" />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
      ) : (
        <div className="form-container">
          <form className="change-password-form">
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" placeholder="Current Password" />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" placeholder="New Password" />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" placeholder="Confirm New Password" />
            </div>
            <button type="submit">Change Password</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default MyAccount;
