// src/services/axiosInstance.ts
import axios from 'axios';

// Create a pre-configured Axios instance to be reused across the app
const axiosInstance = axios.create({
  // Base URL for all API requests (points to local development server)
  baseURL: 'http://localhost:5000/api',

  // Set default headers for all requests
  headers: {
    'Content-Type': 'application/json',
  },

  // Set a request timeout (e.g., 10 seconds)
  timeout: 10000,
});

// You can add interceptors here later (e.g., for attaching tokens or handling errors)

export default axiosInstance;
