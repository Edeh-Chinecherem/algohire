// User Types
export type UserRole = 'candidate' | 'employer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Job Types
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
export type JobStatus = 'active' | 'paused' | 'closed' | 'draft';
export type ExperienceLevel = 'entry-level' | 'mid-level' | 'senior';
export type SalaryCurrency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD';

export interface Job {
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

export interface JobFilterParams {
  search?: string;
  location?: string;
  remote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  type?: JobType[];
  experienceLevel?: string[];
  skills?: string[];
  sortBy?: 'newest' | 'salary-high' | 'salary-low' | 'relevant';
  page?: number;
  limit?: number;
}

// Application Types
export type ApplicationStatus = 
  | 'applied'
  | 'under-review'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'rejected'
  | 'withdrawn';

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
  coverLetter?: string;
  resumeUrl?: string;
  notes?: string;
  feedback?: string;
  candidate: {
    name: string;
    email: string;
    avatar?: string;
  };
  job: Job;
}

// Company Types
export interface Company {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  industry?: string;
  size?: '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
  foundedYear?: number;
  headquarters?: string;
  locations?: string[];
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    github?: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  statusCode: number;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  remote: boolean;
  salary: number;
  salaryCurrency: string;
  type: JobType;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
}

// UI Component Props
export interface JobCardProps {
  job: Job;
  isSaved?: boolean;
  onSave?: (jobId: string) => void;
  onUnsave?: (jobId: string) => void;
  onApply?: (jobId: string) => void;
  variant?: 'default' | 'compact' | 'featured';
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

// Search Types
export interface SearchSuggestion {
  type: 'job' | 'company' | 'skill';
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
}

// Analytics Types
export interface JobAnalytics {
  views: number;
  applications: number;
  saves: number;
  applicationSources: {
    direct: number;
    jobBoard: number;
    referral: number;
  };
  statusDistribution: Record<ApplicationStatus, number>;
}

export interface UserAnalytics {
  jobViews: number;
  applications: number;
  savedJobs: number;
  applicationStatus: Record<ApplicationStatus, number>;
}