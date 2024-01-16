import React from 'react'
import { Container, Typography, Link, Box } from '@mui/material'

const Footer = () => {
  return (
    <>
        <Box
            sx={{
                backgroundColor: (theme) =>
                theme.palette.mode === "light"
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800],
                p: 6,
            }}
            component="footer"
        >
        <Container maxWidth="sm">
            <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://Goodlifebazar.com/">
                Good Life Bazar
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
            </Typography>
        </Container>
        </Box>
    </>
  )
}

export default Footer