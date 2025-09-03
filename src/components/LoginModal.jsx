import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Scroll lock effect
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Lock the scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Cleanup function to restore scroll when modal closes
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    
    // Handle login logic here
    console.log('Login attempt:', formData);
    
    // Reset form
    setFormData({ email: '', password: '' });
    
    // Close modal
    onClose();
  };

  const handleCreateAccount = () => {
    // Switch to register modal if callback provided
    if (onSwitchToRegister) {
      onSwitchToRegister();
    } else {
      // Otherwise just close this modal
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
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
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Modal content */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Login</h2>
        </div>

        <div className="space-y-4">
          {/* Email field */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Email address *"
              className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
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
              placeholder="Password *"
              className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              autoComplete="current-password"
            />
          </div>

          {/* Login button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log in
          </button>
        </div>

        {/* Create account link */}
        <div className="mt-6 text-center">
          <button
            onClick={handleCreateAccount}
            className="text-gray-700 hover:text-gray-900 text-sm transition-colors duration-200 border-b border-gray-300 hover:border-gray-500 focus:outline-none focus:border-gray-500"
          >
            New customer? Create your account →
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;