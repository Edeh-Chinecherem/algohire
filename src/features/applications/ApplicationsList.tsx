import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  AccessTime,
  Email,
  Phone,
  Person,
  Work
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Application } from '../../types/types';

const statusIcons = {
  applied: <AccessTime color="info" />,
  'under-review': <Email color="primary" />,
  interview: <Phone color="secondary" />,
  offer: <Work color="success" />,
  hired: <CheckCircle color="success" />,
  rejected: <Cancel color="error" />,
  withdrawn: <Cancel color="action" />
};

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  applied: 'info',
  'under-review': 'primary',
  interview: 'secondary',
  offer: 'success',
  hired: 'success',
  rejected: 'error',
  withdrawn: 'default'
};

const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '101',
    userId: 'user1',
    status: 'under-review',
    appliedAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-05-16T14:20:00Z',
    coverLetter: 'I am excited to apply for this position...',
    resumeUrl: '/resumes/user1.pdf',
    notes: 'Strong background in React',
    candidate: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    job: {
      id: '101',
      title: 'Frontend Developer',
      company: 'Tech Corp',
      companyId: 'comp123',
      location: 'Remote',
      remote: true,
      salary: 90000,
      salaryCurrency: 'USD',
      salaryPeriod: 'year',
      type: 'full-time',
      status: 'active',
      postedAt: '2023-05-01T00:00:00Z',
      expiresAt: '2023-06-01T00:00:00Z',
      description: 'Develop UI components in React',
      responsibilities: ['Build UI', 'Fix bugs'],
      requirements: ['2+ years React', 'TypeScript knowledge'],
      benefits: ['Remote work', 'Health insurance'],
      skills: ['React', 'TypeScript', 'JavaScript'],
      experienceLevel: 'mid',
      educationLevel: 'bachelor',
      applicantsCount: 50,
      viewsCount: 200
    }
  }
];

const ApplicationsList: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5">Applications</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined">Export</Button>
          <Button variant="outlined">Filter</Button>
        </Stack>
      </Box>

      {/* Application List */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate</TableCell>
              <TableCell>Job Position</TableCell>
              <TableCell>Applied On</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar src={application.candidate?.avatar} sx={{ mr: 2 }} />
                    <Box>
                      <Typography>{application.candidate?.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {application.candidate?.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography>{application.job?.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {application.job?.company}
                  </Typography>
                </TableCell>
                <TableCell>
                  {new Date(application.appliedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip
                    icon={statusIcons[application.status]}
                    label={application.status.replace('-', ' ')}
                    color={statusColors[application.status]}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => navigate(`/applications/${application.id}`)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mt: 2 }} columns={{ xs: 12, sm: 6, md: 4 }}>
        {[
          { title: 'Total Applications', value: 24, icon: <Person /> },
          { title: 'Under Review', value: 8, icon: <Email /> },
          { title: 'Interview Stage', value: 5, icon: <Phone /> },
          { title: 'Hired', value: 3, icon: <CheckCircle /> }
        ].map((stat, index) => (
          <Grid key={index}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4">{stat.value}</Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.primary.main
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ApplicationsList;
