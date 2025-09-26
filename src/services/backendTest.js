import { apiClient } from './config.js';

// Test backend connectivity
export const testBackendConnection = async () => {
  try {
    console.log('Testing backend connection...');
    const response = await apiClient.get('/');
    console.log('Backend response:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Backend connection failed:', error);
    return { 
      success: false, 
      error: error.message,
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

// Test payment endpoint
export const testPaymentEndpoint = async () => {
  try {
    console.log('Testing payment endpoint...');
    const testData = {
      orderId: 'test_' + Date.now(),
      amount: 100,
      email: 'test@example.com',
      callback_url: 'http://localhost:5173/payment-success'
    };
    
    const response = await apiClient.post('/orders/pay', testData);
    console.log('Payment endpoint response:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Payment endpoint failed:', error);
    return { 
      success: false, 
      error: error.message,
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

// Test verification endpoint
export const testVerificationEndpoint = async (reference = 'test_ref_123') => {
  try {
    console.log('Testing verification endpoint...');
    const response = await apiClient.get(`/orders/verify-payment/${reference}`);
    console.log('Verification endpoint response:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Verification endpoint failed:', error);
    return { 
      success: false, 
      error: error.message,
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

// Run all tests
export const runBackendTests = async () => {
  console.log('🚀 Running backend tests...');
  
  const connectionTest = await testBackendConnection();
  console.log('Connection test:', connectionTest);
  
  const paymentTest = await testPaymentEndpoint();
  console.log('Payment test:', paymentTest);
  
  const verificationTest = await testVerificationEndpoint();
  console.log('Verification test:', verificationTest);
  
  return {
    connection: connectionTest,
    payment: paymentTest,
    verification: verificationTest
  };
};
