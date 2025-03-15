import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const Booking = ({ open, handleClose, handleBookingConfirmation }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Booking Confirmation</DialogTitle>
      <DialogContent>
        <p>Your booking has been confirmed successfully.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBookingConfirmation} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Booking;
