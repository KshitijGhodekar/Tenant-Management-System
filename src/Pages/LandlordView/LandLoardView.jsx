import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./LandLordView.scss";
import { Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import LandlordProfile from "../LandlordProfile/LandlordProfile";

const LandlordView = () => {
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
    name: "",
    Rent: "",
    rented: false,
    type: "",
    bedrooms: "",
    location: "",
    furnished: false,
  });
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };

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

  const totalRent = properties
    .filter((property) => property.rented)
    .reduce((sum, prop) => sum + prop.Rent, 0);

  const rentedProperties = properties.filter((prop) => prop.rented).length;
  const totalProperties = properties.length;

  const rentData = properties.map((property) => ({
    name: property.name,
    Rent: property.Rent,
  }));

  const pieData = [
    { name: "Rented", value: rentedProperties },
    { name: "Available", value: totalProperties - rentedProperties },
  ];

  const COLORS = ["#0088FE", "#FFBB28"];

  return (
    <div className="landlordView">
      <div className="sidebar">
        <div className="sidebarHeading">Landlord Panel</div>
        <ul style={{ marginTop: "2em" }}>
          <li
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={activeSection === "addProperty" ? "active" : ""}
            onClick={() => setActiveSection("addProperty")}
          >
            Add Property
          </li>
          <li
            className={activeSection === "listings" ? "active" : ""}
            onClick={() => setActiveSection("listings")}
          >
            Property Listings
          </li>
          <li
            className={activeSection === "profile" ? "active" : ""}
            onClick={() => setActiveSection("profile")}
          >
            Profile
          </li>
          <li
            onClick={() => logout()}
          >
            Logout
          </li>
        </ul>
      </div>

      <div className="mainContent">
        <header className="landlordHeader">
          <div className="headerLeft">
            <h1>LANDLORD DASHBOARD</h1>
            <p>Manage Your Properties with Ease</p>
          </div>
          <div className="headerRight">
            <img src={require("./Landlord.jpg")} alt="Real Estate" />
          </div>
        </header>

        {activeSection === "dashboard" && (
          <div className="dashboard">
            <Grid2 container spacing={4}>
              <Grid2 item xs={12} sm={6} md={4}>
                <Card
                  className="statCard"
                  sx={{
                    boxShadow: 3,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #0088FE, #00c6ff)",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{ color: "#fff", fontWeight: "bold" }}
                    >
                      €{totalRent}
                    </Typography>
                    <Typography sx={{ color: "#fff" }}>
                      Total Rent Collected
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
              <Grid2 item xs={12} sm={6} md={4}>
                <Card
                  className="statCard"
                  sx={{
                    boxShadow: 3,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #0088FE, #00c6ff)",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{ color: "#fff", fontWeight: "bold" }}
                    >
                      {rentedProperties}/{totalProperties}
                    </Typography>
                    <Typography sx={{ color: "#fff" }}>
                      Properties Rented
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
              <Grid2 item xs={12} sm={6} md={4}>
                <Card
                  className="statCard"
                  sx={{
                    boxShadow: 3,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #0088FE, #00c6ff)",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{ color: "#fff", fontWeight: "bold" }}
                    >
                      {totalProperties}
                    </Typography>
                    <Typography sx={{ color: "#fff" }}>
                      Total Properties
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            </Grid2>
            <div className="charts">
              <div className="barChart">
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                  Rent Per Property
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={rentData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Rent" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="pieChart">
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                  Rented vs Available
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeSection === "addProperty" && (
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
        )}

        {activeSection === "listings" && (
          <div className="listings">
            <h3>Property Listings</h3>
            <ul>
              {properties.map((property) => (
                <li key={property.id}>
                  {property.name} - €{property.Rent} (
                  {property.rented ? "Rented" : "Available"}) - {property.type}{" "}
                  - {property.bedrooms} Bedrooms - {property.location} -{" "}
                  {property.furnished ? "Furnished" : "Not Furnished"}
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeSection === "profile" && <LandlordProfile />}
      </div>
    </div>
  );
};

export default LandlordView;
