import { Outlet } from 'react-router-dom'
import { Box, CssBaseline, Toolbar } from '@mui/material'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100vw', // Add this for full viewport width
      overflowX: 'hidden' // Prevents horizontal scroll
    }}>
      <CssBaseline />
      <Navbar />
      <Toolbar /> {/* This pushes content below the app bar */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: '100%', // Ensures main content takes full width
          maxWidth: '100%', // Prevents any max-width constraints
          padding: 0, // Remove any default padding
          margin: 0 // Remove any default margin
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout