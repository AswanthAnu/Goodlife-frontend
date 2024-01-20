import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Snackbar,
  Grid,
  Alert,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import config from '../../config';

const RegisterCard = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Added state for Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Added state for Snackbar
  const [showPasswordReminder, setShowPasswordReminder] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !username || !password1 || !password2) {
      setError(true);
      setErrorMessage('All fields are required.');
      setPassword1('');
      setPassword2('');
      return;
    }

    if (password1 !== password2) {
      setErrorPassword(true);
      setErrorMessage('Passwords do not match.');
      setPassword2('');
      return;
    }

    const registrationData = {
      first_name: firstName,
      last_name: lastName,
      username,
      password: password1,
    };

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
    

    try {

      const csrftoken = getCookie('csrftoken');
      
      const response = await fetch(`${config.apiUrl}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        setSnackbarMessage('Registered successfully');
        setSnackbarOpen(true);
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        setError(true);
        setErrorMessage(errorData.detail || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // Function to handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePasswordChange = (value) => {
    setPassword1(value);
    setShowPasswordReminder(true);

    // Hide the password reminder after 3 seconds (adjust duration as needed)
    setTimeout(() => {
      setShowPasswordReminder(false);
    }, 3000);
  };

  return (
    <Container maxWidth="xs">
      <Card style={{ marginTop: '20px' }}>
        <div style={{ backgroundColor: 'rgb(46, 125, 50)', textAlign: 'center', padding: '16px' }}>
          
          <Typography variant="h6" style={{ color: 'white', marginTop: '8px' }}>
          Good Life Bazar
          </Typography>
        </div>

        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            Register
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} style={{ position: 'relative' }}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password1}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
                {/* Custom-styled div for password reminder */}
                {showPasswordReminder && (
                  <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#E1F5FE', padding: '8px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center' }}>
                    <WarningIcon style={{ marginRight: '8px', color: '#1976D2' }} />
                    <Typography variant="body2" style={{ color: '#1976D2' }}>
                      Please remember this password for future authentication.
                    </Typography>
                  </div>
                )}
              </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                error={errorPassword}
                helperText={errorPassword && 'Passwords do not match.'}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
            style={{ marginTop: '16px', backgroundColor: 'rgb(46, 125, 50)', color: 'white' }}
          >
            Register
          </Button>
          {error && (
            <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(false)}>
              <Alert severity="error" onClose={() => setError(false)}>
                {errorMessage}
              </Alert>
            </Snackbar>
          )}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert severity="success" onClose={handleSnackbarClose}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <Typography variant="body2" style={{ textAlign: 'center', marginTop: '16px' }}>
            Already have an account? <Link href="/login">Login here</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterCard;
