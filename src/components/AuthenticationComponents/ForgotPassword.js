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
  Alert,
} from '@mui/material';
import config from '../../config';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSetPassword = async () => {
    if (!username || !password1 || !password2) {
      setError(true);
      setErrorMessage('All fields are required.');
      setPassword1('');
      setPassword2('');
      return;
    }

    if (password1 !== password2) {
      setError(true);
      setErrorMessage('Passwords do not match.');
      setPassword2('');
      return;
    }

    const data = { username, password: password1 };

    try {
      const response = await fetch(`${config.apiUrl}/forgot_password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSnackbarMessage('Password changed successfully');
        setSnackbarOpen(true);
        setTimeout(() => {
          setSnackbarOpen(false);
          window.location.href = '/login';
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(true);
        setErrorMessage(errorData.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Password change error:', error);
      setError(true);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  // Function to handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xs" style={{ marginBottom: '20px' }}>
      <Card style={{ marginTop: '20px' }}>
        <div style={{ backgroundColor: 'rgb(46, 125, 50)', textAlign: 'center', padding: '16px' }}>
          <Typography variant="h6" style={{ color: 'white', marginTop: '8px' }}>
            Good Life Bazar
          </Typography>
        </div>
        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            Set New Password
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSetPassword}
            style={{ marginTop: '16px', backgroundColor: 'rgb(46, 125, 50)', color: 'white' }}
          >
            Set Password
          </Button>
          {error && (
            <Alert severity="error" style={{ marginTop: '16px' }}>
              {errorMessage}
            </Alert>
          )}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
          >
            <Alert severity="success" onClose={handleSnackbarClose}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <Typography variant="body2" style={{ textAlign: 'center', marginTop: '16px' }}>
            New user? <Link href="/register">Register here</Link>
          </Typography>
          <Typography variant="body2" style={{ textAlign: 'center', marginTop: '16px' }}>
            Already have an account? <Link href="/login">Login here</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
