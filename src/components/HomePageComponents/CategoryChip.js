import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Box, Paper } from '@mui/material';
import config from '../../config';

const CategoryChip = ({ items, setCurrentCategory, onSearch }) => {
  const currentPage = 1;
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 850);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 850);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = async (category) => {
    try {
      if (category === 'All') {
        const response = await fetch(`${config.apiUrl}/products/?page=1`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        onSearch(data);
      } else {
        const response = await fetch(`${config.apiUrl}/products/category/${category}/?page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        onSearch(data);
      }
    } catch (error) {
      console.error('Error searching categories: ', error);
    }
    setCurrentCategory(category);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Paper elevation={3} sx={{ padding: 2, minWidth: '200px' }}>
        {isSmallScreen ? (
          <TextField
            select
            label="Filter by Category"
            size='small'
            style={{ width: '100%' }}
            onChange={(e) => handleClick(e.target.value)}
          >
            {[...items, 'All'].map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {[...items, 'All'].map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => handleClick(item)}
                style={{ cursor: 'pointer', padding: '8px' }}
              >
                {item}
              </MenuItem>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CategoryChip;
