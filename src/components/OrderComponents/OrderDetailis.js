import React from 'react';
import { List, Typography, ListItem, Grid, Stack } from '@mui/material';
import { styled } from '@mui/system'
import ProductDetailsButton from './ProductDetailsButton';
import LocationButton from './LocationButton';
import Invoice from './Invoice';

const KeyListItemText = styled(ListItem)({
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

const OrderDetails = ({ order }) => {
  const numberOfOrderItems = order.order_details.length;

  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        <ListItem>
          <KeyListItemText>
            <Typography variant="body1">Number of Products</Typography>
          </KeyListItemText>
          <ValueTypography variant="body2">{numberOfOrderItems}</ValueTypography>
        </ListItem>
        <ListItem>
          <KeyListItemText>
            <Typography variant="body1">Orginal Price</Typography>
          </KeyListItemText>
          <ValueTypography variant="body2" style={{ color: 'red' }}>{`₹${order.total_amount}`}</ValueTypography>
        </ListItem>
        <ListItem>
          <KeyListItemText>
            <Typography variant="body1">Discount</Typography>
          </KeyListItemText>
          <ValueTypography variant="body2" style={{ color: 'green' }}>{`₹${order.total_discount}`}</ValueTypography>
        </ListItem>
        <ListItem>
          <KeyListItemText>
            <Typography variant="body1">Final Price</Typography>
          </KeyListItemText>
          <ValueTypography variant="body2" style={{ fontWeight: 'bold' }}>{`₹${order.discount_amount}`}</ValueTypography>
        </ListItem>
      </List>
      <GridContainer container direction="row" spacing={2}>
        <Grid item>
          <ProductDetailsButton orderItems={order.order_details} />
        </Grid>
        <Grid item>
          <LocationButton orderCustomer={order.customer} />
        </Grid>
        <Grid item>
          <Invoice order_id={order.id} />
        </Grid>
      </GridContainer>
    </Stack>
  );
};

export default OrderDetails;
