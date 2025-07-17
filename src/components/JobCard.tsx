import React from 'react'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Avatar,
  Divider,
} from '@mui/material'
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share,
  LocationOn,
  Work,
  AttachMoney,
  Schedule,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import type { Job } from '../types/types'

export interface JobCardProps {
  job: Job
  isSaved: boolean
  onSave: () => void
  onUnsave: () => void
  onApply: () => void
  variant?: 'default' | 'compact' | 'featured'
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  onSave,
  onUnsave,
  onApply,
  variant = 'default',
}) => {
  const handleSaveClick = () => {
    if (isSaved) {
      onUnsave()
    } else {
      onSave()
    }
  }

  const cardStyles =
    variant === 'compact'
      ? { p: 1 }
      : variant === 'featured'
        ? { border: '2px solid gold', boxShadow: 6 }
        : {}

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', ...cardStyles }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography
              variant="h5"
              component={Link}
              to={`/jobs/${job.id}`}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              {job.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {job.company}
            </Typography>
          </Box>
          <Avatar src={job.companyLogo} sx={{ width: 56, height: 56 }} alt={job.company} />
        </Box>

        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          <Chip icon={<LocationOn fontSize="small" />} label={job.location} size="small" variant="outlined" />
          <Chip icon={<Work fontSize="small" />} label={job.type} size="small" variant="outlined" />
          <Chip icon={<AttachMoney fontSize="small" />} label={`$${job.salary.toLocaleString()}`} size="small" variant="outlined" />
          <Chip icon={<Schedule fontSize="small" />} label={new Date(job.postedAt).toLocaleDateString()} size="small" variant="outlined" />
        </Box>

        <Typography variant="body2" paragraph>
          {job.description.substring(0, 200)}...
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
          {job.requirements.slice(0, 5).map((req, index) => (
            <Chip key={index} label={req} size="small" />
          ))}
          {job.requirements.length > 5 && (
            <Chip label={`+${job.requirements.length - 5} more`} size="small" />
          )}
        </Box>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Box>
          <IconButton onClick={handleSaveClick}>
            {isSaved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
          </IconButton>
          <IconButton>
            <Share />
          </IconButton>
        </Box>
        <Button variant="contained" onClick={onApply}>
          Apply Now
        </Button>
      </CardActions>
    </Card>
  )
}

export default JobCard
