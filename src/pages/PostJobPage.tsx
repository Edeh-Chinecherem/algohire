import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Divider,
  Chip,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useJobStore } from '../store/jobStore'

const PostJobPage: React.FC = () => {
  const navigate = useNavigate()
  const { addJob } = useJobStore()

  const validationSchema = Yup.object({
    title: Yup.string().required('Job title is required'),
    company: Yup.string().required('Company name is required'),
    location: Yup.string().required('Location is required'),
    salary: Yup.number().required('Salary is required').min(0),
    type: Yup.string().required('Job type is required'),
    description: Yup.string().required('Description is required'),
    requirements: Yup.array().min(1, 'At least one requirement is required'),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      company: '',
      location: '',
      salary: 0,
      type: 'full-time',
      description: '',
      requirements: [] as string[],
      newRequirement: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const jobData = {
        title: values.title,
        company: values.company,
        location: values.location,
        salary: values.salary,
        type: values.type as 'full-time' | 'part-time' | 'contract' | 'remote',
        description: values.description,
        requirements: values.requirements,
      }
      addJob(jobData)
      navigate('/employer/dashboard')
    },
  })

  const handleAddRequirement = () => {
    if (formik.values.newRequirement.trim()) {
      formik.setFieldValue('requirements', [
        ...formik.values.requirements,
        formik.values.newRequirement.trim(),
      ])
      formik.setFieldValue('newRequirement', '')
    }
  }

  const handleRemoveRequirement = (index: number) => {
    const newRequirements = [...formik.values.requirements]
    newRequirements.splice(index, 1)
    formik.setFieldValue('requirements', newRequirements)
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Post a New Job
      </Typography>

      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Job Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="company"
                name="company"
                label="Company Name"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.company && Boolean(formik.errors.company)}
                helperText={formik.touched.company && formik.errors.company}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="location"
                name="location"
                label="Location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="salary"
                name="salary"
                label="Salary"
                type="number"
                value={formik.values.salary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.salary && Boolean(formik.errors.salary)}
                helperText={formik.touched.salary && formik.errors.salary}
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="type"
                name="type"
                label="Job Type"
                select
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              >
                <MenuItem value="full-time">Full-time</MenuItem>
                <MenuItem value="part-time">Part-time</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
                <MenuItem value="remote">Remote</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Job Description"
                multiline
                rows={6}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

            <Grid item xs={12}>
              <Box mb={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Requirements
                </Typography>
                <Box display="flex" gap={1} mb={1} flexWrap="wrap">
                  {formik.values.requirements.map((req, index) => (
                    <Chip
                      key={index}
                      label={req}
                      onDelete={() => handleRemoveRequirement(index)}
                    />
                  ))}
                </Box>
                {formik.touched.requirements && formik.errors.requirements && (
                  <Typography color="error" variant="body2">
                    {formik.errors.requirements}
                  </Typography>
                )}
              </Box>

              <Box display="flex" gap={1}>
                <TextField
                  fullWidth
                  id="newRequirement"
                  name="newRequirement"
                  label="Add Requirement"
                  value={formik.values.newRequirement}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddRequirement()
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={handleAddRequirement}
                >
                  Add
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              onClick={() => navigate('/employer/dashboard')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Post Job
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default PostJobPage