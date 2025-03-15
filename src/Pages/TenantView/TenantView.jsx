import { useState } from "react";
import { TextField, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./TenantView.scss";

const TenantView = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [budget, setBudget] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const projects = [
    {
      id: 1,
      name: "Limerick Heights",
      price: "€1,300 - €2,900",
      image: require("./Appartment.jpg"),
      description: "A stylish and modern apartment in Limerick, offering easy access to top restaurants and entertainment hubs."
    },
    {
      id: 2,
      name: "River View Apartments",
      price: "€1,900 - €3,700",
      image: require("./Flat1.png"),
      description: "Luxury apartments with a breathtaking river view, featuring high-end finishes and a 24/7 concierge service."
    },
    {
      id: 3,
      name: "City Centre Residences",
      price: "€2,100 - €4,200",
      image: require("./Flat2.png"),
      description: "A premium city-center residence with state-of-the-art facilities, perfect for urban living."
    },
    {
      id: 4,
      name: "Parkside Villas",
      price: "€1,700 - €3,300",
      image: require("./Property1.png"),
      description: "Beautiful villas near green parks, ideal for families looking for a peaceful and spacious environment."
    },
    {
      id: 5,
      name: "Garden View Homes",
      price: "€1,750 - €3,350",
      image: require("./Property2.png"),
      description: "Modern homes with large gardens and open spaces, perfect for relaxation and outdoor activities."
    },
    {
      id: 6,
      name: "The Grand Estate",
      price: "€1,800 - €3,400",
      image: require("./Property3.png"),
      description: "A luxurious estate featuring spacious interiors and premium amenities, offering a perfect blend of comfort and style."
    },
    {
      id: 7,
      name: "Urban Garden Homes",
      price: "€1,900 - €3,600",
      image: require("./Newyork Appartment.jpg"),
      description: "A sophisticated blend of urban living and green spaces, providing a refreshing lifestyle in the city."
    },
    {
      id: 8,
      name: "Sunset Heights",
      price: "€2,000 - €4,000",
      image: require("./images.jpeg"),
      description: "A luxurious residence with panoramic views, top-tier amenities, and modern interiors."
    },
];


  const logout = () => {
    navigate("/");
  };
  const profile = () => {
    navigate("/tenant-profile");
  };

  const openPropertyDetails = (property) => {
    setSelectedProperty(property);
  };

  const closePropertyDetails = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="tenantView">
      <header className="header">
        <div className="headingProfile">
          <h4>TENANT MANAGEMENT</h4>
          <div className="profiles">
            <Button variant="contained" style={{ background: "white", color: "black" }} onClick={profile}>
              Profile
            </Button>
            <Button variant="contained" style={{ background: "white", color: "black" }} onClick={logout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="Heading">
          <h1>
            <span>The Best Way to Find</span> <br /> Your Perfect Home
          </h1>
        </div>
      </header>

      <div className="searchSection">
        <TextField
          label="Search"
          variant="outlined"
          className="searchInput"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          label="Property Type"
          variant="outlined"
          className="searchInput"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <MenuItem value="All">All Property Types</MenuItem>
          <MenuItem value="Apartment">Residential Apartment</MenuItem>
          <MenuItem value="House">Independent House/Villa</MenuItem>
          <MenuItem value="Shop">Shop and Showroom</MenuItem>
          <MenuItem value="Office">Office/Space</MenuItem>
        </TextField>

        <TextField
          label="Budget"
          type="text"
          variant="outlined"
          className="searchInput"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <TextField
          select
          label="Bedrooms"
          variant="outlined"
          className="searchInput"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="1">1 BHK</MenuItem>
          <MenuItem value="2">2 BHK</MenuItem>
          <MenuItem value="3">3 BHK</MenuItem>
          <MenuItem value="4+">4+ BHK</MenuItem>
        </TextField>

        <Button variant="contained" color="primary" className="searchButton">
          Search
        </Button>
      </div>

      <section className="projects">
        <h2>New Places Available</h2>
        <div className="projectList">
          {projects.map((project) => (
            <div key={project.id} className="projectCard" onClick={() => openPropertyDetails(project)}>
              <img src={project.image} alt={project.name} />
              <h3>{project.name}</h3>
              <p>{project.price} per month</p>
            </div>
          ))}
        </div>
      </section>

      <Dialog open={Boolean(selectedProperty)} onClose={closePropertyDetails}>
        {selectedProperty && (
          <>
            <DialogTitle>{selectedProperty.name}</DialogTitle>
            <DialogContent>
              <img src={selectedProperty.image} alt={selectedProperty.name} style={{ width: "100%", borderRadius: "8px" }} />
              <p>{selectedProperty.price} per month</p>
              <p>{selectedProperty.description}</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={closePropertyDetails} color="primary">Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default TenantView;