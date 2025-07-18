import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Link,
  Alert,
  Paper,
  Typography,
  useTheme
} from '@mui/material';

interface LoginFormProps {
  onSubmit: (values: { email: string; password: string }) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  isLoading, 
  error, 
  onSwitchToRegister,
  onForgotPassword
}) => {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  return (
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: theme.palette.background.default,
      p: 2
    }}>
      <Paper elevation={3} sx={{
        width: '100%',
        maxWidth: '450px',
        p: 4,
        borderRadius: 2
      }}>
        <Typography component="h1" variant="h4" sx={{ 
          mb: 3, 
          textAlign: 'center',
          fontWeight: 500
        }}>
          Sign In
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={formik.handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            type="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ 
              mt: 2, 
              mb: 2, 
              py: 1.5,
            }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mt: 3
        }}>
          <Link 
            component="button" 
            onClick={onForgotPassword}
            sx={{ 
              fontSize: '0.875rem',
            }}
          >
            Forgot password?
          </Link>
          <Link 
            component="button" 
            onClick={onSwitchToRegister}
            sx={{ 
              fontWeight: 600, 
              fontSize: '0.875rem',
            }}
          >
            Create an account
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;