import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Chip,
  Divider,
  Avatar,
  IconButton
} from '@mui/material';
import {
  Bookmark,
  BookmarkBorder,
  Share,
  LocationOn,
  Work,
  AttachMoney,
  Schedule,
  ArrowBack
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useJobStore } from '../store/jobStore';
import { fetchJobById } from '../api/JobService';
import type { Job } from '../types/types';

const JobDetailsPage: React.FC = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const { savedJobs, saveJob, unsaveJob, applyToJob } = useJobStore();
  const [job, setJob] = React.useState<Job | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadJob = async () => {
      try {
        setLoading(true);
        const jobData = await fetchJobById(id!);
        setJob(jobData);
      } catch (err) {
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error || !job) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">{error || 'Job not found'}</Typography>
        <Button component={Link} to="/jobs" startIcon={<ArrowBack />}>
          Back to Jobs
        </Button>
      </Container>
    );
  }

  const isSaved = savedJobs.some(j => j.id === job.id);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        component={Link}
        to="/jobs"
        startIcon={<ArrowBack />}
        sx={{ mb: 2 }}
      >
        Back to Jobs
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4}>
          <Box>
            <Typography variant="h3" gutterBottom>
              {job.title}
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {job.company}
            </Typography>
          </Box>
          <Avatar
            src={job.companyLogo}
            sx={{ width: 80, height: 80 }}
            alt={job.company}
          />
        </Box>

        <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
          <Chip
            icon={<LocationOn />}
            label={job.location}
            variant="outlined"
            size="medium"
          />
          <Chip
            icon={<Work />}
            label={job.type}
            variant="outlined"
            size="medium"
          />
          <Chip
            icon={<AttachMoney />}
            label={`$${job.salary.toLocaleString()}`}
            variant="outlined"
            size="medium"
          />
          <Chip
            icon={<Schedule />}
            label={`Posted ${new Date(job.postedAt).toLocaleDateString()}`}
            variant="outlined"
            size="medium"
          />
        </Box>

        <Box display="flex" gap={2} mb={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => applyToJob(job.id)}
          >
            Apply Now
          </Button>
          <IconButton
            size="large"
            onClick={() => isSaved ? unsaveJob(job.id) : saveJob(job.id)}
            color={isSaved ? 'primary' : 'default'}
          >
            {isSaved ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
          <IconButton size="large">
            <Share />
          </IconButton>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={4} columns={{ xs: 12, md: 12 }}>
          <Grid >
            <Box mb={4}>
              <Typography variant="h5" gutterBottom>
                Job Description
              </Typography>
              <Typography variant="body1" paragraph>
                {job.description}
              </Typography>
            </Box>

            {job.responsibilities?.length > 0 && (
              <Box mb={4}>
                <Typography variant="h5" gutterBottom>
                  Responsibilities
                </Typography>
                <ul>
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>
                      <Typography variant="body1">{item}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            <Box mb={4}>
              <Typography variant="h5" gutterBottom>
                Requirements
              </Typography>
              <ul>
                {job.requirements.map((item, index) => (
                  <li key={index}>
                    <Typography variant="body1">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Grid>

          <Grid>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Job Overview
              </Typography>
              <Box mb={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Company
                </Typography>
                <Typography variant="body1">{job.company}</Typography>
              </Box>
              <Box mb={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body1">{job.location}</Typography>
              </Box>
              <Box mb={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Job Type
                </Typography>
                <Typography variant="body1">
                  {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                </Typography>
              </Box>
              <Box mb={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Salary
                </Typography>
                <Typography variant="body1">
                  ${job.salary.toLocaleString()}/year
                </Typography>
              </Box>
              <Box mb={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Posted Date
                </Typography>
                <Typography variant="body1">
                  {new Date(job.postedAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Paper>

            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={() => applyToJob(job.id)}
              >
                Apply For This Job
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default JobDetailsPage;