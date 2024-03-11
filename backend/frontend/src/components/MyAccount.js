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
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
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
