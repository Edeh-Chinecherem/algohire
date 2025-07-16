import { rest } from 'msw'

const jobs = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'New York, NY',
    salary: 90000,
    type: 'full-time',
    postedAt: new Date().toISOString(),
    description: 'We are looking for a skilled frontend developer with experience in React and TypeScript to join our team.',
    requirements: ['3+ years of React experience', 'Proficient in TypeScript', 'Familiar with Material UI'],
    companyLogo: 'https://logo.clearbit.com/techcorp.com',
  },
  // Add more mock jobs...
]

export const handlers = [
  rest.get('/api/jobs', (req, res, ctx) => {
    return res(ctx.json(jobs))
  }),

  rest.get('/api/jobs/:id', (req, res, ctx) => {
    const { id } = req.params
    const job = jobs.find(j => j.id === id)
    return job ? res(ctx.json(job)) : res(ctx.status(404))
  }),

  rest.post('/api/jobs', (req, res, ctx) => {
    const newJob = {
      ...req.body,
      id: Math.random().toString(36).substring(2, 9),
      postedAt: new Date().toISOString(),
    }
    jobs.push(newJob)
    return res(ctx.json(newJob))
  }),
]