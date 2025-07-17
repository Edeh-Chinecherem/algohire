import React from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import { Search, WorkOutline, Place } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const SearchBar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        p: isMobile ? 2 : 1,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: isMobile ? 2 : 1,
        width: '100%',
        maxWidth: 800,
        mx: 'auto',
        bgcolor: 'background.paper'
      }}
    >
      <TextField
        fullWidth
        size={isMobile ? 'small' : 'medium'}
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
      />
      <Box sx={{ width: isMobile ? '100%' : 1 }} />
      <TextField
        fullWidth
        size={isMobile ? 'small' : 'medium'}
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
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size={isMobile ? 'medium' : 'large'}
        startIcon={<Search />}
        sx={{ px: isMobile ? 2 : 4, py: 1.5 }}
      >
        Search
      </Button>
    </Paper>
  );
};
