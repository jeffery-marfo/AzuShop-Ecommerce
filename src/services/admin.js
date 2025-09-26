import { apiClient } from "./config";

// ==================== USERS MANAGEMENT ====================

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Get users error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch users.',
      error: error.response?.data
    };
  }
};

// Update user
export const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, userData);
    return {
      success: true,
      data: response.data,
      message: 'User updated successfully!'
    };
  } catch (error) {
    console.error('Update user error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update user.',
      error: error.response?.data
    };
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/users/${userId}`);
    return {
      success: true,
      data: response.data,
      message: 'User deleted successfully!'
    };
  } catch (error) {
    console.error('Delete user error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete user.',
      error: error.response?.data
    };
  }
};

// ==================== ORDERS MANAGEMENT ====================

// Get all orders
export const getAllOrders = async () => {
  try {
    const response = await apiClient.get('/orders');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Get orders error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch orders.',
      error: error.response?.data
    };
  }
};

// Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await apiClient.get(`/orders/${orderId}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Get order error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch order.',
      error: error.response?.data
    };
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await apiClient.put(`/orders/${orderId}/status`, { status });
    return {
      success: true,
      data: response.data,
      message: 'Order status updated successfully!'
    };
  } catch (error) {
    console.error('Update order status error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update order status.',
      error: error.response?.data
    };
  }
};

// Mark order as delivered
export const markOrderAsDelivered = async (orderId) => {
  try {
    const response = await apiClient.put(`/orders/${orderId}/delivered`);
    return {
      success: true,
      data: response.data,
      message: 'Order marked as delivered!'
    };
  } catch (error) {
    console.error('Mark order as delivered error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to mark order as delivered.',
      error: error.response?.data
    };
  }
};

// ==================== CATEGORIES MANAGEMENT ====================

// Create category
export const createCategory = async (categoryData) => {
  try {
    const response = await apiClient.post('/categories', categoryData);
    return {
      success: true,
      data: response.data,
      message: 'Category created successfully!'
    };
  } catch (error) {
    console.error('Create category error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create category.',
      error: error.response?.data
    };
  }
};

// Update category
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await apiClient.put(`/categories/${categoryId}`, categoryData);
    return {
      success: true,
      data: response.data,
      message: 'Category updated successfully!'
    };
  } catch (error) {
    console.error('Update category error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update category.',
      error: error.response?.data
    };
  }
};

// Delete category
export const deleteCategory = async (categoryId) => {
  try {
    const response = await apiClient.delete(`/categories/${categoryId}`);
    return {
      success: true,
      data: response.data,
      message: 'Category deleted successfully!'
    };
  } catch (error) {
    console.error('Delete category error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete category.',
      error: error.response?.data
    };
  }
};

// ==================== ADMIN PROFILE MANAGEMENT ====================

// Update admin profile
export const updateAdminProfile = async (profileData) => {
  try {
    const response = await apiClient.put('/users/profile', profileData);
    return {
      success: true,
      data: response.data,
      message: 'Profile updated successfully!'
    };
  } catch (error) {
    console.error('Update admin profile error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update profile.',
      error: error.response?.data
    };
  }
};

// ==================== DASHBOARD STATISTICS ====================

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    const response = await apiClient.get('/admin/dashboard');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch dashboard statistics.',
      error: error.response?.data
    };
  }
};
