import { apiClient } from "./config";

// Create a new product
export const createProduct = async (productData) => {
  try {
    console.log('🚀 Starting product creation with data:', productData);
    
    // Create FormData for multipart/form-data request
    const formData = new FormData();
    
    // Add all the required fields
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('quantity', productData.quantity);
    formData.append('brand', productData.brand);
    
    // Handle image upload if provided
    if (productData.image && productData.image instanceof File) {
      formData.append('image', productData.image);
    } else if (productData.image) {
      // If it's a string (URL or base64), we might need to handle it differently
      formData.append('image', productData.image);
    }
    
    console.log('📤 Sending product data to /products');
    
    // Retry logic for Render.com cold starts
    let response;
    let retryCount = 0;
    const maxRetries = 2;
    
    while (retryCount <= maxRetries) {
      try {
        console.log(`🔄 Attempt ${retryCount + 1} of ${maxRetries + 1}...`);
        
        // Use a custom config for FormData to avoid JSON headers
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...apiClient.defaults.headers.common
          }
        };
        
        response = await apiClient.post('/products', formData, config);
        console.log('✅ Product creation successful:', response.data);
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
    
    return {
      success: true,
      data: response.data,
      message: 'Product created successfully!'
    };
  } catch (error) {
    console.error('❌ Product creation error:', error);
    console.error('❌ Error response:', error.response?.data);
    console.error('❌ Error status:', error.response?.status);
    console.error('❌ Error code:', error.code);
    
    let errorMessage = 'Product creation failed. Please try again.';
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timed out. The server is taking too long to respond. Please try again.';
    } else if (error.code === 'ERR_NETWORK') {
      errorMessage = 'Cannot connect to server. Please check your internet connection and try again.';
    } else if (error.code === 'ERR_CONNECTION_REFUSED') {
      errorMessage = 'Connection refused. Please try again later.';
    } else if (error.response?.status === 400) {
      errorMessage = error.response.data?.message || 'Invalid product data.';
    } else if (error.response?.status === 401) {
      errorMessage = 'Unauthorized. Please log in as admin.';
    } else if (error.response?.status === 403) {
      errorMessage = 'Forbidden. Admin access required.';
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

// Get all products
export const getProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Get products error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch products.',
      error: error.response?.data
    };
  }
};

// Get product by ID
export const getProductById = async (productId) => {
  try {
    const response = await apiClient.get(`/products/${productId}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Get product error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch product.',
      error: error.response?.data
    };
  }
};

// Update product
export const updateProduct = async (productId, productData) => {
  try {
    console.log('🚀 Starting product update with data:', productData);
    
    // Create FormData for multipart/form-data request
    const formData = new FormData();
    
    // Add all the fields that are being updated
    if (productData.name) formData.append('name', productData.name);
    if (productData.description) formData.append('description', productData.description);
    if (productData.price) formData.append('price', productData.price);
    if (productData.category) formData.append('category', productData.category);
    if (productData.quantity) formData.append('quantity', productData.quantity);
    if (productData.brand) formData.append('brand', productData.brand);
    
    // Handle image upload if provided
    if (productData.image && productData.image instanceof File) {
      formData.append('image', productData.image);
    } else if (productData.image) {
      formData.append('image', productData.image);
    }
    
    console.log('📤 Sending product update to /products/' + productId);
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...apiClient.defaults.headers.common
      }
    };
    
    const response = await apiClient.put(`/products/${productId}`, formData, config);
    console.log('✅ Product update successful:', response.data);
    
    return {
      success: true,
      data: response.data,
      message: 'Product updated successfully!'
    };
  } catch (error) {
    console.error('❌ Product update error:', error);
    
    let errorMessage = 'Product update failed. Please try again.';
    
    if (error.response?.status === 400) {
      errorMessage = error.response.data?.message || 'Invalid product data.';
    } else if (error.response?.status === 401) {
      errorMessage = 'Unauthorized. Please log in as admin.';
    } else if (error.response?.status === 403) {
      errorMessage = 'Forbidden. Admin access required.';
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

// Delete product
export const deleteProduct = async (productId) => {
  try {
    const response = await apiClient.delete(`/products/${productId}`);
    return {
      success: true,
      data: response.data,
      message: 'Product deleted successfully!'
    };
  } catch (error) {
    console.error('Delete product error:', error);
    
    let errorMessage = 'Product deletion failed. Please try again.';
    
    if (error.response?.status === 401) {
      errorMessage = 'Unauthorized. Please log in as admin.';
    } else if (error.response?.status === 403) {
      errorMessage = 'Forbidden. Admin access required.';
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

// Get categories (if you have a categories endpoint)
export const getCategories = async () => {
  try {
    const response = await apiClient.get('/categories');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Get categories error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch categories.',
      error: error.response?.data
    };
  }
};
