import axios from 'axios'
import type { Job } from '../types/types'

const API_URL = 'http://localhost:3000/api' // Replace with your actual API URL

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get(`${API_URL}/jobs`)
    return response.data
  } catch (error) {
    console.error('Error fetching jobs:', error)
    throw error
  }
}

export const fetchJobById = async (id: string): Promise<Job> => {
  try {
    const response = await axios.get(`${API_URL}/jobs/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching job with id ${id}:`, error)
    throw error
  }
}

export const postJob = async (job: Omit<Job, 'id' | 'postedAt'>): Promise<Job> => {
  try {
    const response = await axios.post(`${API_URL}/jobs`, job)
    return response.data
  } catch (error) {
    console.error('Error posting job:', error)
    throw error
  }
}