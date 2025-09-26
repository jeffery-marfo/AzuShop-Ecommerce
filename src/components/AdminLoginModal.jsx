import { useState, useEffect } from 'react';
import { X, Shield } from 'lucide-react';
import { loginAdmin } from '../services/auth';

function AdminLoginModal({ isOpen, onClose, onSwitchToRegister, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Scroll lock effect
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Reset form and error when modal opens
  useEffect(() => {
    if (isOpen) {
      setError('');
      setFormData({
        email: '',
        password: ''
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const loginData = {
        email: formData.email.trim(),
        password: formData.password,
      };

      console.log('🚀 Submitting admin login with:', { email: loginData.email });

      const result = await loginAdmin(loginData);

      if (result.success) {
        // Reset form
        setFormData({
          email: '',
          password: ''
        });

        // Call the success callback with user data and token
        if (onLoginSuccess) {
          onLoginSuccess(result.data.user, result.data.token);
        }

        // Close modal
        onClose();
      } else {
        setError(result.message || 'Admin login failed. Please try again.');
      }
    } catch (err) {
      console.error('Unexpected admin login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    if (onSwitchToRegister) {
      onSwitchToRegister();
    } else {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && !loading) {
      onClose();
    }
    if (e.key === 'Enter' && (e.target.name === 'email' || e.target.name === 'password')) {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#D5D3D3]/60 transition-opacity"
        onClick={handleBackdropClick}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Modal content */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Admin Login</h2>
          </div>
          <p className="text-sm text-gray-600">Access the admin dashboard</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Email field */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Admin email address *"
              disabled={loading}
              className="w-full px-4 py-3 bg-purple-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              autoComplete="email"
            />
          </div>

          {/* Password field */}
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Admin password *"
              disabled={loading}
              className="w-full px-4 py-3 bg-purple-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              autoComplete="current-password"
            />
          </div>

          {/* Login button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Admin Login"
            )}
          </button>
        </div>

        {/* Create account link */}
        <div className="mt-6 text-center">
          <button
            onClick={handleCreateAccount}
            disabled={loading}
            className="text-gray-700 hover:text-gray-900 text-sm transition-colors duration-200 border-b border-gray-300 hover:border-gray-500 focus:outline-none focus:border-gray-500 disabled:opacity-50"
          >
            Need admin access? Create admin account →
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginModal;
