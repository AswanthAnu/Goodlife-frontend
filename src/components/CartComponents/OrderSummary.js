import React from 'react';
import {
  List,
  Typography,
  ListItem,
  ListItemText,
  Grid,
  Stack,
} from '@mui/material';
import { styled } from '@mui/system';
import CheckoutButton from './CheckoutButton';

const KeyListItemText = styled(ListItemText)({
  width: '150px',
  fontWeight: 'bold',
  color: (theme) => theme.palette.primary.main,
});

const ValueTypography = styled(Typography)({
  flex: 1,
  fontWeight: 'bold',
  color: (theme) => theme.palette.grey[700],
});

const GridContainer = styled(Grid)({
  margin: '20px',
  padding: '20px',
  alignItems: 'center',
});

const OrderSummary = ({ cartitems }) => {
  let cartAmount = 0;
  let finalCartAmount = 0;
  let totalDiscount = 0;
  let cartDiscount = 0;

  cartitems.forEach((cartItem) => {
    const originalPrice = cartItem.product_pricing.original_price;
    const quantity = cartItem.quantity;
    const discountPrice = cartItem.product_pricing.discount_price;
    const discount = cartItem.product_pricing.discount;
    cartAmount += originalPrice * quantity;
    finalCartAmount += discountPrice * quantity;
    totalDiscount += discount;
  });

  const numberOfCartItems = cartitems.length;

  function customRound(number) {
    const decimalPart = number % 1;
    
    if (decimalPart > 0.5) {
      return Math.ceil(number);
    } else {
      return Math.floor(number);
    }
  }

  finalCartAmount = customRound(finalCartAmount);

  cartDiscount = customRound(cartAmount - finalCartAmount);

  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        <ListItem>
          <KeyListItemText
            primary="Number of Products"
          />
          <Typography variant="body2">{numberOfCartItems}</Typography>
        </ListItem>
        <ListItem>
          <KeyListItemText
            primary="Original Price"
          />
          <Typography variant="body2" style={{ color: 'red' }}>
            {`₹${cartAmount.toFixed(2)}`}
          </Typography>
        </ListItem>
        <ListItem>
          <KeyListItemText
            primary="Discount"
          />
          <Typography variant="body2" style={{ color: 'green' }}>
            {`₹${cartDiscount.toFixed(2)}`}
          </Typography>
        </ListItem>
        <ListItem>
          <KeyListItemText
            primary="Final Price"
          />
          <Typography variant="body2" style={{ fontWeight: 'bold' }}>
            {`₹${finalCartAmount.toFixed(2)}`}
          </Typography>
        </ListItem>
      </List>
      <GridContainer container spacing={3}>
        <CheckoutButton />
      </GridContainer>
    </Stack>
  );
};

export default OrderSummary;
