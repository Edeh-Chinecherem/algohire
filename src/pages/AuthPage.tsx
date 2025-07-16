import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material'
import { useAuthStore } from '../store/authStore'

const AuthPage: React.FC = () => {
  const { type } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading, error, login, register, setError } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'employer' ? '/employer/dashboard' : '/')
    }
  }, [isAuthenticated, user, navigate])

  useEffect(() => {
    setError(null)
  }, [type, setError])

  const isLogin = type === 'login'

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
    ...(isLogin
      ? {}
      : {
          name: Yup.string().required('Required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required'),
        }),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (isLogin) {
        await login(values.email, values.password)
      } else {
        await register({
          name: values.name,
          email: values.email,
          password: values.password,
          role: 'candidate',
        })
      }
    },
  })

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? 'Login' : 'Create an Account'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
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
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2, height: 48 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : isLogin ? (
              'Login'
            ) : (
              'Register'
            )}
          </Button>
        </form>

        <Divider sx={{ my: 3 }} />

        <Box textAlign="center">
          <Typography variant="body2">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <Link
              href={`/auth/${isLogin ? 'register' : 'login'}`}
              underline="hover"
            >
              {isLogin ? 'Register here' : 'Login here'}
            </Link>
          </Typography>
        </Box>

        {isLogin && (
          <Box textAlign="center" mt={2}>
            <Link href="/auth/forgot-password" underline="hover">
              Forgot password?
            </Link>
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default AuthPage