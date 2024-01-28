import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import config from '../../config';

const OfferBanner = () => {
  const [offers, setOffers] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/offers/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOffers(data.offers);
        console.log('Data in offer', data);
      } catch (error) {
        console.error('Error finding offers: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (offers.length > 0 && !loading) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % offers.length);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [loading, offers, currentImageIndex]);

  console.log('Current Image Index:', currentImageIndex);
  console.log('Offers:', offers);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper elevation={3} style={{ height: '100%' }}>
    <div style={{ textAlign: 'center', height: '100%' }}>
        {offers.length > 0 && (
            <img
                src={offers[currentImageIndex].image}
                alt=""
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    boxSizing: 'border-box',
                    marginBottom: -4, 
                }}
            />
        )}
    </div>
</Paper>



  );
};

export default OfferBanner;
