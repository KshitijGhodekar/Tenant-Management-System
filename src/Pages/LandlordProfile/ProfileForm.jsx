import React from "react";
import { Button } from "@mui/material";

const ProfileForm = ({ profileData, handleChange, handleSaveChanges }) => {
  return (
    <div className="editForm">
      {["Name", "Email", "Phone", "Location", "Address", "Bio", "PropertiesRented"].map((field) => (
        <div key={field} className="formGroup">
          <label>{field.replace(/([A-Z])/g, " $1").toUpperCase()}:</label>
          {field === "Bio" ? (
            <textarea
              name={field}
              value={profileData[field]}
              onChange={handleChange}
              className="profileInput"
            />
          ) : (
            <input
              type={field === "PropertiesRented" ? "number" : "text"}
              name={field}
              value={profileData[field]}
              onChange={handleChange}
              className="profileInput"
            />
          )}
        </div>
      ))}
      <Button
      onClick={handleSaveChanges}
      variant="contained"
      color="primary"
    >
      Save Changes
    </Button>
    </div>
  );
};

export default ProfileForm;
