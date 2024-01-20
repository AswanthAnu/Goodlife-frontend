import React, { useState, useEffect } from 'react'
import {Container, 
        Grid, 
        Card, 
        CardContent, 
        CardActions, 
        CardMedia, 
        Typography, 
        Button, 
        Box, 
        MenuItem, 
        Select,
        Stack,
        Snackbar,
        Alert,
        Pagination,
        Dialog,
        DialogActions,
        DialogContent,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchField from '../SearchFieldComponents/SearchField';
import CategoryChip from './CategoryChip';
import OfferBanner from './OfferBanner';
import config from '../../config';



const HomePageContent = () => {

  const [products, setProducts] = useState([])
  const [selectedVariants, setSelectedVariants] = useState([])
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [message, setMessage] = useState('')
  


  useEffect(() => {

    const handleClick = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/products/category/${currentCategory}/?page=${currentPage}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        handleSearch(data);
      } catch (error) {
        console.error('Error searching categories: ', error);
      }
    };

    if (!currentCategory) {
      const apiUrl = `${config.apiUrl}/products/?page=${currentPage}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setLoading(true);
          setProducts(data.products);

          console.log(products, 'products---')
          
          setTotalPages((prevTotalPages) => Math.ceil(data.total_products / 16));
          const initialVariants = data.products.map((product) => product.variants[0]?.id || '');
          setSelectedVariants(initialVariants);

          const allCategories = data.products.flatMap((product) => product.category);
          const uniqueCategories = [...new Set(allCategories)];
          setUniqueCategories(uniqueCategories);

          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
          setMessage('Products not available!');
          setDialogOpen(true);
        });
    } else if (currentCategory) {
      handleClick();
    }
  }, [currentPage, currentCategory]);




  const handleSearch = (searchResults) => {
    
    setLoading(true)
    const initialSearchVariants = searchResults.products.map((product) => product.variants[0]?.id || '');
    setSelectedVariants(prev => [...initialSearchVariants]);
    setProducts(prev => [...searchResults.products]);
    setTotalPages((prevTotalPages) => Math.ceil(searchResults.total_products / 2));
    setLoading(false);
   
    
  };

  const handleVariantChange = (event, productIndex) => {
    const variantKey = event.target.value;
    const updatedVariants = [...selectedVariants];
    updatedVariants[productIndex] = variantKey;
    setSelectedVariants(updatedVariants);
  };

  const handlePageChange = (event, newPage) => {
    setLoading(true)
     if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

    const handleclosedialog = () => {
      setDialogOpen(false)
    }

   
  const addToCart = async (variantId) => {
    console.log(variantId, 'variant id')
    try {
      
      const authToken = localStorage.getItem('token');
      const response = await fetch(`${config.apiUrl}/add-to-cart/${variantId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authToken}`,
        },
        body: JSON.stringify({ quantity: 1 }),
      });

      console.log(response, 'response')

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSnackbarMessage('Item added to cart successfully');
      setSnackbarOpen(true); 
      console.log('Item added to cart:', data);
    } catch (error) {
      console.error('Error adding item to cart: ', error);
    }
  };


  console.log(products, 'products---')
  
  return (
    !loading && (
      <Container maxWidth="lg" style={{ marginTop: '30px', marginBottom: '30px', }}>
        <Grid container spacing={1} style={{ marginBottom: '30px' }}>
          {/* Offer Banner */}
          <Grid item  md={7} sm={12} style={{ marginLeft: '44px' }}>
            <OfferBanner />
          </Grid>

          {/* Search Field */}
          <Grid item md={4} sm={6} style={{ marginTop: '12px', marginLeft: '-10px' }}>
            <Stack>
              <SearchField
                onSearch={handleSearch}
              
              />
            </Stack>  
            <Stack>
            
            <CategoryChip
              items={uniqueCategories}
              setCurrentCategory = {setCurrentCategory}
              onSearch={handleSearch}
            />
          </Stack>
          </Grid>

        </Grid>

        <Grid container spacing={1}>
          {/* CategoryChip */}
          
          {/* Product Display */}
          <Grid item lg={10} sm={12}>
            {products.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '60vh',
                }}
              >
              <ShoppingCartIcon
                sx={{ fontSize: '64px', color: 'gray' }}
              />
              <Typography variant="h6" color="textSecondary">
                Sorry, there is no items matching this...!
              </Typography>
              
            </Box>
          ) : (
            <Grid container spacing={5}  justifyContent="flex-start" padding={"2%"}>
              {products.map((product, index) => (
                <Grid item xs={4} sm={4} md={3} lg={3} xl={3} key={index}>
                  <Card style={{ height: '100%', width: '220px'}}>
                    <Box sx={{
                      m: 1,
                      border: 1,
                      borderColor: 'grey.200',
                      borderRadius: '16px',
                      position: 'relative',
                      overflow: 'hidden', // Hide overflow content
                    }}>
                      {selectedVariants[index] &&
                        product.variants.find((variant) => variant.id === selectedVariants[index]).pricing.discount_price > 0 && (
                          <Typography
                            variant="body2"
                            component="div"
                            style={{
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              background: 'rgba(0, 128, 0, 0.7)',
                              color: 'white',
                              padding: '4px 8px',
                              borderTopLeftRadius: '16px',
                              fontSize: '10px', // Adjust font size
                            }}
                          >
                            {selectedVariants[index] &&
                              product.variants.find((variant) => variant.id === selectedVariants[index]).pricing.discount_price}rs off
                          </Typography>
                        )}
                      <CardMedia
                        component="img"
                        height="120" // Adjust the fixed image height
                        style={{ objectFit: 'cover', width: '100%' }} // Ensure the image covers the entire space
                        image={product.image}
                      />
                    </Box>
                    <CardContent>
                      <Typography gutterBottom variant="subtitle2" component="div"> {/* Adjust font size */}
                        {product.product_name}
                      </Typography>
                      <Select
                        value={selectedVariants[index] || ''}
                        onChange={(event) => handleVariantChange(event, index)}
                        style={{ margin: 5, width: '100%', fontSize: '12px' }} // Adjust font size
                      >
                        {product.variants.map((variant, variantIndex) => (
                          <MenuItem key={variantIndex} value={variant.id}>
                            {`${Math.round(variant.weight)} ${variant.weight_unit}`}
                            {variant.pricing.discount > 0 && (
                              <span
                                style={{
                                  marginLeft: '8px',
                                  padding: '2px 6px',
                                  backgroundColor: 'rgba(0, 128, 0, 0.7)',
                                  color: 'white',
                                  borderRadius: '4px',
                                  fontSize: '10px', // Adjust font size
                                }}
                              >
                                {`${variant.pricing.discount}% off`}
                              </span>
                            )}
                          </MenuItem>
                        ))}
                      </Select>

                      {selectedVariants[index] && product.variants.find((variant) => variant.id === selectedVariants[index]) && (
                        <>
                          <Typography variant="caption" color="textSecondary" style={{ fontSize: '10px' }}> {/* Adjust font size */}
                            Original Price: &#8377;{product.variants.find((variant) => variant.id === selectedVariants[index]).pricing.original_price}
                          </Typography>
                          <Typography variant="subtitle2" color="textPrimary" style={{ fontSize: '12px' }}> {/* Adjust font size */}
                            Discount Price: &#8377;{product.variants.find((variant) => variant.id === selectedVariants[index]).pricing.discount_price}
                          </Typography>
                        </>
                      )}
                    </CardContent>
                    <CardActions>
                      {selectedVariants[index] && product.variants.find((variant) => variant.id === selectedVariants[index]).stock_quantity ? (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          fullWidth
                          onClick={() => addToCart(selectedVariants[index])}
                        >
                          Add to Cart
                        </Button>
                      ) : (
                        <Button variant="contained" color="error" size="small" fullWidth
                          disabled
                        >
                          Out of Stock
                        </Button>
                      )}
                    </CardActions>
                  </Card>

                  <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                    <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                      {snackbarMessage}
                    </Alert>
                  </Snackbar>
                </Grid>
              ))}
            </Grid>

          )}
        </Grid>
      </Grid>
      {/* {totalPages > 1 && ( */}
        <Grid container justifyContent="center">
          <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
            />
          </Box>
        </Grid>
      
      <Dialog open={dialogOpen} onClose={handleclosedialog}>
        {/* <DialogTitle style={{ color: 'red', textAlign: 'center' }} >
          Something went wrong...!
        </DialogTitle> */}
        <DialogContent>
          <Typography >
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleclosedialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
      
    )
  )
  
}

export default HomePageContent