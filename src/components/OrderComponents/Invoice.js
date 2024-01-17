import React, { useState } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import config from "../../config";


const StyledButton = styled(Button)({
  backgroundColor: "#117a2d",
  color: "white",
  "&:hover": {
    backgroundColor: "#004225",
  },
});

const Invoice = ({ order_id }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleDownload = () => {
    try {
      // Update the API endpoint to match your Django URL pattern
      fetch(`${config.apiUrl}/download_invoice/${order_id}/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          // Create a download link and trigger a click to start the download
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `invoice_${order_id}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Error fetching invoice:", error);
          setMessage("Invoice not available");
          setDialogOpen(true);
        });
    } catch (error) {
      console.error("Error in try block:", error);
      setMessage("Invoice not available!");
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Grid item xs={6}>
      <StyledButton onClick={handleDownload}>Invoice</StyledButton>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle style={{ color: "red", textAlign: "center" }}>
          Something went wrong...!
        </DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Invoice;
