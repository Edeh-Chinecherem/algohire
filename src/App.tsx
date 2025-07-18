import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobPage';
import JobDetailsPage from './pages/JobDetailsPage';
import AuthPage from './pages/AuthPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import NotFoundPage from './pages/NotFoundPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import EmployerDashboardPage from './pages/EmployerDashboardPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace with actual login API call
      console.log('Login values:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (values: { 
    name: string; 
    email: string; 
    password: string; 
    role: "candidate" | "employer" 
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace with actual registration API call
      console.log('Register values:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/:id" element={<JobDetailsPage />} />
          
          {/* Auth Routes */}
          <Route path="auth/:type" element={<AuthPage />} />
          
          <Route 
            path="/auth/login" 
            element={
              <LoginForm 
                onSubmit={handleLoginSubmit}
                isLoading={isLoading}
                error={error}
                onSwitchToRegister={() => navigate('/auth/register')}
                onForgotPassword={() => navigate('/auth/forgot-password')}
              />
            } 
          />
          
          <Route 
            path="/auth/register" 
            element={
              <RegisterForm 
                onSubmit={handleRegisterSubmit}
                isLoading={isLoading}
                error={error}
                onSwitchToLogin={() => navigate('/auth/login')}
              />
            } 
          />
          
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;