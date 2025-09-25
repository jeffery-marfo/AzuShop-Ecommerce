import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';

export default function UpdateProductPage() {
  const [formData, setFormData] = useState({
    name: 'Apple MacBook Pro 2019 | 16"',
    price: '$749.99',
    quantity: '20',
    brand: 'Apple',
    countInStock: '10',
    category: 'Laptop',
    description: 'RAM 16.0 GB | Memory 512 GB Keyboard layout Eng (English)'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    console.log('Update product:', formData);
  };

  const handleDelete = () => {
    console.log('Delete product');
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
            <button className="text-gray-600 hover:text-gray-800 font-medium">
              Products
            </button>
            <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
              Update Product
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img 
              src="/api/placeholder/200/120" 
              alt="MacBook Pro"
              className="w-48 h-28 object-cover rounded-lg "
            />
          </div>
        </div>

        {/* File Upload */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-medium transition-colors">
            Choose file
          </button>
          <span className="text-gray-600">No file chosen</span>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name and Price Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Quantity and Brand Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Count in Stock and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="countInStock"
                value={formData.countInStock}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
                <option value="Tablet">Tablet</option>
                <option value="Phone">Phone</option>
                <option value="Accessories">Accessories</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Description */}
          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-4 bg-gray-200 rounded-lg border-0 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleUpdate}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}