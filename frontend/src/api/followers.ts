import axios from 'axios';
import { SocialMediaRequest, SocialMediaResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFollowers = async (request: SocialMediaRequest): Promise<SocialMediaResponse> => {
  try {
    const response = await api.post('/followers', request);
    return response.data;
  } catch (error) {
    console.error('Error fetching followers:', error);
    throw error;
  }
};

export const healthCheck = async (): Promise<{ status: string }> => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

// Mock API for waitlist
export const submitWaitlist = async (email: string): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (!email || !email.includes('@')) {
    throw new Error('Invalid email address');
  }
  
  // Simulate success/failure
  if (Math.random() > 0.1) { // 90% success rate
    return { success: true };
  } else {
    throw new Error('Failed to join waitlist. Please try again.');
  }
}; 