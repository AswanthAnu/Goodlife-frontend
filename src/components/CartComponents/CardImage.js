import React from 'react'
import { 
    CardMedia 
} from '@mui/material'


const CardImage = ({cartitem, index}) => {
  console.log(cartitem.product.image, 'cartitem.product---------')
  return (
    <CardMedia
        component="img"
        height="120"
        alt={`Image for item ${index}`}
        
        style={{ objectFit: 'contain' }}
        image={`https://api.goodlifebazar.com${cartitem.product.image}`}
    />
  )
}

export default CardImage