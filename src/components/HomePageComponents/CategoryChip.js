import React from 'react';
import { TextField, MenuItem, Box } from '@mui/material';
import config from '../../config';

const CategoryChip = ({ items, setCurrentCategory, onSearch }) => {
  const currentPage = 1;

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
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <TextField
        select
        label="Filter by Category"
        size='small'
        style={{ marginTop: '8px', minWidth: '250px' }}
        onChange={(e) => handleClick(e.target.value)}
      >
        {[...items, 'All'].map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default CategoryChip;
