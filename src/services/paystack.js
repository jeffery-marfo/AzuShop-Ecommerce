import { apiClient } from './config.js';

// Paystack configuration
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_3498486ee595514f29e1cdbe2ef44aea6afed664';

// Validate Paystack key
const validatePaystackKey = () => {
  if (!PAYSTACK_PUBLIC_KEY) {
    console.error('Paystack public key is not configured');
    return false;
  }
  
  if (!PAYSTACK_PUBLIC_KEY.startsWith('pk_')) {
    console.error('Invalid Paystack public key format');
    return false;
  }
  
  return true;
};

// Initialize Paystack
const initializePaystack = () => {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      resolve(window.PaystackPop);
      return;
    }

    // Validate key before loading script
    if (!validatePaystackKey()) {
      reject(new Error('Invalid Paystack configuration'));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => {
      if (window.PaystackPop) {
        resolve(window.PaystackPop);
      } else {
        reject(new Error('Paystack script loaded but PaystackPop not available'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load Paystack script'));
    document.head.appendChild(script);
  });
};

// Create payment with backend
export const createPayment = async (orderData) => {
  try {
    // Convert USD to GHS for backend
    const ghsAmount = convertUSDToGHS(orderData.amount);
    
    console.log('Creating payment with backend:', {
      orderId: orderData.orderId,
      originalAmount: orderData.amount,
      ghsAmount: ghsAmount,
      email: orderData.email
    });
    
    const response = await apiClient.post('/orders/pay', {
      callback_url: `${window.location.origin}/payment-success`,
      order: orderData.orderId,
      amount: ghsAmount, // Send GHS amount to backend
      currency: 'GHS', // Specify GHS currency
      email: orderData.email
    });
    
    console.log('Backend payment response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    console.error('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // If it's a timeout error, provide a more specific message
    if (error.code === 'ECONNABORTED') {
      throw new Error('Payment request timed out. Please check your internet connection and try again.');
    }
    
    // If it's a network error, suggest checking the backend
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Unable to connect to payment server. Please ensure the backend is running.');
    }
    
    // If it's a 404, the endpoint might not exist
    if (error.response?.status === 404) {
      throw new Error('Payment endpoint not found. Please check your backend configuration.');
    }
    
    // If it's a 400, there might be a validation error
    if (error.response?.status === 400) {
      throw new Error('Invalid payment data. Please check your order details.');
    }
    
    throw new Error('Failed to create payment. Please try again.');
  }
};

// Fallback payment creation for testing (when backend is not available)
export const createPaymentFallback = async (orderData) => {
  // Generate a mock reference for testing
  const reference = 'ref_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  
  // Convert USD to GHS for Paystack
  const ghsAmount = convertUSDToGHS(orderData.amount);
  
  return {
    reference: reference,
    amount: ghsAmount, // Return GHS amount
    currency: 'GHS'
  };
};

// Initialize and process Paystack payment
export const processPaystackPayment = async (paymentData, onSuccess, onError) => {
  try {
    console.log('Initializing Paystack with key:', PAYSTACK_PUBLIC_KEY);
    console.log('Payment data:', paymentData);
    
    const PaystackPop = await initializePaystack();
    
    if (!PaystackPop) {
      throw new Error('Failed to load Paystack script');
    }
    
    // Convert USD to GHS for Paystack
    const ghsAmount = convertUSDToGHS(paymentData.amount);
    console.log(`Converting $${paymentData.amount} to ₵${ghsAmount} for Paystack`);
    
    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: paymentData.email,
      amount: ghsAmount * 100, // Convert to pesewas (Paystack expects amount in smallest currency unit)
      currency: 'GHS', // Force GHS currency
      ref: paymentData.reference,
      metadata: {
        order_id: paymentData.orderId,
        custom_fields: [
          {
            display_name: "Order ID",
            variable_name: "order_id",
            value: paymentData.orderId
          }
        ]
      },
      callback: function(response) {
        console.log('Payment successful:', response);
        // Payment successful
        onSuccess(response);
      },
      onClose: function() {
        console.log('Payment cancelled by user');
        // Payment cancelled
        onError(new Error('Payment was cancelled'));
      }
    });

    if (!handler) {
      throw new Error('Failed to create Paystack handler');
    }

    handler.openIframe();
  } catch (error) {
    console.error('Paystack payment error:', error);
    onError(error);
  }
};

// Verify payment with backend
export const verifyPayment = async (reference) => {
  try {
    const response = await apiClient.get(`/orders/verify-payment/${reference}`);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw new Error('Failed to verify payment. Please contact support.');
  }
};

// Get supported payment methods
export const getSupportedPaymentMethods = () => {
  return [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, Verve',
      icon: '💳'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: '🏦'
    },
    {
      id: 'ussd',
      name: 'USSD',
      description: 'Mobile banking USSD',
      icon: '📱'
    },
    {
      id: 'qr',
      name: 'QR Code',
      description: 'Scan QR code to pay',
      icon: '📱'
    }
  ];
};

// Convert USD to GHS (Ghanaian Cedi)
export const convertUSDToGHS = (usdAmount) => {
  const exchangeRate = 12.5; // Approximate USD to GHS rate
  const ghsAmount = Math.round(usdAmount * exchangeRate * 100) / 100; // Round to 2 decimal places
  console.log(`Converting $${usdAmount} to ₵${ghsAmount} (rate: ${exchangeRate})`);
  return ghsAmount;
};

// Format amount for display
export const formatAmount = (amount, currency = 'GHS') => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount);
};

// Validate payment data (before creating payment)
export const validatePaymentData = (paymentData) => {
  const errors = [];
  
  if (!paymentData.email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentData.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!paymentData.amount || paymentData.amount <= 0) {
    errors.push('Amount must be greater than 0');
  }
  
  if (!paymentData.orderId) {
    errors.push('Order ID is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate payment response (after creating payment)
export const validatePaymentResponse = (paymentResponse) => {
  const errors = [];
  
  if (!paymentResponse.reference) {
    errors.push('Payment reference is required');
  }
  
  if (!paymentResponse.amount) {
    errors.push('Payment amount is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Get payment status from URL parameters
export const getPaymentStatusFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    reference: urlParams.get('reference'),
    trxref: urlParams.get('trxref'),
    status: urlParams.get('status')
  };
};
