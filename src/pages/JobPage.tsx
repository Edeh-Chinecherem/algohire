import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import { FilterList, Search as SearchIcon } from '@mui/icons-material';
import { useJobStore } from '../store/jobStore';
import JobCard from '../components/JobCard';
import type { JobType } from '../types/types';

const JobPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    filteredJobs,
    savedJobs,
    filters,
    setFilters,
    saveJob,
    unsaveJob,
    applyToJob,
    resetFilters
  } = useJobStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ location: e.target.value });
  };

  const handleSalaryChange = (_event: Event, newValue: number | number[]) => {
    setFilters({ salaryRange: newValue as [number, number] });
  };

  const handleJobTypeChange = (type: JobType) => {
    const newTypes = filters.jobType.includes(type)
      ? filters.jobType.filter(t => t !== type)
      : [...filters.jobType, type];
    setFilters({ jobType: newTypes });
  };

  return (
    <Box sx={{ width: '100vw', overflowX: 'hidden' }}>
      <Container maxWidth={false} sx={{ 
        maxWidth: 'xl',
        px: { xs: 2, sm: 4 },
        py: 4
      }}>
        <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
          Browse Jobs
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 4,
          width: '100%'
        }}>
          {/* Filters Sidebar */}
          <Box sx={{
            width: isMobile ? '100%' : 300,
            flexShrink: 0
          }}>
            <Paper sx={{ 
              p: 3,
              position: isMobile ? 'static' : 'sticky',
              top: 20
            }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>

              <TextField
                fullWidth
                label="Search Jobs"
                variant="outlined"
                value={filters.search}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon color="action" />,
                }}
                sx={{ mb: 3 }}
                size={isMobile ? 'small' : 'medium'}
              />

              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                value={filters.location}
                onChange={handleLocationChange}
                sx={{ mb: 3 }}
                size={isMobile ? 'small' : 'medium'}
              />

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>Salary Range</Typography>
                <Slider
                  value={filters.salaryRange}
                  onChange={handleSalaryChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={200000}
                  step={10000}
                />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption">
                    ${filters.salaryRange[0].toLocaleString()}
                  </Typography>
                  <Typography variant="caption">
                    ${filters.salaryRange[1].toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>Job Type</Typography>
                <FormGroup>
                  {(['full-time', 'part-time', 'contract', 'remote'] as JobType[]).map((type) => (
                    <FormControlLabel
                      key={type}
                      control={
                        <Checkbox
                          checked={filters.jobType.includes(type)}
                          onChange={() => handleJobTypeChange(type)}
                          size={isMobile ? 'small' : 'medium'}
                        />
                      }
                      label={type.charAt(0).toUpperCase() + type.slice(1)}
                    />
                  ))}
                </FormGroup>
              </Box>

              <Button
                variant="outlined"
                fullWidth
                onClick={resetFilters}
                startIcon={<FilterList />}
                size={isMobile ? 'small' : 'medium'}
              >
                Reset Filters
              </Button>
            </Paper>
          </Box>

          {/* Job Listings */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available
            </Typography>

            {filteredJobs.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body1">
                  No jobs match your criteria. Try adjusting your filters.
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={resetFilters} 
                  sx={{ mt: 2 }}
                  size={isMobile ? 'small' : 'medium'}
                >
                  Reset Filters
                </Button>
              </Paper>
            ) : (
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)'
                },
                gap: 3,
                width: '100%'
              }}>
                {filteredJobs.map((job) => (
                  <Box key={job.id} sx={{ width: '100%' }}>
                    <JobCard
                      job={job}
                      isSaved={savedJobs.some(j => j.id === job.id)}
                      onSave={() => saveJob(job.id)}
                      onUnsave={() => unsaveJob(job.id)}
                      onApply={() => applyToJob(job.id)}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default JobPage;