import React from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { FilterList, Search as SearchIcon } from '@mui/icons-material';
import { useJobStore } from '../store/jobStore';
import JobCard from '../components/JobCard';
import type { JobType } from '../types/types';

const JobPage: React.FC = () => {
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
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Browse Jobs
      </Typography>

      <Grid container spacing={4} columns={{ xs: 12, md: 12 }}>
        
        <Grid >
          <Paper sx={{ p: 3 }}>
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
            />

            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={filters.location}
              onChange={handleLocationChange}
              sx={{ mb: 3 }}
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
            >
              Reset Filters
            </Button>
          </Paper>
        </Grid>

        {/* Job Listings */}
        <Grid>
          <Typography variant="h6" gutterBottom>
            {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available
          </Typography>

          {filteredJobs.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1">
                No jobs match your criteria. Try adjusting your filters.
              </Typography>
              <Button variant="outlined" onClick={resetFilters} sx={{ mt: 2 }}>
                Reset Filters
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3} columns={{ xs: 12, md: 12 }}>
              {filteredJobs.map((job) => (
                <Grid key={job.id}>
                  <JobCard
                    job={job}
                    isSaved={savedJobs.some(j => j.id === job.id)}
                    onSave={() => saveJob(job.id)}
                    onUnsave={() => unsaveJob(job.id)}
                    onApply={() => applyToJob(job.id)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobPage;