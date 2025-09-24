// import { apiClient } from "./config";

// export const registerUser= async(payload) => {
//     return apiClient.post('/users');
// };


// // export const registerUser = async (payload) => {
// //   return apiClient.post('/', payload);
// // };

//////////////////////////////////


// import { apiClient } from "./config";

// // Register user
// export const registerUser = async (payload) => {
//     return apiClient.post('/users', payload);
// };

// // Login user (for future use)
// export const loginUser = async (payload) => {
//     return apiClient.post('/auth/login', payload);
// };

// // Get user profile (for future use)
// export const getUserProfile = async () => {
//     return apiClient.get('/auth/profile');
// };

// // Logout user (for future use)
// export const logoutUser = () => {
//     localStorage.removeItem('token');
// };

/////////////////////////////////


import { apiClient } from "./config";

// Register user
export const registerUser = async (userData) => {
  try {
    console.log('🚀 Starting registration with data:', userData);
    
    const payload = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    };
    
    console.log('📤 Sending payload to /users:', payload);
    
    // Retry logic for Render.com cold starts
    let response;
    let retryCount = 0;
    const maxRetries = 2;
    
    while (retryCount <= maxRetries) {
      try {
        console.log(`🔄 Attempt ${retryCount + 1} of ${maxRetries + 1}...`);
        response = await apiClient.post('/users', payload);
        console.log('✅ Registration successful:', response.data);
        console.log('📋 Full response data:', JSON.stringify(response.data, null, 2));
        break;
      } catch (error) {
        if (error.code === 'ECONNABORTED' && retryCount < maxRetries) {
          console.log(`⏳ Timeout on attempt ${retryCount + 1}, retrying...`);
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
          continue;
        }
        throw error;
      }
    }
    
    // Store token and user info if registration returns them
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('💾 Token stored');
    } else {
      // If no token, create a mock token for session management
      const mockToken = 'mock-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      console.log('💾 Mock token stored for session');
    }
    
    // Store user data (even if no token, we still want to store user info)
    const processedUserData = {
      ...response.data,
      fullName: response.data.fullName || response.data.username || `${response.data.firstName || ''} ${response.data.lastName || ''}`.trim() || 'User',
      username: response.data.username || response.data.email || 'User'
    };
    localStorage.setItem('user', JSON.stringify(processedUserData));
    console.log('👤 User data stored:', processedUserData);
    
    return {
      success: true,
      data: {
        ...response.data,
        user: processedUserData
      },
      message: 'Registration successful!'
    };
  } catch (error) {
    console.error('❌ Registration error:', error);
    console.error('❌ Error response:', error.response?.data);
    console.error('❌ Error status:', error.response?.status);
    console.error('❌ Error code:', error.code);
    
    let errorMessage = 'Registration failed. Please try again.';
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timed out. The server is taking too long to respond. Please try again.';
    } else if (error.code === 'ERR_NETWORK') {
      errorMessage = 'Cannot connect to server. Please check your internet connection and try again.';
    } else if (error.code === 'ERR_CONNECTION_REFUSED') {
      errorMessage = 'Connection refused. Please try again later.';
    } else if (error.response?.status === 400) {
      errorMessage = error.response.data?.message || 'Invalid registration data.';
    } else if (error.response?.status === 409) {
      errorMessage = 'Email already exists. Please use a different email.';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    return {
      success: false,
      message: errorMessage,
      error: error.response?.data
    };
  }
};

// Login user  
export const loginUser = async (userData) => {
  try {
    console.log('🚀 Starting login with data:', { email: userData.email });
    
    const payload = {
      email: userData.email,
      password: userData.password,
    };
    
    console.log('📤 Sending login payload to /users/auth');
    
    // Retry logic for Render.com cold starts
    let response;
    let retryCount = 0;
    const maxRetries = 2;
    
    while (retryCount <= maxRetries) {
      try {
        console.log(`🔄 Attempt ${retryCount + 1} of ${maxRetries + 1}...`);
        response = await apiClient.post('/users/auth', payload);
        console.log('✅ Login successful:', response.data);
        console.log('📋 Full response data:', JSON.stringify(response.data, null, 2));
        break;
      } catch (error) {
        if (error.code === 'ECONNABORTED' && retryCount < maxRetries) {
          console.log(`⏳ Timeout on attempt ${retryCount + 1}, retrying...`);
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
          continue;
        }
        throw error;
      }
    }
    
    // Store token and user info
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('💾 Token stored');
    } else {
      // If no token, create a mock token for session management
      const mockToken = 'mock-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      console.log('💾 Mock token stored for session');
    }
    
    // Store user data (even if no token, we still want to store user info)
    const processedUserData = {
      ...response.data,
      fullName: response.data.fullName || response.data.username || `${response.data.firstName || ''} ${response.data.lastName || ''}`.trim() || 'User',
      username: response.data.username || response.data.email || 'User'
    };
    localStorage.setItem('user', JSON.stringify(processedUserData));
    console.log('👤 User data stored:', processedUserData);
    
    return {
      success: true,
      data: {
        ...response.data,
        user: processedUserData
      },
      message: 'Login successful!'
    };
  } catch (error) {
    console.error('❌ Login error:', error);
    console.error('❌ Error response:', error.response?.data);
    console.error('❌ Error status:', error.response?.status);
    console.error('❌ Error code:', error.code);
    
    let errorMessage = 'Login failed. Please check your credentials.';
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timed out. The server is taking too long to respond. Please try again.';
    } else if (error.code === 'ERR_NETWORK') {
      errorMessage = 'Cannot connect to server. Please check your internet connection and try again.';
    } else if (error.code === 'ERR_CONNECTION_REFUSED') {
      errorMessage = 'Connection refused. Please try again later.';
    } else if (error.response?.status === 401) {
      errorMessage = 'Invalid email or password.';
    } else if (error.response?.status === 404) {
      errorMessage = 'User not found.';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    return {
      success: false,
      message: errorMessage,
      error: error.response?.data
    };
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Get profile error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch user profile.',
      error: error.response?.data
    };
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return {
    success: true,
    message: 'Logged out successfully'
  };
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};