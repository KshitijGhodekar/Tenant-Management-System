import React, { useState } from 'react';
import './Profile.scss';
import profilePic from "./Profile.png";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    Name: 'Kshitij Ghodekar',
    Email: 'kshitijg@gmai.com',
    Phone: '(123) 456-7890',
    Location: 'Limerick, Ireland',
    Address: 'Capavilla Village',
    Bio: 'I am a software developer currently looking for a cozy apartment in the city center of Limerick. I enjoy tech, gaming, and exploring new places.',
    PropertiesRented: 2,
    ProfilePic: profilePic,
    MembershipStatus: 'Gold',
  });

  
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

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
    console.log('Saved profile data:', profileData);
    setIsEditing(false);
  };

  return (
    <div className="profileContainer">
      <div className="profileHeader">
        <Tooltip title="Go Back" arrow>
          <button className="backButton" onClick={() => navigate(-1)}> 
            <ArrowBackIosNewIcon />
          </button>
        </Tooltip>
        
        <div className="profileImageWrapper">
          <img src={profileData.ProfilePic} alt="Profile" className="profileImage" />
          {isEditing && (
            <input type="file" accept="image/*" onChange={handleProfilePicChange} className="profileImageInput" />
          )}
        </div>

        <h2 className="profileName">{profileData.Name}</h2>
        {profileData.membershipStatus === 'Gold' && (
          <div className="goldMembershipBadge">🌟 Gold Member</div>
        )}
      </div>

      <div className="profileDetails">
        {isEditing ? (
          <div className="editForm">
            {['name', 'email', 'phone', 'location', 'address', 'bio', 'propertiesRented'].map((field) => (
              <div key={field} className="formGroup">
                <label>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
                {field === 'bio' ? (
                  <textarea name={field} value={profileData[field]} onChange={handleChange} className="profileInput" />
                ) : (
                  <input
                    type={field === 'propertiesRented' ? 'number' : 'text'}
                    name={field}
                    value={profileData[field]}
                    onChange={handleChange}
                    className="profileInput"
                  />
                )}
              </div>
            ))}
            <button className="saveButton" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        ) : (
          <div className="viewMode">
            {Object.entries(profileData).map(([key, value]) => (
              key !== 'profilePic' && key !== 'membershipStatus' && (
                <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</p>
              )
            ))}
          </div>
        )}
      </div>

      <div className="tenantProfileActions">
        <button className="editButton" onClick={handleEditToggle}>{isEditing ? 'Cancel' : 'Edit Profile'}</button>
        <button className="logoutButton">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
