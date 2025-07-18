import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SentimentVeryDissatisfied } from '@mui/icons-material';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <SentimentVeryDissatisfied
          sx={{ fontSize: 80, color: theme.palette.error.main, mb: 2 }}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/')}
          >
            Go to Homepage
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;