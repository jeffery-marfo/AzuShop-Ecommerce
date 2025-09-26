import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getProductById, updateProduct, deleteProduct, getCategories } from '../../services/products';

export default function UpdateProductPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  
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
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (productId) {
      loadProductData();
    }
    loadCategories();
  }, [productId]);

  const loadProductData = async () => {
    try {
      setIsLoadingProduct(true);
      const result = await getProductById(productId);
      
      if (result.success) {
        const product = result.data;
        setFormData({
          name: product.name || '',
          price: product.price || '',
          quantity: product.quantity || '',
          brand: product.brand || '',
          countInStock: product.countInStock || '',
          category: product.category || '',
          description: product.description || '',
          image: null
        });
        setImagePreview(product.image || '');
      } else {
        setError(result.message || 'Failed to load product');
      }
    } catch (error) {
      console.error('Error loading product:', error);
      setError('Failed to load product');
    } finally {
      setIsLoadingProduct(false);
    }
  };

  const loadCategories = async () => {
    try {
      const result = await getCategories();
      if (result.success) {
        setCategories(result.data || []);
      } else {
        // Set default categories if API fails
        setCategories([
          { _id: 'electronics', name: 'Electronics' },
          { _id: 'clothing', name: 'Clothing' },
          { _id: 'books', name: 'Books' },
          { _id: 'home', name: 'Home & Garden' }
        ]);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
      setCategories([
        { _id: 'electronics', name: 'Electronics' },
        { _id: 'clothing', name: 'Clothing' },
        { _id: 'books', name: 'Books' },
        { _id: 'home', name: 'Home & Garden' }
      ]);
    }
  };

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
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleUpdate = async () => {
    if (!productId) {
      setError('Product ID is required');
      return;
    }

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
        countInStock: parseInt(formData.countInStock) || parseInt(formData.quantity),
        image: formData.image
      };

      console.log('Updating product with data:', productData);

      const result = await updateProduct(productId, productData);

      if (result.success) {
        setSuccess('Product updated successfully!');
        // Redirect to admin dashboard after 2 seconds
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 2000);
      } else {
        setError(result.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!productId) {
      setError('Product ID is required');
      return;
    }

    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        setIsLoading(true);
        const result = await deleteProduct(productId);
        
        if (result.success) {
          setSuccess('Product deleted successfully!');
          // Redirect to admin dashboard after 2 seconds
          setTimeout(() => {
            navigate('/admin-dashboard');
          }, 2000);
        } else {
          setError(result.message || 'Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Failed to delete product');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoadingProduct) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
          </div>
        </div>
      </div>
    );
  }

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
            Back
          </button>
          
          <div className="flex gap-8">
            <button 
              onClick={() => navigate('/admin-dashboard')}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Products
            </button>
            <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
              Update Product
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

        {/* Product Image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img 
              src={imagePreview || "/api/placeholder/200/120"} 
              alt="Product"
              className="w-48 h-28 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = "/api/placeholder/200/120";
              }}
            />
          </div>
        </div>

        {/* File Upload */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="image-upload"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-medium transition-colors cursor-pointer"
          >
            Choose file
          </label>
          <span className="text-gray-600">
            {formData.image ? formData.image.name : 'No file chosen'}
          </span>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name and Price Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Product Name *"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Quantity and Brand Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity *"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Count in Stock and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                name="countInStock"
                placeholder="Count in stock"
                value={formData.countInStock}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-200 rounded-lg border-0 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
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
              className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}