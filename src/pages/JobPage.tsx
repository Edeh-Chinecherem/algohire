import React, { useEffect } from 'react'
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
  Checkbox,
  Chip,
} from '@mui/material'
import JobCard from '../components/JobCard'
import { useJobStore } from '../store/jobStore'
import { fetchJobs } from '../api/jobService'

const JobsPage: React.FC = () => {
  const {
    jobs,
    filteredJobs,
    savedJobs,
    filters,
    setJobs,
    setFilters,
    saveJob,
    unsaveJob,
    applyToJob,
    resetFilters,
  } = useJobStore()

  useEffect(() => {
    const loadJobs = async () => {
      const jobsData = await fetchJobs()
      setJobs(jobsData)
    }
    loadJobs()
  }, [setJobs])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value })
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ location: e.target.value })
  }

  const handleSalaryChange = (event: Event, newValue: number | number[]) => {
    setFilters({ salaryRange: newValue as [number, number] })
  }

  const handleJobTypeChange = (type: string) => {
    const currentTypes = filters.jobType as string[]
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type]
    setFilters({ jobType: newTypes as ('full-time' | 'part-time' | 'contract' | 'remote')[] })
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Find Your Dream Job
      </Typography>

      <Grid container spacing={4}>
        {/* Filters Sidebar */}
        <Grid item xs={12} md={3}>
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
                valueLabelFormat={(value) => `$${value.toLocaleString()}`}
              />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="caption">${filters.salaryRange[0].toLocaleString()}</Typography>
                <Typography variant="caption">${filters.salaryRange[1].toLocaleString()}</Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Job Type</Typography>
              <FormGroup>
                {(['full-time', 'part-time', 'contract', 'remote'] as const).map((type) => (
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
              sx={{ mt: 2 }}
            >
              Reset Filters
            </Button>
          </Paper>
        </Grid>

        {/* Job Listings */}
        <Grid item xs={12} md={9}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available
            </Typography>
            {filters.jobType.length > 0 && (
              <Box>
                {filters.jobType.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    onDelete={() => handleJobTypeChange(type)}
                    sx={{ mr: 1 }}
                  />
                ))}
              </Box>
            )}
          </Box>

          {filteredJobs.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1">
                No jobs match your criteria. Try adjusting your filters.
              </Typography>
              <Button variant="contained" onClick={resetFilters} sx={{ mt: 2 }}>
                Reset Filters
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredJobs.map((job) => (
                <Grid item xs={12} key={job.id}>
                  <JobCard
                    job={job}
                    isSaved={savedJobs.some((j) => j.id === job.id)}
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
  )
}

export default JobsPage