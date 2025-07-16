import React from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  useTheme,
  Paper
} from '@mui/material';
import { Search, WorkOutline, Place } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const SearchBar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/jobs');
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      elevation={3}
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 800,
        mx: 'auto',
        bgcolor: 'background.paper'
      }}
    >
      <TextField
        fullWidth
        placeholder="Job title, keywords, or company"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <WorkOutline color="action" />
            </InputAdornment>
          ),
          sx: { border: 'none', '& fieldset': { border: 'none' } }
        }}
        variant="outlined"
        size="medium"
      />
      <Box sx={{ width: 1, mx: 1 }} />
      <TextField
        fullWidth
        placeholder="Location"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Place color="action" />
            </InputAdornment>
          ),
          sx: { border: 'none', '& fieldset': { border: 'none' } }
        }}
        variant="outlined"
        size="medium"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        startIcon={<Search />}
        sx={{ ml: 1, px: 4, py: 1.5 }}
      >
        Search
      </Button>
    </Paper>
  );
};