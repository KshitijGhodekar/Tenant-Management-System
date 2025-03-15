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
} from "@mui/material";
import axios from "axios";

const AddPropertyForm = ({ onSubmit }) => {
    const [properties, setProperties] = useState([
        {
          id: 1,
          name: "Downtown Heights",
          Rent: 2500,
          rented: true,
          type: "Apartment",
          bedrooms: 2,
          location: "Downtown",
          furnished: true,
        },
        {
          id: 2,
          name: "Sunset Apartments",
          Rent: 1800,
          rented: true,
          type: "Apartment",
          bedrooms: 1,
          location: "Sunset",
          furnished: false,
        },
        {
          id: 3,
          name: "Green Valley Villas",
          Rent: 3200,
          rented: false,
          type: "House",
          bedrooms: 3,
          location: "Green Valley",
          furnished: true,
        },
        {
          id: 4,
          name: "Lakeside Homes",
          Rent: 2750,
          rented: true,
          type: "House",
          bedrooms: 4,
          location: "Lakeside",
          furnished: false,
        },
      ]);
  const [newProperty, setNewProperty] = useState({
    propertyTitle: "",
    address: "",
    price: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    available: false,
  });

  const handleAddProperty = () => {
    if (
      newProperty.name &&
      newProperty.Rent &&
      !isNaN(newProperty.Rent) &&
      newProperty.type &&
      newProperty.bedrooms &&
      newProperty.location
    ) {
      setProperties([
        ...properties,
        {
          ...newProperty,
          id: properties.length + 1,
          Rent: Number(newProperty.Rent),
        },
      ]);
      setNewProperty({
        name: "",
        Rent: "",
        rented: false,
        type: "",
        bedrooms: "",
        location: "",
        furnished: false,
      });
    } else {
      alert("Please provide valid property details");
    }
  };

  return (
    <div className="addProperty">
    <h3>Add New Property</h3>
    <TextField
      label="Property Name"
      variant="outlined"
      fullWidth
      value={newProperty.name}
      onChange={(e) =>
        setNewProperty({ ...newProperty, name: e.target.value })
      }
    />
    <TextField
      label="Rent Amount (€)"
      variant="outlined"
      fullWidth
      type="number"
      value={newProperty.Rent}
      onChange={(e) =>
        setNewProperty({ ...newProperty, Rent: e.target.value })
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
      label="Location"
      variant="outlined"
      fullWidth
      value={newProperty.location}
      onChange={(e) =>
        setNewProperty({ ...newProperty, location: e.target.value })
      }
      sx={{ marginTop: 2 }}
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={newProperty.furnished}
          onChange={(e) =>
            setNewProperty({
              ...newProperty,
              furnished: e.target.checked,
            })
          }
        />
      }
      label="Is Furnished?"
      sx={{ marginTop: 2 }}
    />
    <Button
      variant="contained"
      color="primary"
      onClick={handleAddProperty}
      disabled={
        !newProperty.name ||
        !newProperty.Rent ||
        !newProperty.type ||
        !newProperty.bedrooms ||
        !newProperty.location
      }
    >
      Add Property
    </Button>
  </div>
  );
};

export default AddPropertyForm;
