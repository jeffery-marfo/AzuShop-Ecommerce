import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { createProduct, getCategories } from '../../services/products';
import { useNavigate } from 'react-router-dom';

export default function CreateProductPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    brand: '',
    countInStock: '',
    category: '',
    description: '',
    image: null
  });
  
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await getCategories();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
        // Set default categories if API fails
        setCategories([
          { _id: 'electronics', name: 'Electronics' },
          { _id: 'clothing', name: 'Clothing' },
          { _id: 'books', name: 'Books' },
          { _id: 'home', name: 'Home & Garden' }
        ]);
      }
    };
    
    loadCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.quantity || !formData.category) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      // Prepare product data
      const productData = {
        name: formData.name,
        description: formData.description || '',
        price: parseFloat(formData.price),
        category: formData.category,
        quantity: parseInt(formData.quantity),
        brand: formData.brand || '',
        image: formData.image
      };

      console.log('Submitting product data:', productData);

      const result = await createProduct(productData);

      if (result.success) {
        setSuccess('Product created successfully!');
        // Reset form
        setFormData({
          name: '',
          price: '',
          quantity: '',
          brand: '',
          countInStock: '',
          category: '',
          description: '',
          image: null
        });
        // Redirect to admin dashboard after 2 seconds
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 2000);
      } else {
        setError(result.message || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </button>
          
          <div className="flex gap-8">
            <button 
              onClick={() => navigate('/admin-dashboard')}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Dashboard
            </button>
            <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
              Create Product
            </button>
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload */}
          <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg p-16 text-center">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="image-upload"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-medium transition-colors cursor-pointer inline-block"
            >
              {formData.image ? formData.image.name : 'Choose Image'}
            </label>
            {formData.image && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {formData.image.name}
              </p>
            )}
          </div>

          {/* Form Fields Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Product Name *"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="number"
                name="price"
                placeholder="Price *"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Form Fields Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity *"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Form Fields Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                name="countInStock"
                placeholder="Count in stock"
                value={formData.countInStock}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                required
              >
                <option value="" disabled>Select Category *</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Description */}
          <div>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isLoading ? 'Creating Product...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}