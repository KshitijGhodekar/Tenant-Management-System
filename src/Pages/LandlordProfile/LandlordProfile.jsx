import React, { useState } from "react";
import "./LandlordProfile.scss";
import profilePic from "./Profile.png";
import ProfileView from "./ProfileView";
import ProfileForm from "./ProfileForm";
import { Button } from "@mui/material";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    Name: "Kshitij Ghodekar",
    Email: "kshitijg@gmai.com",
    Phone: "(123) 456-7890",
    Location: "Limerick, Ireland",
    Address: "Capavilla Village",
    Bio: "I am a software developer currently looking for a cozy apartment in the city center of Limerick. I enjoy tech, gaming, and exploring new places.",
    PropertiesRented: 2,
    ProfilePic: profilePic,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    console.log("Saved profile data:", profileData);
    setIsEditing(false);
  };

  return (
    <div className="profileContainer">
      <div className="profileHeader">
        <div className="profileImageWrapper">
          <img
            src={profileData.ProfilePic}
            alt="Profile"
            className="profileImage"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="profileImageInput"
            />
          )}
        </div>

        <h2 className="profileName">{profileData.Name}</h2>
      </div>

      <div className="profileDetails">
        {isEditing ? (
          <ProfileForm
            profileData={profileData}
            handleChange={handleChange}
            handleSaveChanges={handleSaveChanges}
          />
        ) : (
          <ProfileView profileData={profileData} />
        )}
      </div>

      <div className="profileActions">
  {isEditing ? (
    ""
  ) : (
    <Button
      onClick={handleEditToggle}
      variant="contained"
      color="primary"
    >
      Edit Profile
    </Button>
  )}
</div>
    </div>
  );
};

export default Profile;
