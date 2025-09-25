import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

export default function UpdateProfilePage() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    console.log('Update profile:', formData);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center text-gray-600 hover:text-gray-800 mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          
          <div className="flex gap-8">
            <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
              Update Profile
            </button>
            <button className="text-gray-600 hover:text-gray-800 font-medium">
              My orders
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-4 bg-gray-200 rounded-lg border-0 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-4 bg-gray-200 rounded-lg border-0 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm password"
              className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Update Button */}
          <div className="pt-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}