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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme
} from '@mui/material';

interface RegisterFormProps {
  onSubmit: (values: { name: string; email: string; password: string; role: "candidate" | "employer" }) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onSubmit, 
  isLoading, 
  error, 
  onSwitchToLogin 
}) => {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'candidate' as "candidate" | "employer",
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
      role: Yup.string().oneOf(["candidate", "employer"]).required('Required'),
    }),
    onSubmit: (values) => onSubmit({
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role
    }),
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
          Create Account
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
            label="Full Name"
            name="name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              label="Role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.role && Boolean(formik.errors.role)}
            >
              <MenuItem value="candidate">Candidate</MenuItem>
              <MenuItem value="employer">Employer</MenuItem>
            </Select>
            {formik.touched.role && formik.errors.role && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {formik.errors.role}
              </Typography>
            )}
          </FormControl>

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="outlined"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ 
              mt: 2, 
              py: 1.5,
            }}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body1">
            Already have an account?{' '}
            <Link 
              component="button" 
              onClick={onSwitchToLogin}
              sx={{ fontWeight: 600 }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterForm;