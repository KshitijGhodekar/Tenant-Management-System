import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import "./PaymentPage.scss";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedProperty } = location.state || {};
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  if (!selectedProperty) {
    return <div>No property selected</div>;
  }

  const handlePayment = () => {
    setOpenConfirmationDialog(true);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    navigate("/tenant-view");
  };

  const handleCancel = () => {
    navigate("/tenant-view");
  };

  return (
    <Box className="payment-page">
      <Stack direction={{ xs: "column", md: "row" }} spacing={4} sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Property Details Section */}
        <Box flex={1} sx={{ maxWidth: "500px" }}>
          <Paper className="property-details">
            <Typography variant="h5" className="section-title">
              Property Details
            </Typography>
            <img
              src={selectedProperty.image}
              alt={selectedProperty.name}
              className="property-image"
            />
            <Typography variant="h6" className="property-name">
              {selectedProperty.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" className="property-description">
              {selectedProperty.description}
            </Typography>
            <Typography className="property-price">
              Price: <strong>{selectedProperty.price}</strong>
            </Typography>
          </Paper>
        </Box>

        {/* Payment Details Section */}
        <Box flex={1} sx={{ maxWidth: "500px" }}>
          <Paper className="payment-details">
            <Typography variant="h5" className="section-title">
              Payment Details
            </Typography>
            <form>
              <TextField
                label="Name on Card"
                variant="outlined"
                fullWidth
                className="form-control"
                value={paymentDetails.name}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                className="form-control"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                sx={{ marginBottom: 2 }}
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Box flex={1}>
                  <TextField
                    label="Expiry Date"
                    variant="outlined"
                    fullWidth
                    className="form-control"
                    value={paymentDetails.expiry}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                  />
                </Box>
                <Box flex={1}>
                  <TextField
                    label="CVV"
                    variant="outlined"
                    fullWidth
                    className="form-control"
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                  />
                </Box>
              </Stack>
            </form>
            <Stack direction="row" spacing={2} sx={{ marginTop: 3 }}>
              <Button
                className="pay-now-button"
                fullWidth
                onClick={handlePayment}
                sx={{ flex: 1 }}
              >
                Pay Now
              </Button>
              <Button
                className="cancel-button"
                fullWidth
                onClick={handleCancel}
                sx={{ flex: 1 }}
              >
                Cancel
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Stack>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
        className="confirmation-dialog"
      >
        <DialogTitle className="dialog-title">Booking Confirmed</DialogTitle>
        <DialogContent className="dialog-content">
          <p>Your payment has been successfully processed.</p>
          <p>Thank you for booking with us!</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentPage;