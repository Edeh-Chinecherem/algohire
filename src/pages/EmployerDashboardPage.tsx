import React from 'react'
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  Grid,
  Avatar,
  Divider,
} from '@mui/material'
import { Add, Work, People, Assessment } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import JobList from '../features/jobs/JobList'
import ApplicationsList from '../features/applications/ApplicationsList'

const EmployerDashboardPage: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setTabValue(newValue)
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Employer Dashboard</Typography>
        <Button
          component={Link}
          to="/jobs/new"
          variant="contained"
          startIcon={<Add />}
        >
          Post New Job
        </Button>
      </Box>

      <Grid container spacing={4} columns={{ xs: 12, sm: 12, md: 12 }}>
        <Grid>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
              <Avatar
                sx={{ width: 80, height: 80, mb: 2 }}
                src="https://randomuser.me/api/portraits/women/2.jpg"
              />
              <Typography variant="h6">Acme Inc.</Typography>
              <Typography variant="body2" color="text.secondary">
                Employer
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Button
                fullWidth
                startIcon={<Work />}
                sx={{ justifyContent: 'flex-start' }}
                onClick={() => setTabValue(0)}
              >
                My Jobs
              </Button>
              <Button
                fullWidth
                startIcon={<People />}
                sx={{ justifyContent: 'flex-start' }}
                onClick={() => setTabValue(1)}
              >
                Applications
              </Button>
              <Button
                fullWidth
                startIcon={<Assessment />}
                sx={{ justifyContent: 'flex-start' }}
                onClick={() => setTabValue(2)}
              >
                Analytics
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid>
          <Paper sx={{ p: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="My Jobs" />
              <Tab label="Applications" />
              <Tab label="Analytics" />
            </Tabs>

            {tabValue === 0 && <JobList />}
            {tabValue === 1 && <ApplicationsList />}
            {tabValue === 2 && (
              <Box>
                <Typography variant="h6">Coming Soon</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default EmployerDashboardPage