import React from 'react';
import { Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledButton = styled(Button)({
  backgroundColor: '#117a2d',
  color: 'white',
  padding: '10px',
  '&:hover': {
    backgroundColor: '#004225',
  },
});

const CheckoutButton = () => {
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  return (
    <Grid item xs={6}>
      <StyledButton onClick={handleCheckoutClick} endIcon={<ShoppingCartIcon sx={{ padding: '7px' }} />}>
        Checkout
      </StyledButton>
    </Grid>
  );
};

export default CheckoutButton;
