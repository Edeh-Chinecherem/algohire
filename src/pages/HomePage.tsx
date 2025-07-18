import React from 'react';
import {
  Box,
  Button,
  Container,
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

  const featuredJobs = filteredJobs.slice(0, 4).map(job => ({
    ...job,
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
    <Box sx={{ width: '100vw', overflowX: 'hidden' }}>
      {/* Hero Section - Full width */}
      <Box
        sx={{
          width: '100vw',
          minHeight: '60vh',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%)'
            : 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          px: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 'lg', px: { xs: 2, sm: 4 } }}>
          <Typography 
            variant={isMobile ? 'h3' : 'h2'} 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto'
            }}
          >
            Find Your Dream Tech Job
          </Typography>
          <Typography 
            variant={isMobile ? 'body1' : 'h5'} 
            component="p" 
            gutterBottom 
            sx={{ 
              mb: 4,
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto'
            }}
          >
            Join thousands of companies and developers using HireAlt to connect
          </Typography>
          
          <Box sx={{ 
            maxWidth: 800,
            mx: 'auto',
            px: { xs: 0, sm: 2 }
          }}>
            <SearchBar />
          </Box>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ 
              mt: 4,
              px: { xs: 1, sm: 0 }
            }}
          >
            {popularCategories.slice(0, isMobile ? 4 : 8).map((category) => (
              <Chip
                key={category}
                label={category}
                clickable
                sx={{ 
                  color: 'white', 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  m: 0.5,
                  fontSize: isMobile ? '0.75rem' : '0.875rem'
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Featured Jobs Section - Full width with constrained content */}
      <Box sx={{ 
        width: '100vw',
        py: { xs: 4, md: 8 },
        px: 0,
        bgcolor: 'background.default'
      }}>
        <Container maxWidth={false} sx={{ 
          maxWidth: 'lg',
          px: { xs: 2, sm: 4 }
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', sm: 'center' }, 
            mb: 4,
            gap: 2
          }}>
            <Typography variant={isMobile ? 'h5' : 'h4'} component="h2">
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

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: 3,
            width: '100%'
          }}>
            {featuredJobs.map((job) => (
              <Box key={job.id} sx={{ width: '100%' }}>
                <JobCard 
                  job={job}
                  variant="featured"
                  isSaved={savedJobs.some(j => j.id === job.id)}
                  onSave={() => saveJob(job.id)}
                  onUnsave={() => unsaveJob(job.id)}
                  onApply={() => applyToJob(job.id)}
                />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* How It Works Section - Full width */}
      <Box sx={{ 
        width: '100vw',
        py: { xs: 6, md: 10 },
        px: 0,
        bgcolor: 'background.paper'
      }}>
        <Container maxWidth={false} sx={{ 
          maxWidth: 'lg',
          px: { xs: 2, sm: 4 }
        }}>
          <Typography 
            variant={isMobile ? 'h5' : 'h4'} 
            component="h2" 
            align="center" 
            gutterBottom
          >
            How HireAlt Works
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: 3,
            mt: 4
          }}>
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
              <Paper 
                key={index} 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  height: '100%', 
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h3" sx={{ mb: 2 }}>
                  {item.icon}
                </Typography>
                <Typography variant={isMobile ? 'subtitle1' : 'h6'} gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Call to Action - Full width */}
      <Box sx={{ 
        width: '100vw',
        py: { xs: 8, md: 12 },
        px: 0,
        bgcolor: 'background.default',
        textAlign: 'center'
      }}>
        <Container maxWidth={false} sx={{ 
          maxWidth: 'md',
          px: { xs: 2, sm: 4 }
        }}>
          <Typography 
            variant={isMobile ? 'h5' : 'h4'} 
            component="h2" 
            gutterBottom
          >
            Ready to take the next step in your career?
          </Typography>
          <Typography 
            variant={isMobile ? 'body2' : 'body1'} 
            sx={{ mb: 4 }}
          >
            Join thousands of developers who found their dream jobs through HireAlt
          </Typography>
          <Button
            variant="contained"
            size={isMobile ? 'medium' : 'large'}
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