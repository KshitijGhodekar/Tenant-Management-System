import React from "react";

const ProfileView = ({ profileData }) => {
  return (
    <div className="viewMode">
      {Object.entries(profileData).map(
        ([key, value]) =>
          key !== "ProfilePic" &&
          key !== "MembershipStatus" && (
            <p key={key}>
              <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
            </p>
          )
      )}
    </div>
  );
};

export default ProfileView;
