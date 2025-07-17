import { http, HttpResponse } from 'msw';
import type { JobStatus, JobType } from '../types/types';

interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  companyLogo?: string;
  location: string;
  remote: boolean;
  salary: number;
  salaryCurrency: string;
  salaryPeriod: 'year' | 'month' | 'hour';
  type: JobType;
  status: JobStatus;
  postedAt: string;
  expiresAt?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
  educationLevel?: 'high-school' | 'associate' | 'bachelor' | 'master' | 'phd';
  applicantsCount?: number;
  viewsCount?: number;
}

const jobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Corp',
    companyId: 'tc-001',
    location: 'New York, NY',
    companyLogo: 'https://logo.clearbit.com/techcorp.com',
    salary: 90000,
    salaryCurrency: 'USD',
    salaryPeriod: 'year',
    remote: true,
    type: 'full-time',
    status: 'active',
    postedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days later
    description:
      'We are looking for a skilled frontend developer with experience in React and TypeScript to join our team.',
    responsibilities: [
      'Build user interfaces with React',
      'Collaborate with backend team',
      'Maintain application performance'
    ],
    requirements: [
      '3+ years of React experience',
      'Proficient in TypeScript',
      'Familiar with Material UI'
    ],
    benefits: ['Health insurance', '401k', 'Remote work'],
    skills: ['React', 'TypeScript', 'Material UI'],
    experienceLevel: 'mid',
    educationLevel: 'bachelor',
    applicantsCount: 15,
    viewsCount: 150
  }
];

export const handlers = [
  http.get('/api/jobs', () => {
    return HttpResponse.json(jobs);
  }),

  http.get('/api/jobs/:id', ({ params }) => {
    const { id } = params as { id: string };
    const job = jobs.find((j) => j.id === id);
    return job
      ? HttpResponse.json(job)
      : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),

  http.post('/api/jobs', async ({ request }) => {
    const body = (await request.json()) as Omit<Job, 'id' | 'postedAt'>;
    const newJob: Job = {
      ...body,
      id: Math.random().toString(36).substring(2, 9),
      postedAt: new Date().toISOString()
    };
    jobs.push(newJob);
    return HttpResponse.json(newJob, { status: 201 });
  })
];

export default handlers;
