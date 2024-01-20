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
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import config from '../../config';

const LoginCard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Use snackbarOpen state
  const [snackbarMessage, setSnackbarMessage] = useState('');
  


  

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  const handleLogin = async () => {
    try {
      const csrftoken = getCookie('csrftoken');
      console.log(csrftoken, 'csrf token')
      const response = await fetch(`${config.apiUrl}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.token, 'token returned');
        localStorage.setItem('token', data.token);
        setSnackbarMessage('Logged in successfully');
        setSnackbarOpen(true);
        window.location.href = '/';
      } else {
        const errorMessage = await response.text();
        setError(true);
        console.error('Error during login:', errorMessage);
      }
    } catch (error) {
      setError(true);
      console.error('Error during login:', error);
    }
  };
  
  

  return (
    <Container maxWidth="xs">

      
      <Card style={{ marginTop: '20px' }}>
        <div style={{ backgroundColor: 'rgb(46, 125, 50)', textAlign: 'center', padding: '16px'}}>
          
          <Typography variant="h6" style={{ color: 'white', marginTop: '8px' }}>
            Good Life Bazar
          </Typography>
        </div>

        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            Login
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
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error} // Set error prop to display error state
            helperText={error && 'Incorrect credentials. Please try again.'} // Display error message
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            style={{ marginTop: '16px', backgroundColor: 'rgb(46, 125, 50)', color: 'white' }}
          >
            Login
          </Button>
          <Typography variant="body2" style={{ textAlign: 'center', marginTop: '16px' }}>
            New user? <Link href="/register">Register here</Link>
          </Typography>
        </CardContent>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginCard;
