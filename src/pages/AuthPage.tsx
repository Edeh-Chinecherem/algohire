import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Typography, Alert, useTheme, useMediaQuery } from '@mui/material';
import { useAuthStore } from '../store/authStore';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    setError,
    } = useAuthStore();
  
  const [activeForm, setActiveForm] = useState<'login' | 'register'>(
    type === 'register' ? 'register' : 'login'
  );

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'employer' ? '/employer/dashboard' : '/candidate/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  // Reset error when switching forms
  useEffect(() => {
    setError(null);
  }, [activeForm, setError]);

  const handleLoginSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
    } catch (err) {
      // Error is already handled in the store
    }
  };

  const handleRegisterSubmit = async (values: { 
    name: string; 
    email: string; 
    password: string;
    role: 'candidate' | 'employer'
  }) => {
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'candidate' // Default role, can be changed via UI if needed
      });
    } catch (err) {
      // Error is already handled in the store
    }
  };

  const handleSwitchToLogin = () => {
    setActiveForm('login');
    navigate('/auth/login');
  };

  const handleSwitchToRegister = () => {
    setActiveForm('register');
    navigate('/auth/register');
  };

  const handleForgotPassword = () => {
    navigate('/auth/forgot-password');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.background.default
      }}
    >
      <Paper 
        elevation={isMobile ? 0 : 3}
        sx={{ 
          width: '100%',
          maxWidth: isMobile ? '100%' : 1200,
          minHeight: isMobile ? '100vh' : '80vh',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          backgroundColor: isMobile ? theme.palette.background.default : 'background.paper'
        }}
      >
        {/* Branding Section */}
        {!isMobile && (
          <Box
            sx={{
              width: '50%',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 4
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Algohire
            </Typography>
            <Typography variant="h5" align="center">
              {activeForm === 'login' 
                ? 'Welcome back to your professional community' 
                : 'Join thousands of professionals today'}
            </Typography>
          </Box>
        )}

        {/* Form Section */}
        <Box
          sx={{
            width: isMobile ? '100%' : '50%',
            p: isMobile ? 3 : 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          {isMobile && (
            <Box textAlign="center" mb={4}>
              <Typography 
                variant="h4"
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.primary.main
                }}
              >
                Algohire
              </Typography>
            </Box>
          )}

          <Typography 
            variant={isMobile ? 'h5' : 'h4'}
            sx={{ 
              fontWeight: 600,
              mb: 4,
              textAlign: isMobile ? 'center' : 'left'
            }}
          >
            {activeForm === 'login' ? 'Sign In' : 'Create Account'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error.message}
            </Alert>
          )}

          {activeForm === 'login' ? (
            <LoginForm 
              onSubmit={handleLoginSubmit}
              isLoading={isLoading}
              error={error?.message || null}
              onSwitchToRegister={handleSwitchToRegister}
              onForgotPassword={handleForgotPassword}
            />
          ) : (
            <RegisterForm 
              onSubmit={handleRegisterSubmit}
              isLoading={isLoading}
              error={error?.message || null}
              onSwitchToLogin={handleSwitchToLogin}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthPage;