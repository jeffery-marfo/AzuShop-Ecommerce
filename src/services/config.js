// import axios from 'axios';

// export const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL || '/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

///////////////////////////

// import axios from 'axios';

// export const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000, // 10 second timeout
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor for better error handling
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.code === 'ERR_NETWORK') {
//       console.error('Network Error: Please check if the backend server is running');
//     }
//     return Promise.reject(error);
//   }
// );

///////////////////////////////

import axios from 'axios';

// Determine the base URL based on environment
const getBaseURL = () => {
  // Check if a custom API URL is provided via environment variable
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // In development, use the Vite proxy to avoid CORS issues
  if (import.meta.env.DEV) {
    return '/api';
  }
  
  // In production, use the live backend URL directly
  return 'https://azushop-backend.onrender.com/api';
};

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout for Render.com
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error: Please check if the backend server is running');
    }
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // You can dispatch a logout action here if using state management
    }
    
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });
    
    return Promise.reject(error);
  }
);