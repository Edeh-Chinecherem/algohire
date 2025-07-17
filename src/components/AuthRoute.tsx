// src/components/AuthRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { CircularProgress, Box } from '@mui/material';

const AuthRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRoute;