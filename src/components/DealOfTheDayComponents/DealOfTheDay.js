import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  Select,
  MenuItem
} from '@mui/material';
import config from '../../config';

const DealOfTheDay = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/offers/?page=${currentPage}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setLoading(true);
        setDeals(data.offers);
        setLoading(false);
        setTotalPages(Math.ceil(data.total_deals / 2));
        
      } catch (error) {
        console.error('Error fetching deal of the day data: ', error);
        setMessage('Deal of the day not available!');
        setDialogOpen(true);
      }
    };
    
    fetchData();
  }, [currentPage]);



  const handlePageChange = (event, newPage) => {
    setLoading(true);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const addToCartOffer = async (dealIndex) => {
    const { product_details, required_quantity } = deals[dealIndex];
    console.log(required_quantity, 'required_quantity')
    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch(`${config.apiUrl}/add-to-cart/${product_details.variant_details.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authToken}`,
        },
        body: JSON.stringify({ quantity: required_quantity }),
        
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setSnackbarMessage('Deal added to cart successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding deal to cart: ', error);
    }
  };
  
  
  

  return (
    !loading && (
      <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px', padding: '20px' }}>
        <Grid container spacing={1}>
          {/* Product Display */}
          <Grid item xs={12}>
            {deals.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '60vh',
                }}
              >
                <Typography variant="h6" color="textSecondary">
                  Sorry, there is no deal of the day available!
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={5} justifyContent="center" padding="2%">
                {deals.map((deal, dealIndex) => (
                <Grid item xs={12} md={6} key={dealIndex}>
                  <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                    <Typography variant="h6" color="textPrimary" style={{ backgroundColor: 'green', padding: '10px', color: 'white', borderRadius: '8px', marginBottom: '10px' }}>
                      {`Buy ${deal.required_quantity} ${deal.product_details.product_name} - Get ${deal.offer_product_details.product_name} Free`}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Card style={{ height: '100%' }}>
                          <CardMedia
                            component="img"
                            height="120"
                            style={{ objectFit: 'contain', width: '100%' }}
                            
                            image={deal.product_details.image_url}
                          />
                          
                          <CardContent>
                            <Typography gutterBottom variant="subtitle2" component="div">
                              {deal.product_details.product_name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" style={{ fontSize: '10px' }}>
                              Original Price: &#8377;{deal.product_details.variant_details.pricing.original_price}
                            </Typography>
                            <Typography variant="subtitle2" color="textPrimary" style={{ fontSize: '12px' }}>
                              Discount Price: &#8377;{deal.product_details.variant_details.pricing.discount_price}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Card style={{ height: '100%' }}>
                          <CardMedia
                            component="img"
                            height="120"
                            style={{ objectFit: 'contain', width: '100%' }}
                            image={deal.offer_product_details.image_url}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="subtitle2" component="div">
                              {deal.offer_product_details.product_name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" style={{ fontSize: '10px' }}>
                              Original Price: &#8377;{deal.offer_product_details.variant_details.pricing.original_price}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                    <CardActions>
                      {deal.product_details.variant_details.stock_quantity ? (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          fullWidth
                          onClick={() => addToCartOffer(dealIndex)}
                        >
                          Add to Cart
                        </Button>
                      ) : (
                        <Button variant="contained" color="error" size="small" fullWidth disabled>
                          Out of Stock
                        </Button>
                      )}
                    </CardActions>
                  </Paper>
                </Grid>
              ))}

              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
              style={{ background: 'white' }}
            />
          </Box>
        </Grid>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogContent>
            <Typography>{message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
          <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    )
  );
};

export default DealOfTheDay;
