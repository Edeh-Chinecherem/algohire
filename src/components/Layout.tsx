import { Outlet } from 'react-router-dom'
import { Box, CssBaseline, Toolbar } from '@mui/material'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar />
      <Toolbar /> {/* This pushes content below the app bar */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout