import React from 'react';
import { Container, Grid } from '@mui/material';

const AboutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <img src="static/images/about_banners/about_banner_one.png" alt="Banner 1" style={{ maxWidth: '100%', width: '100%' }} />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ paddingBottom: 2 }}>
          <img src="static/images/about_banners/about_banner_two.png" alt="Banner 2" style={{ maxWidth: '100%', width: '100%' }} />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ paddingBottom: 2 }}>
          <img src="static/images/about_banners/about_banner_three.png" alt="Banner 3" style={{ maxWidth: '100%', width: '100%' }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
