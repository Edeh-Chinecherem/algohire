import { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  MenuItem, 
  Chip,
  Grid
} from '@mui/material';
import { useJobStore } from '../store/jobStore';

type JobType = 'full-time' | 'part-time' | 'contract' | 'remote';
type ExperienceLevel = 'entry-level' | 'mid-level' | 'senior';
type SalaryCurrency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD';

interface Job {
  id?: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  salaryCurrency: SalaryCurrency;
  type: JobType;
  description: string;
  requirements: string[];
  postedAt?: Date;
  status?: string;
  remote: boolean;
  experienceLevel: ExperienceLevel;
  companyId: string;
  benefits: string[];
  skillsRequired: string[];
  applicationDeadline?: Date;
}

export default function PostJobPage() {

  const [job, setJob] = useState<Omit<Job, 'id' | 'postedAt' | 'status' | 'applicationDeadline'>>({
    title: '',
    company: '',
    location: '',
    salary: 0,
    salaryCurrency: 'USD',
    type: 'full-time',
    description: '',
    requirements: [],
    remote: false,
    experienceLevel: 'mid-level',
    companyId: 'comp-123', // Should come from auth context
    benefits: [],
    skillsRequired: []
  });

  const [requirement, setRequirement] = useState('');
  const [benefit, setBenefit] = useState('');
  const [skill, setSkill] = useState('');
  const { addJob } = useJobStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJob({
      ...job,
      id: Date.now().toString(),
      postedAt: new Date(),
      status: 'active'
    } as Job);
  };

  const addRequirement = () => {
    if (requirement.trim()) {
      setJob(prev => ({
        ...prev,
        requirements: [...prev.requirements, requirement]
      }));
      setRequirement('');
    }
  };

  const addBenefit = () => {
    if (benefit.trim()) {
      setJob(prev => ({
        ...prev,
        benefits: [...prev.benefits, benefit]
      }));
      setBenefit('');
    }
  };

  const addSkill = () => {
    if (skill.trim()) {
      setJob(prev => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, skill]
      }));
      setSkill('');
    }
  };

  const removeItem = (key: 'requirements' | 'benefits' | 'skillsRequired', index: number) => {
    setJob(prev => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index)
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Post a New Job</Typography>
      
      <Grid container spacing={3} columns={{ xs: 12, md: 12 }}>
        {/* Title */}
        <Grid>
          <TextField
            fullWidth
            label="Job Title"
            value={job.title}
            onChange={(e) => setJob({...job, title: e.target.value})}
            required
          />
        </Grid>

        {/* Company */}
        <Grid>
          <TextField
            fullWidth
            label="Company"
            value={job.company}
            onChange={(e) => setJob({...job, company: e.target.value})}
            required
          />
        </Grid>


        <Grid>
          <TextField
            fullWidth
            label="Location"
            value={job.location}
            onChange={(e) => setJob({...job, location: e.target.value})}
            required
          />
        </Grid>

        
        <Grid>
          <TextField
            select
            fullWidth
            label="Remote"
            value={job.remote ? 'yes' : 'no'}
            onChange={(e) => setJob({...job, remote: e.target.value === 'yes'})}
            required
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </TextField>
        </Grid>

        {/* Salary */}
        <Grid>
          <TextField
            fullWidth
            label="Salary"
            type="number"
            value={job.salary}
            onChange={(e) => setJob({...job, salary: Number(e.target.value)})}
            required
          />
        </Grid>

        {/* Salary Currency */}
        <Grid>
          <TextField
            select
            fullWidth
            label="Currency"
            value={job.salaryCurrency}
            onChange={(e) => setJob({...job, salaryCurrency: e.target.value as SalaryCurrency})}
            required
          >
            <MenuItem value="USD">USD ($)</MenuItem>
            <MenuItem value="EUR">EUR (€)</MenuItem>
            <MenuItem value="GBP">GBP (£)</MenuItem>
            <MenuItem value="JPY">JPY (¥)</MenuItem>
            <MenuItem value="CAD">CAD ($)</MenuItem>
          </TextField>
        </Grid>

        {/* Job Type */}
        <Grid>
          <TextField
            select
            fullWidth
            label="Job Type"
            value={job.type}
            onChange={(e) => setJob({...job, type: e.target.value as JobType})}
            required
          >
            <MenuItem value="full-time">Full-time</MenuItem>
            <MenuItem value="part-time">Part-time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
          </TextField>
        </Grid>

        {/* Experience Level */}
        <Grid>
          <TextField
            select
            fullWidth
            label="Experience Level"
            value={job.experienceLevel}
            onChange={(e) => setJob({...job, experienceLevel: e.target.value as ExperienceLevel})}
            required
          >
            <MenuItem value="entry-level">Entry Level</MenuItem>
            <MenuItem value="mid-level">Mid Level</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
          </TextField>
        </Grid>

        {/* Description */}
        <Grid>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Job Description"
            value={job.description}
            onChange={(e) => setJob({...job, description: e.target.value})}
            required
          />
        </Grid>

        {/* Requirements */}
        <Grid>
          <Typography variant="h6" gutterBottom>Requirements</Typography>
          <Box sx={{ mb: 2 }}>
            {job.requirements.map((req, index) => (
              <Chip
                key={index}
                label={req}
                onDelete={() => removeItem('requirements', index)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Add Requirement"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
            />
            <Button 
              variant="contained" 
              onClick={addRequirement}
              disabled={!requirement.trim()}
            >
              Add
            </Button>
          </Box>
        </Grid>

        {/* Benefits */}
        <Grid>
          <Typography variant="h6" gutterBottom>Benefits</Typography>
          <Box sx={{ mb: 2 }}>
            {job.benefits.map((benefit, index) => (
              <Chip
                key={index}
                label={benefit}
                onDelete={() => removeItem('benefits', index)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Add Benefit"
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
            />
            <Button 
              variant="contained" 
              onClick={addBenefit}
              disabled={!benefit.trim()}
            >
              Add
            </Button>
          </Box>
        </Grid>

        {/* Skills */}
        <Grid >
          <Typography variant="h6" gutterBottom>Skills Required</Typography>
          <Box sx={{ mb: 2 }}>
            {job.skillsRequired.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => removeItem('skillsRequired', index)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Add Skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
            <Button 
              variant="contained" 
              onClick={addSkill}
              disabled={!skill.trim()}
            >
              Add
            </Button>
          </Box>
        </Grid>

        {/* Submit Button */}
        <Grid >
          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            fullWidth
          >
            Post Job
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}