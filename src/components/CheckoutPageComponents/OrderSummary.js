import React from 'react';
import {
  List,
  Typography,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material';
import { styled } from '@mui/system';

const KeyListItemText = styled(ListItemText)({
  width: '150px',
  fontWeight: 'bold',
  color: (theme) => theme.palette.primary.main,
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

  cartDiscount = Math.round(cartAmount - finalCartAmount);

  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        <ListItem>
          <KeyListItemText
            primary="Number of Products"
            className="keyListItemText"
          />
          <Typography variant="body2">{numberOfCartItems}</Typography>
        </ListItem>
        <ListItem>
          <KeyListItemText
            primary="Original Price"
            className="keyListItemText"
          />
          <Typography variant="body2" style={{ color: 'red' }}>
            {`₹${cartAmount.toFixed(2)}`}
          </Typography>
        </ListItem>
        <ListItem>
          <KeyListItemText primary="Discount" className="keyListItemText" />
          <Typography variant="body2" style={{ color: 'green' }}>
            {`₹${cartDiscount.toFixed(2)}`}
          </Typography>
        </ListItem>
        <ListItem>
          <KeyListItemText primary="Final Price" className="keyListItemText" />
          <Typography variant="body2" style={{ fontWeight: 'bold' }}>
            {`₹${finalCartAmount.toFixed(2)}`}
          </Typography>
        </ListItem>
      </List>
    </Stack>
  );
};

export default OrderSummary;
