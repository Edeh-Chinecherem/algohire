import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Tabs,
  Tab,
  Avatar,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Add, Work, People, Assessment, Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import JobList from '../features/jobs/JobList';
import ApplicationsList from '../features/applications/ApplicationsList';

const EmployerDashboardPage: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setTabValue(newValue);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <>
      {/* Company Profile */}
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        p={3}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Avatar
          sx={{ 
            width: 80, 
            height: 80, 
            mb: 2,
            fontSize: '2rem',
            backgroundColor: theme.palette.primary.main
          }}
          src="https://randomuser.me/api/portraits/women/2.jpg"
        >
          A
        </Avatar>
        <Typography variant="h6" align="center">Acme Inc.</Typography>
        <Typography variant="body2" color="text.secondary">
          Employer Account
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <Box p={2} sx={{ flexGrow: 1 }}>
        <Button
          fullWidth
          startIcon={<Work />}
          sx={{ 
            justifyContent: 'flex-start',
            mb: 1,
            fontWeight: tabValue === 0 ? 'bold' : 'normal',
            color: tabValue === 0 ? 'primary.main' : 'text.primary'
          }}
          onClick={() => {
            setTabValue(0);
            if (isMobile) setMobileOpen(false);
          }}
        >
          My Jobs
        </Button>
        <Button
          fullWidth
          startIcon={<People />}
          sx={{ 
            justifyContent: 'flex-start',
            mb: 1,
            fontWeight: tabValue === 1 ? 'bold' : 'normal',
            color: tabValue === 1 ? 'primary.main' : 'text.primary'
          }}
          onClick={() => {
            setTabValue(1);
            if (isMobile) setMobileOpen(false);
          }}
        >
          Applications
        </Button>
        <Button
          fullWidth
          startIcon={<Assessment />}
          sx={{ 
            justifyContent: 'flex-start',
            fontWeight: tabValue === 2 ? 'bold' : 'normal',
            color: tabValue === 2 ? 'primary.main' : 'text.primary'
          }}
          onClick={() => {
            setTabValue(2);
            if (isMobile) setMobileOpen(false);
          }}
        >
          Analytics
        </Button>
      </Box>

      {/* Footer/Settings Area */}
      <Box p={2} sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        <Button 
          fullWidth 
          variant="text" 
          size="small"
          component={Link}
          to="/employer/settings"
        >
          Account Settings
        </Button>
      </Box>
    </>
  );

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default
    }}>
      {/* Mobile App Bar */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Employer Dashboard
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              component={Link}
              to="/jobs/new"
              variant="contained"
              startIcon={<Add />}
              size="small"
              sx={{ ml: 'auto' }}
            >
              Post Job
            </Button>
          </Toolbar>
        </AppBar>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          p={3}
          sx={{ 
            backgroundColor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            boxShadow: 1,
            zIndex: theme.zIndex.appBar
          }}
        >
          <Typography variant="h4" component="h1">Employer Dashboard</Typography>
          <Button
            component={Link}
            to="/jobs/new"
            variant="contained"
            startIcon={<Add />}
            size="large"
          >
            Post New Job
          </Button>
        </Box>
      )}

      <Box display="flex" sx={{ flexGrow: 1, pt: isMobile ? '56px' : 0 }}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Paper sx={{ 
            width: 280, 
            minHeight: 'calc(100vh - 80px)',
            borderRadius: 0,
            borderRight: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {drawerContent}
          </Paper>
        )}

        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              '& .MuiDrawer-paper': {
                width: 280,
                boxSizing: 'border-box',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}

        {/* Main Content Panel */}
        <Box sx={{ 
          flexGrow: 1,
          p: isMobile ? 2 : 4,
          width: isMobile ? '100%' : 'calc(100vw - 280px)',
          maxWidth: '100%',
          overflowX: 'hidden'
        }}>
          {/* Tabs Navigation - Hidden on mobile */}
          {!isMobile && (
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              sx={{ 
                mb: 4,
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="My Jobs" />
              <Tab label="Applications" />
              <Tab label="Analytics" />
            </Tabs>
          )}

          {/* Tab Content */}
          <Box sx={{ width: '100%' }}>
            {tabValue === 0 && <JobList />}
            {tabValue === 1 && <ApplicationsList />}
            {tabValue === 2 && (
              <Paper sx={{ p: isMobile ? 2 : 4, textAlign: 'center' }}>
                <Assessment sx={{ 
                  fontSize: isMobile ? 40 : 60, 
                  mb: 2, 
                  color: 'text.secondary' 
                }} />
                <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
                  Analytics Dashboard
                </Typography>
                <Typography variant={isMobile ? 'body2' : 'body1'} color="text.secondary">
                  Coming soon - Track your job performance metrics
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployerDashboardPage;