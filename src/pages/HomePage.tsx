import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { useJobStore } from '../store/jobStore';
import { SearchBar } from '../components/SearchBar';


const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { 
    filteredJobs, 
    savedJobs, 
    saveJob, 
    unsaveJob, 
    applyToJob 
  } = useJobStore();

  // Create properly typed featured jobs
  const featuredJobs = filteredJobs.slice(0, 4).map(job => ({
    ...job,
    // Ensure all required Job properties are present
    companyId: job.companyId || '',
    remote: job.remote || false,
    salaryCurrency: job.salaryCurrency || 'USD',
    salaryPeriod: job.salaryPeriod || 'year',
    responsibilities: job.responsibilities || [],
    benefits: job.benefits || [],
    skills: job.skills || [],
    experienceLevel: job.experienceLevel || 'mid',
    educationLevel: job.educationLevel || 'bachelor',
    applicantsCount: job.applicantsCount || 0,
    viewsCount: job.viewsCount || 0
  }));

  const popularCategories = [
    'Frontend',
    'Backend',
    'Full Stack',
    'DevOps',
    'UI/UX',
    'Mobile',
    'Data Science',
    'Machine Learning'
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%)'
            : 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
          color: 'white',
          py: 10,
          px: 2,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Find Your Dream Tech Job
          </Typography>
          <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4 }}>
            Join thousands of companies and developers using Algohire to connect
          </Typography>
          
          <SearchBar />

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ mt: 3 }}
          >
            {popularCategories.slice(0, isMobile ? 4 : 8).map((category) => (
              <Chip
                key={category}
                label={category}
                clickable
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)', mb: 1 }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Featured Jobs Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h2">
            Featured Jobs
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/jobs')}
            size={isMobile ? 'small' : 'medium'}
          >
            View All Jobs
          </Button>
        </Box>

        <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
          {featuredJobs.map((job) => (
            <Grid key={job.id}>
              <JobCard 
                job={job}
                variant="featured"
                isSaved={savedJobs.some(j => j.id === job.id)}
                onSave={() => saveJob(job.id)}
                onUnsave={() => unsaveJob(job.id)}
                onApply={() => applyToJob(job.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            How Algohire Works
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[
              {
                title: 'Create Profile',
                description: 'Build your professional profile in minutes',
                icon: '👤'
              },
              {
                title: 'Find Jobs',
                description: 'Discover opportunities matching your skills',
                icon: '🔍'
              },
              {
                title: 'Apply Easily',
                description: 'One-click applications with your profile',
                icon: '🚀'
              },
              {
                title: 'Get Hired',
                description: 'Connect with top tech companies',
                icon: '💼'
              }
            ].map((item, index) => (
              <Grid   key={index}>
                <Paper elevation={0} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ mb: 2 }}>
                    {item.icon}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to take the next step in your career?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Join thousands of developers who found their dream jobs through Algohire
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/auth/register')}
            sx={{ px: 6 }}
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;