import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  useTheme
} from '@mui/material';
import {
  Add,
  Bookmark,
  BookmarkBorder,
  FilterList,
  Search,
  Share,
  LocationOn,
  Work,
  AttachMoney
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useJobStore } from '../../store/jobStore';
import { useMediaQuery } from '@mui/material';  

const JobList: React.FC = () => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Temporary usage to suppress unused warnings
  if (false && (isTablet || isDesktop)) console.debug('Responsive flags ready');

  const navigate = useNavigate();
  const {
    filteredJobs,
    savedJobs,
    saveJob,
    unsaveJob,
    applyToJob,
    resetFilters
  } = useJobStore();

  const handleSaveJob = (jobId: string) => {
    saveJob(jobId);
  };

  const handleUnsaveJob = (jobId: string) => {
    unsaveJob(jobId);
  };

  const handleApply = (jobId: string) => {
    applyToJob(jobId);
  };

  return (
    <Box>
      {/* Header and Actions */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5">Posted Jobs</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/jobs/new')}
        >
          Post New Job
        </Button>
      </Box>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search jobs..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Filters
          </Button>
        </Stack>
      </Paper>

      {/* Job List */}
      {filteredJobs.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No jobs found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Try adjusting your search or filters
          </Typography>
          <Button variant="outlined" onClick={resetFilters}>
            Reset Filters
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3} columns={{ xs: 12, sm: 6, md: 4 }}>
          {filteredJobs.map((job) => (
            <Grid key={job.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography
                        variant="h6"
                        component={Link}
                        to={`/jobs/${job.id}`}
                        sx={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {job.title}
                      </Typography>
                      <Typography color="text.secondary">{job.company}</Typography>
                    </Box>
                    <IconButton
                      onClick={() =>
                        savedJobs.some((j) => j.id === job.id)
                          ? handleUnsaveJob(job.id)
                          : handleSaveJob(job.id)
                      }
                    >
                      {savedJobs.some((j) => j.id === job.id) ? (
                        <Bookmark color="primary" />
                      ) : (
                        <BookmarkBorder />
                      )}
                    </IconButton>
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ my: 2 }}>
                    <Chip
                      icon={<LocationOn />}
                      label={job.location}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<Work />}
                      label={job.type}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<AttachMoney />}
                      label={`$${job.salary.toLocaleString()}`}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>

                  <Typography variant="body2" paragraph>
                    {job.description.substring(0, 200)}...
                  </Typography>

                  <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <Chip key={index} label={req} size="small" />
                    ))}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      Posted {new Date(job.postedAt).toLocaleDateString()}
                    </Typography>
                    <Box>
                      <IconButton size="small" sx={{ mr: 1 }}>
                        <Share fontSize="small" />
                      </IconButton>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleApply(job.id)}
                      >
                        View Applications
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default JobList;
