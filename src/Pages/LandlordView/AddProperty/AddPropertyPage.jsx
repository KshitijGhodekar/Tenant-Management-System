import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { addProperty } from "../../Apis/ApiCall";

const AddPropertyForm = ({ onSubmit }) => {
  const [newProperty, setNewProperty] = useState({
    address: "",
    propertyTitle: "",
    price: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    available: false,
    landlordId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddProperty = async () => {
    if (
      newProperty.address &&
      newProperty.propertyTitle &&
      newProperty.price &&
      !isNaN(newProperty.price) &&
      newProperty.type &&
      newProperty.bedrooms &&
      newProperty.bathrooms &&
      newProperty.landlordId
    ) {
      setLoading(true);
      try {
        const response = await addProperty(newProperty);
        setMessage(response.message);
        setOpenSnackbar(true);
        setNewProperty({
          address: "",
          propertyTitle: "",
          price: "",
          type: "",
          bedrooms: "",
          bathrooms: "",
          available: false,
          landlordId: "",
        });
      } catch (err) {
        setMessage(err.message);
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("Please provide valid property details.");
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="addProperty">
      <h3>Add New Property</h3>
      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        value={newProperty.address}
        onChange={(e) =>
          setNewProperty({ ...newProperty, address: e.target.value })
        }
      />
      <TextField
        label="Property Title"
        variant="outlined"
        fullWidth
        value={newProperty.propertyTitle}
        onChange={(e) =>
          setNewProperty({ ...newProperty, propertyTitle: e.target.value })
        }
      />
      <TextField
        label="Price (€)"
        variant="outlined"
        fullWidth
        type="number"
        value={newProperty.price}
        onChange={(e) =>
          setNewProperty({ ...newProperty, price: e.target.value })
        }
      />
      <FormControl fullWidth variant="outlined" sx={{ marginTop: 2 }}>
        <InputLabel>Property Type</InputLabel>
        <Select
          value={newProperty.type}
          onChange={(e) =>
            setNewProperty({ ...newProperty, type: e.target.value })
          }
          label="Property Type"
        >
          <MenuItem value="Apartment">Apartment</MenuItem>
          <MenuItem value="House">House</MenuItem>
          <MenuItem value="Condo">Condo</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Number of Bedrooms"
        variant="outlined"
        fullWidth
        type="number"
        value={newProperty.bedrooms}
        onChange={(e) =>
          setNewProperty({ ...newProperty, bedrooms: e.target.value })
        }
        sx={{ marginTop: 2 }}
      />
      <TextField
        label="Number of Bathrooms"
        variant="outlined"
        fullWidth
        type="number"
        value={newProperty.bathrooms}
        onChange={(e) =>
          setNewProperty({ ...newProperty, bathrooms: e.target.value })
        }
        sx={{ marginTop: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={newProperty.available}
            onChange={(e) =>
              setNewProperty({
                ...newProperty,
                available: e.target.checked,
              })
            }
          />
        }
        label="Available"
        sx={{ marginTop: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProperty}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Property"}
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={message.includes("Failed") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddPropertyForm;
