import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { FaMailBulk, FaPhone, FaInstagram, FaGlobe, FaFacebook } from 'react-icons/fa';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          paddingTop: "40px"
        }}
        component="footer"
      >
        {/* Website Details Section */}
        <div style={{ flex: 1, marginRight: { xs: 0, md: '20px' }, marginLeft: { xs: '20px', md: 0 } }}>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom></Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Good Life Bazar</strong><br />
              Get ready for budget shopping.<br />
              <FaMailBulk style={{ marginRight: '5px' }} />
              goodlifebazar@gmail.com<br />
              <FaPhone style={{ marginRight: '5px' }} />
              +91 6785463712<br />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link href="https://instagram.com/goodlifebazar" color="inherit" style={{ textDecoration: 'none', marginRight: '5px' }}>
                  <FaInstagram />
                </Link>
                <Link href="https://www.goodlifebazar.com" color="inherit" style={{ textDecoration: 'none', marginRight: '5px' }}>
                  <FaGlobe />
                </Link>
                <Link href="https://facebook.com/goodlifebazar" color="inherit" style={{ textDecoration: 'none' }}>
                  <FaFacebook />
                </Link>
              </div>
            </Typography>
          </div>
        </div>

        {/* Developer Details Section */}
        <div style={{ flex: 1 }}>
          
          <div style={{ textAlign: 'center' }}>
            <div>
                <img
                  src="static/images/logo/ME3_SERVICES.png"
                  alt="me3 services Logo"
                  style={{ maxWidth: '80px', marginBottom: '-20px' }}
                />
              </div>
            <Typography variant="body2" gutterBottom>
              Developed by
            </Typography>
            <Box></Box>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              
              <div style={{ marginLeft: '1px' }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>me3 services</strong>
                </Typography>
              </div>
            </div>
            <Typography variant="body2" color="text.secondary">
              <FaMailBulk style={{ marginRight: '5px' }} />
              me3services@gmail.com<br />
              <FaPhone style={{ marginRight: '5px' }} />
              +91 8289918645<br />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link href="https://instagram.com/me3services" color="inherit" style={{ textDecoration: 'none', marginRight: '5px' }}>
                  <FaInstagram />
                </Link>
                <Link href="https://www.me3services.com" color="inherit" style={{ textDecoration: 'none', marginRight: '5px' }}>
                  <FaGlobe />
                </Link>
                <Link href="https://facebook.com/me3services" color="inherit" style={{ textDecoration: 'none' }}>
                  <FaFacebook />
                </Link>
              </div>
            </Typography>
          </div>
        </div>
      </Box>

      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          p: 1,
        }}
        component="footer"
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "} me3 Services {new Date().getFullYear()}.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
