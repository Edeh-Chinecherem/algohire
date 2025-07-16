import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type JobType = 'full-time' | 'part-time' | 'contract' | 'remote'

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: number
  type: JobType
  postedAt: string
  description: string
  requirements: string[]
  companyLogo?: string
}

interface JobState {
  jobs: Job[]
  filteredJobs: Job[]
  savedJobs: Job[]
  appliedJobs: Job[]
  filters: {
    search: string
    location: string
    salaryRange: [number, number]
    jobType: JobType[]
  }
  setJobs: (jobs: Job[]) => void
  setFilters: (filters: Partial<JobState['filters']>) => void
  saveJob: (jobId: string) => void
  unsaveJob: (jobId: string) => void
  applyToJob: (jobId: string) => void
  resetFilters: () => void
  addJob: (job: Omit<Job, 'id' | 'postedAt'>) => void
}

export const useJobStore = create<JobState>()(
  devtools(
    persist(
      (set, get) => ({
        jobs: [],
        filteredJobs: [],
        savedJobs: [],
        appliedJobs: [],
        filters: {
          search: '',
          location: '',
          salaryRange: [0, 200000],
          jobType: [],
        },
        setJobs: (jobs) => set({ jobs, filteredJobs: jobs }),
        setFilters: (filters) =>
          set((state) => {
            const newFilters = { ...state.filters, ...filters }
            const filteredJobs = state.jobs.filter((job) => {
              const matchesSearch = job.title
                .toLowerCase()
                .includes(newFilters.search.toLowerCase()) ||
                job.company.toLowerCase().includes(newFilters.search.toLowerCase()) ||
                job.description.toLowerCase().includes(newFilters.search.toLowerCase())

              const matchesLocation = newFilters.location
                ? job.location.toLowerCase().includes(newFilters.location.toLowerCase())
                : true

              const matchesSalary = job.salary >= newFilters.salaryRange[0] &&
                job.salary <= newFilters.salaryRange[1]

              const matchesJobType = newFilters.jobType.length > 0
                ? newFilters.jobType.includes(job.type)
                : true

              return matchesSearch && matchesLocation && matchesSalary && matchesJobType
            })
            return { filters: newFilters, filteredJobs }
          }),
        saveJob: (jobId) =>
          set((state) => {
            const job = state.jobs.find((j) => j.id === jobId)
            if (!job || state.savedJobs.some((j) => j.id === jobId)) return state
            return { savedJobs: [...state.savedJobs, job] }
          }),
        unsaveJob: (jobId) =>
          set((state) => ({
            savedJobs: state.savedJobs.filter((job) => job.id !== jobId),
          })),
        applyToJob: (jobId) =>
          set((state) => {
            const job = state.jobs.find((j) => j.id === jobId)
            if (!job || state.appliedJobs.some((j) => j.id === jobId)) return state
            return { appliedJobs: [...state.appliedJobs, job] }
          }),
        resetFilters: () =>
          set((state) => ({
            filters: {
              search: '',
              location: '',
              salaryRange: [0, 200000],
              jobType: [],
            },
            filteredJobs: state.jobs,
          })),
        addJob: (job) =>
          set((state) => {
            const newJob: Job = {
              ...job,
              id: Math.random().toString(36).substring(2, 9),
              postedAt: new Date().toISOString(),
            }
            return { jobs: [...state.jobs, newJob], filteredJobs: [...state.filteredJobs, newJob] }
          }),
      }),
      {
        name: 'job-storage',
        partialize: (state) => ({
          savedJobs: state.savedJobs,
          appliedJobs: state.appliedJobs,
        }),
      }
    )
  )
)