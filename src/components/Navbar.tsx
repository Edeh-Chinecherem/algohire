import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Navigation functions
  const handleLogin = () => {
    navigate('/auth/login');
  };

  const handleRegister = () => {
    navigate('/auth/register');
  };

  const handleEmployerDashboard = () => {
    navigate('/employer/dashboard'); // Updated to match your route
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Algohire
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button component={Link} to="/jobs" color="inherit">
            Browse Jobs
          </Button>
          <Button 
            onClick={handleEmployerDashboard} 
            color="inherit"
          >
            For Employers
          </Button>
        </Box>
        <IconButton size="large" color="inherit">
          <SearchIcon />
        </IconButton>
        <Button onClick={handleLogin} color="inherit">
          Login
        </Button>
        <Button
          onClick={handleRegister}
          variant="contained"
          color="secondary"
          sx={{ ml: 1 }}
        >
          Register
        </Button>
        <IconButton onClick={handleMenuOpen} color="inherit">
          <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;