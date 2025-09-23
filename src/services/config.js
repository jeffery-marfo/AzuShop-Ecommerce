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

// When using Vite proxy, we don't need the full URL
// The proxy will handle forwarding /api requests to localhost:5000
export const apiClient = axios.create({
  baseURL: '/api', // This will use the Vite proxy
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
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
      console.error('Network Error: Please check if the backend server is running on port 5000');
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