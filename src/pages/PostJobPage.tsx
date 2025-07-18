import { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  MenuItem, 
  Chip,
  Grid,
  Alert
} from '@mui/material';
import { useJobStore } from '../store/jobStore';

type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
type JobStatus = 'draft' | 'published' | 'closed' | 'archived';
type SalaryPeriod = 'year' | 'month' | 'hour';
type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead';
type EducationLevel = 'high-school' | 'associate' | 'bachelor' | 'master' | 'phd';

interface Job {
  id?: string;
  title: string;
  company: string;
  companyId: string;
  companyLogo?: string;
  location: string;
  remote: boolean;
  salary: number;
  salaryCurrency: string;
  salaryPeriod: SalaryPeriod;
  type: JobType;
  status?: JobStatus;
  postedAt?: string;
  expiresAt?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
  experienceLevel: ExperienceLevel;
  educationLevel?: EducationLevel;
  applicantsCount?: number;
  viewsCount?: number;
}

export default function PostJobPage() {
  const [job, setJob] = useState<Omit<Job, 'id' | 'postedAt' | 'status' | 'applicantsCount' | 'viewsCount' | 'companyLogo'>>({
    title: '',
    company: '',
    companyId: 'comp-123', // Should come from auth context
    location: '',
    remote: false,
    salary: 0,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    type: 'full-time',
    description: '',
    responsibilities: [],
    requirements: [],
    benefits: [],
    skills: [],
    experienceLevel: 'mid',
    educationLevel: 'bachelor',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  });

  const [responsibility, setResponsibility] = useState('');
  const [requirement, setRequirement] = useState('');
  const [benefit, setBenefit] = useState('');
  const [skill, setSkill] = useState('');
  const [error, setError] = useState('');
  const { addJob } = useJobStore();

  const validateForm = () => {
    if (!job.title.trim()) return 'Job title is required';
    if (!job.company.trim()) return 'Company name is required';
    if (!job.location.trim()) return 'Location is required';
    if (job.salary <= 0) return 'Salary must be greater than 0';
    if (!job.description.trim()) return 'Description is required';
    if (job.requirements.length === 0) return 'At least one requirement is needed';
    if (job.responsibilities.length === 0) return 'At least one responsibility is required';
    if (job.skills.length === 0) return 'At least one skill is required';
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    
    addJob({
      ...job,
      id: Date.now().toString(),
      postedAt: new Date().toISOString(),
      status: 'published'
    } as Job);
    
    // Reset form after submission
    setJob({
      title: '',
      company: '',
      companyId: 'comp-123',
      location: '',
      remote: false,
      salary: 0,
      salaryCurrency: 'USD',
      salaryPeriod: 'year',
      type: 'full-time',
      description: '',
      responsibilities: [],
      requirements: [],
      benefits: [],
      skills: [],
      experienceLevel: 'mid',
      educationLevel: 'bachelor',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  };

  const addResponsibility = () => {
    if (responsibility.trim()) {
      setJob(prev => ({
        ...prev,
        responsibilities: [...prev.responsibilities, responsibility]
      }));
      setResponsibility('');
    }
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
        skills: [...prev.skills, skill]
      }));
      setSkill('');
    }
  };

  const removeItem = (key: 'responsibilities' | 'requirements' | 'benefits' | 'skills', index: number) => {
    setJob(prev => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index)
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Post a New Job</Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3} columns={{xs:12,md:6}}>
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

        {/* Location */}
        <Grid>
          <TextField
            fullWidth
            label="Location"
            value={job.location}
            onChange={(e) => setJob({...job, location: e.target.value})}
            required
          />
        </Grid>

        {/* Remote */}
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
            value={job.salary || ''}
            onChange={(e) => setJob({...job, salary: Number(e.target.value)})}
            required
            inputProps={{ min: 0 }}
          />
        </Grid>

        {/* Salary Currency */}
        <Grid>
          <TextField
            select
            fullWidth
            label="Currency"
            value={job.salaryCurrency}
            onChange={(e) => setJob({...job, salaryCurrency: e.target.value})}
            required
          >
            <MenuItem value="USD">USD ($)</MenuItem>
            <MenuItem value="EUR">EUR (€)</MenuItem>
            <MenuItem value="GBP">GBP (£)</MenuItem>
            <MenuItem value="JPY">JPY (¥)</MenuItem>
            <MenuItem value="CAD">CAD ($)</MenuItem>
          </TextField>
        </Grid>

        {/* Salary Period */}
        <Grid>
          <TextField
            select
            fullWidth
            label="Salary Period"
            value={job.salaryPeriod}
            onChange={(e) => setJob({...job, salaryPeriod: e.target.value as SalaryPeriod})}
            required
          >
            <MenuItem value="year">Per Year</MenuItem>
            <MenuItem value="month">Per Month</MenuItem>
            <MenuItem value="hour">Per Hour</MenuItem>
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
            <MenuItem value="internship">Internship</MenuItem>
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
            <MenuItem value="entry">Entry Level</MenuItem>
            <MenuItem value="mid">Mid Level</MenuItem>
            <MenuItem value="senior">Senior Level</MenuItem>
            <MenuItem value="lead">Lead/Manager</MenuItem>
          </TextField>
        </Grid>

        {/* Education Level */}
        <Grid>
          <TextField
            select
            fullWidth
            label="Education Level"
            value={job.educationLevel || ''}
            onChange={(e) => setJob({...job, educationLevel: e.target.value as EducationLevel})}
          >
            <MenuItem value="high-school">High School</MenuItem>
            <MenuItem value="associate">Associate Degree</MenuItem>
            <MenuItem value="bachelor">Bachelor's Degree</MenuItem>
            <MenuItem value="master">Master's Degree</MenuItem>
            <MenuItem value="phd">PhD</MenuItem>
          </TextField>
        </Grid>

        {/* Expiration Date */}
        <Grid>
          <TextField
            fullWidth
            label="Expiration Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={job.expiresAt?.split('T')[0] || ''}
            onChange={(e) => setJob({...job, expiresAt: new Date(e.target.value).toISOString()})}
          />
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

        {/* Responsibilities */}
        <Grid>
          <Typography variant="h6" gutterBottom>Responsibilities</Typography>
          <Box sx={{ mb: 2 }}>
            {job.responsibilities.map((item, index) => (
              <Chip
                key={index}
                label={item}
                onDelete={() => removeItem('responsibilities', index)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Add Responsibility"
              value={responsibility}
              onChange={(e) => setResponsibility(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addResponsibility()}
            />
            <Button 
              variant="contained" 
              onClick={addResponsibility}
              disabled={!responsibility.trim()}
            >
              Add
            </Button>
          </Box>
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
              onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
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
              onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
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
        <Grid>
          <Typography variant="h6" gutterBottom>Skills Required</Typography>
          <Box sx={{ mb: 2 }}>
            {job.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => removeItem('skills', index)}
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
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
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
        <Grid>
          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Post Job
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}