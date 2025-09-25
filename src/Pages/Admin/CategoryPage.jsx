import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

export default function CategoryPage() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([
    'Laptop',
    'Phone',
    'Camera',
    'watch',
    'Tablet'
  ]);

  const handleSubmit = () => {
    if (categoryName.trim()) {
      setCategories(prev => [...prev, categoryName.trim()]);
      setCategoryName('');
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories(prev => prev.filter(cat => cat !== categoryToDelete));
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
          
          <h1 className="text-blue-600 text-xl font-medium">Category</h1>
        </div>

        {/* Category Input Form */}
        <div className="space-y-4 mb-8">
          <div>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Write category name"
              className="w-full p-4 bg-gray-200 rounded-lg border-0 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleDeleteCategory(category)}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Bottom Border Line */}
        <div className="mt-20">
          <hr className="border-gray-300" />
        </div>
      </div>
    </div>
  );
}