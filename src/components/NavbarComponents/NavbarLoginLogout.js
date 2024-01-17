import React, { useState, useEffect } from 'react';
import { Button, Stack, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import config from '../../config';


const NavbarLoginLogout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const handleLogout = async () => {
    console.log(localStorage.getItem('token'), 'token-11');
    const csrftoken = getCookie('csrftoken');
    console.log("wPPWKjlfPBuJs2YJDdAF2iVbXLPk6EeG", 'csrftoke -11')

    try {
      console.log(csrftoken, 'csrftoke -22')
      const response = await fetch(`${config.apiUrl}/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
          'X-CSRFToken': "wPPWKjlfPBuJs2YJDdAF2iVbXLPk6EeG",
        },
        
      });

      if (response.ok) {
        console.log('good response', response);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setSnackbarMessage('Logged out successfully');
        setSnackbarOpen(true);
        window.location.href = '/login';
      } else {
        console.error('Logout error 1:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error 2:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Stack>
      {isAuthenticated ? (
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity="success" onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default NavbarLoginLogout;
