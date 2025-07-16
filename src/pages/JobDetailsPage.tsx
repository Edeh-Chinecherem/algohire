import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Divider,
  Avatar,
  IconButton,
  Grid,
} from '@mui/material'
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share,
  LocationOn,
  Work,
  AttachMoney,
  Schedule,
  ArrowBack,
} from '@mui/icons-material'
import { useJobStore } from '../store/jobStore'
import { fetchJobById } from '../api/jobService'

const JobDetailsPage: React.FC = () => {
  const { id } = useParams()
  const { savedJobs, saveJob, unsaveJob, applyToJob } = useJobStore()
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isSaved = savedJobs.some((j) => j.id === id)

  useEffect(() => {
    const loadJob = async () => {
      try {
        setLoading(true)
        const jobData = await fetchJobById(id!)
        setJob(jobData)
      } catch (err) {
        setError('Failed to load job details')
      } finally {
        setLoading(false)
      }
    }
    loadJob()
  }, [id])

  const handleSaveClick = () => {
    if (isSaved) {
      unsaveJob(id!)
    } else {
      saveJob(id!)
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    )
  }

  if (error || !job) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">{error || 'Job not found'}</Typography>
        <Button component={Link} to="/jobs" startIcon={<ArrowBack />}>
          Back to Jobs
        </Button>
      </Container>
    )
  }

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
            onClick={handleSaveClick}
            color={isSaved ? 'primary' : 'default'}
          >
            {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
          <IconButton size="large">
            <Share />
          </IconButton>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box mb={4}>
              <Typography variant="h5" gutterBottom>
                Job Description
              </Typography>
              <Typography variant="body1" paragraph>
                {job.description}
              </Typography>
            </Box>

            <Box mb={4}>
              <Typography variant="h5" gutterBottom>
                Responsibilities
              </Typography>
              <ul>
                {job.responsibilities?.map((item: string, index: number) => (
                  <li key={index}>
                    <Typography variant="body1">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>

            <Box mb={4}>
              <Typography variant="h5" gutterBottom>
                Requirements
              </Typography>
              <ul>
                {job.requirements.map((item: string, index: number) => (
                  <li key={index}>
                    <Typography variant="body1">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
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
  )
}

export default JobDetailsPage