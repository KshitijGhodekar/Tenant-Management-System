import React from 'react';
import { Button,Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const PropertyDetails = ({ selectedProperty, closePropertyDetails, handleBooking, handleExpressInterest }) => {
  if (!selectedProperty) return null;

  return (
    <Dialog open={!!selectedProperty} onClose={closePropertyDetails}>
      <DialogTitle>
        <div style={{}}>
          <h2>{selectedProperty.name}</h2>
          <CloseIcon
            onClick={closePropertyDetails}
            style={{ position: "absolute", left: 8, top: 8 ,cursor:"pointer"}}
            />
        </div>
      </DialogTitle>
      <DialogContent>
        <img
          src={selectedProperty.image}
          alt={selectedProperty.name}
          style={{ width: '100%', height: 'auto' }}
        />
        <p>{selectedProperty.description}</p>
        <p><strong>Price:</strong> {selectedProperty.price} per month</p>
      </DialogContent>
      <DialogActions>
      <Button
          onClick={handleBooking}
          variant="contained"
          color="success"
          style={{
            margin: '10px',
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '16px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          Book Now
        </Button>
        <Button
          onClick={handleExpressInterest}
          variant="contained"
          color="primary"
          style={{
            margin: '10px',
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '16px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          Express Interest
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PropertyDetails;
