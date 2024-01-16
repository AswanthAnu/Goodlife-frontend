import React from 'react';
import { Stack, Typography, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';

const KeyTypography = styled(Typography)({
  width: '150px',
  color: (theme) => theme.palette.grey[700],
});

const ValueTypography = styled(Typography)({
  flex: 1,
});

const UserDetails = ({ order }) => {
  return (
    <List disablePadding>
      <Typography variant="h6" gutterBottom>
        Customer Details
      </Typography>
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="row">
              <KeyTypography>Name:</KeyTypography>
              <ValueTypography>{`${order.customer.first_name} ${order.customer.last_name}`}</ValueTypography>
            </Stack>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="row">
              <KeyTypography>Address line 1:</KeyTypography>
              <ValueTypography>{order.customer.address_line1}</ValueTypography>
            </Stack>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="row">
              <KeyTypography>Address line 2:</KeyTypography>
              <ValueTypography>{order.customer.address_line2}</ValueTypography>
            </Stack>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="row">
              <KeyTypography>Phone number:</KeyTypography>
              <ValueTypography>{order.customer.phone_number}</ValueTypography>
            </Stack>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="row">
              <KeyTypography>Street:</KeyTypography>
              <ValueTypography>{order.customer.street_address}</ValueTypography>
            </Stack>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="row">
              <KeyTypography>City:</KeyTypography>
              <ValueTypography>{order.customer.city}</ValueTypography>
            </Stack>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="row">
              <KeyTypography>Zipcode:</KeyTypography>
              <ValueTypography>{order.customer.pincode}</ValueTypography>
            </Stack>
          }
        />
      </ListItem>
    </List>
  );
};

export default UserDetails;
