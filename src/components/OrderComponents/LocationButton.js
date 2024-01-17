import React, { useState } from 'react';
import { Button, Grid, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import {styled} from '@mui/system'
import config from '../../config';


const StyledButton = styled(Button)({
  backgroundColor: "#117a2d",
  color: "white",
  "&:hover": {
    backgroundColor: "#004225"
  },
});

const LocationButton = ({ orderCustomer }) => {
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const phoneNumber = orderCustomer.phone_number;

  const openGoogleMaps = () => {
    try {
      fetch(`${config.apiUrl}/get-customer-coordinates/?phone_number=${phoneNumber}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.latitude && data.longitude) {
            const latitude = data.latitude;
            const longitude = data.longitude;
            const myLocation = "my_location"; // Replace with your actual location or latitude/longitude

            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${myLocation}&destination=${latitude},${longitude}`;
            window.open(googleMapsUrl, '_blank');
          } else {
            // Handle errors
            if (data.message) {
              setErrorMessage(data.message); // Set the error message from the response
            } else {
              setErrorMessage('Something went wrong. Please try again later.');
            }
            setErrorDialogOpen(true); // Open the error dialog
          }
        })
        .catch(error => {
          console.error('Error fetching coordinates:', error);
          setErrorMessage('Location is not available!');
          setErrorDialogOpen(true); // Open the error dialog
        });
    } catch (error) {
      console.error('Error in try block:', error);
      setErrorMessage('Location is not available!');
      setErrorDialogOpen(true); // Open the error dialog
    }
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  return (
    <Grid item xs={6}>
      <StyledButton onClick={openGoogleMaps}>
        Location
      </StyledButton>
      <Dialog open={errorDialogOpen} onClose={handleCloseErrorDialog}>
        <DialogContent>
          <Typography>
            {errorMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default LocationButton;
