import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import ProductDetailTableDialog from './ProductDetailTableDialog';

const StyledButton = styled(Button)({
  backgroundColor: '#117a2d',
  color: 'white',
  '&:hover': {
    backgroundColor: '#004225',
  },
});

const ProductDetailsButton = ({ orderItems }) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid item xs={6}>
      <StyledButton onClick={() => setOpen(true)}>Products</StyledButton>
      <ProductDetailTableDialog open={open} setOpen={setOpen} orderItems={orderItems} />
    </Grid>
  );
};

export default ProductDetailsButton;
