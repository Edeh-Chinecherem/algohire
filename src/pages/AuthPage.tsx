import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useAuthStore } from '../store/authStore';

const AuthPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, isAuthenticated, isLoading, error, login, register, setError } = useAuthStore();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (!initialLoad && isAuthenticated && user) {
      navigate(user.role === 'employer' ? '/employer/dashboard' : '/', { replace: true });
    }
    setInitialLoad(false);
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    setError(null);
    formik.resetForm();
  }, [type, setError]);

  const isLogin = type === 'login';

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
    ...(!isLogin && {
      name: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required')
    })
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isLogin) {
          await login(values.email, values.password);
        } else {
          await register({
            name: values.name,
            email: values.email,
            password: values.password,
            role: 'candidate',
          });
        }
      } catch (err) {
        // Error handling is already done in the store
      }
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        p: 0,
        m: 0,
        backgroundColor: theme.palette.background.default
      }}
    >
      <Paper 
        elevation={isMobile ? 0 : 3}
        sx={{ 
          width: '100%',
          maxWidth: isMobile ? '100%' : 1200,
          height: isMobile ? '100vh' : 'auto',
          minHeight: isMobile ? '100vh' : '80vh',
          p: isMobile ? 2 : 6,
          m: 0,
          borderRadius: 0,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          backgroundColor: isMobile ? theme.palette.background.default : 'background.paper'
        }}
      >
        {/* Branding/Image Section - Hidden on mobile */}
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
              p: 4,
              borderRadius: '4px 0 0 4px'
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Algohire
            </Typography>
            <Typography variant="h5" align="center">
              {isLogin ? 'Welcome back to your professional community' : 'Join thousands of professionals today'}
            </Typography>
          </Box>
        )}

        {/* Form Section - Always visible */}
        <Box
          sx={{
            width: isMobile ? '100%' : '50%',
            p: isMobile ? 2 : 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'background.paper',
            borderRadius: isMobile ? 0 : '0 4px 4px 0'
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
            variant={isMobile ? 'h5' : 'h3'}
            sx={{ 
              fontWeight: 600,
              mb: 4,
              color: theme.palette.text.primary,
              textAlign: isMobile ? 'center' : 'left'
            }}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error.message}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            {!isLogin && (
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                margin="normal"
                sx={{ mb: 3 }}
                size={isMobile ? 'small' : 'medium'}
              />
            )}

            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
              sx={{ mb: 3 }}
              size={isMobile ? 'small' : 'medium'}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
              sx={{ mb: 3 }}
              size={isMobile ? 'small' : 'medium'}
            />

            {!isLogin && (
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                margin="normal"
                sx={{ mb: 3 }}
                size={isMobile ? 'small' : 'medium'}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size={isMobile ? 'medium' : 'large'}
              disabled={isLoading}
              sx={{ 
                mt: 2, 
                mb: 2, 
                height: isMobile ? 48 : 56,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 1
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>

          <Box textAlign="center">
            <Typography variant={isMobile ? 'body2' : 'body1'}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <Link
                component={RouterLink}
                to={`/auth/${isLogin ? 'register' : 'login'}`}
                underline="hover"
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.primary.main
                }}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Link>
            </Typography>
          </Box>

          {isLogin && (
            <Box textAlign="center" mt={2}>
              <Link 
                component={RouterLink} 
                to="/auth/forgot-password" 
                underline="hover"
                sx={{ 
                  fontWeight: 500,
                  color: theme.palette.text.secondary
                }}
              >
                Forgot password?
              </Link>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthPage;