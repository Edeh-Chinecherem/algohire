import React from 'react';
import {
  
  TextField,
  Button,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Paper,
  Stack
} from '@mui/material';
import { Search, WorkOutline, Place } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const SearchBar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
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
        p: { xs: 2, sm: 1.5, md: 1 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: { xs: 2, sm: 1 },
        width: '100%',
        maxWidth: { xs: '100%', sm: 800 },
        mx: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 4,
        '&:hover': {
          boxShadow: 6
        },
        transition: theme.transitions.create(['box-shadow'], {
          duration: theme.transitions.duration.standard
        })
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 2, sm: 1 }}
        width="100%"
        alignItems="stretch"
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
            sx: {
              borderRadius: 4,
              bgcolor: 'background.default',
              '& fieldset': { border: 'none' }
            }
          }}
          variant="outlined"
        />

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
            sx: {
              borderRadius: 4,
              bgcolor: 'background.default',
              '& fieldset': { border: 'none' }
            }
          }}
          variant="outlined"
        />
      </Stack>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size={isMobile ? 'medium' : 'large'}
        startIcon={<Search />}
        sx={{
          px: { xs: 2, sm: 4 },
          py: { xs: 1, sm: 1.5 },
          width: { xs: '100%', sm: 'auto' },
          borderRadius: 4,
          fontWeight: 'bold',
          textTransform: 'none',
          fontSize: { xs: '0.875rem', sm: '1rem' }
        }}
      >
        {isMobile ? 'Search Jobs' : 'Search'}
      </Button>
    </Paper>
  );
};