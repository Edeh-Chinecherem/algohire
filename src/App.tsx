import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobPage'
import JobDetailsPage from './pages/JobDetailsPage'
import AuthPage from './pages/AuthPage'
import NotFoundPage from './pages/NotFoundPage'
// import AuthRoute from './components/AuthRoute'; 
import ForgotPasswordPage from './pages/ForgotPasswordPage'
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
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          {/* <Route element={<AuthRoute />}> */}
          
          <Route path="/auth/login" element={<AuthPage />} />
          <Route path="/auth/register" element={<AuthPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        {/* </Route> */}
        <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/:id" element={<JobDetailsPage />} />
          <Route path="auth/:type" element={<AuthPage />} />
          {/* <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App