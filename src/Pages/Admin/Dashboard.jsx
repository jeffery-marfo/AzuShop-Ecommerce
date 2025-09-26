import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit } from 'lucide-react';
import Apple from '../../assets/images/Apple.png'

export default function Dashboard() {
  const navigate = useNavigate();
  
  const handleEditProduct = (productId) => {
    navigate(`/admin/update-product/${productId}`);
  };

  const products = [
    {
      id: 1,
      image: Apple,
      name: "Apple MacBook Pro 2019 | 16\"",
      specs: "RAM 16 | GB | Memory 512 GB Keyboard layout Eng Bulgarian",
      price: "$749.99",
      date: "05/07/2025"
    },
    {
      id: 2,
      image: Apple,
      name: "Apple MacBook Pro 2019 | 16\"",
      specs: "RAM 16 | GB | Memory 512 GB Keyboard layout Eng Bulgarian",
      price: "$749.99",
      date: "05/07/2025"
    },
    {
      id: 3,
      image: Apple,
      name: "Apple MacBook Pro 2019 | 16\"",
      specs: "RAM 16 | GB | Memory 512 GB Keyboard layout Eng Bulgarian",
      price: "$749.99",
      date: "05/07/2025"
    },
    {
      id: 4,
      image: Apple,
      name: "Apple MacBook Pro 2019 | 16\"",
      specs: "RAM 16 | GB | Memory 512 GB Keyboard layout Eng Bulgarian",
      price: "$749.99",
      date: "05/07/2025"
    },
    
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-8">
              <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                Products
              </button>
              <button 
                onClick={() => navigate('/admin/create-product')}
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors cursor-pointer"
              >
                Create Product
              </button>
            </div>
            <div className="text-gray-600">
              <span className="font-medium">Total: 04</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-54 object-cover rounded-md  to-red-500"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {product.specs}
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-semibold text-gray-800">
                    {product.price}
                  </span>
                  <button 
                    onClick={() => handleEditProduct(product.id)}
                    className="text-blue-600 hover:text-blue-800 p-1 transition-colors cursor-pointer"
                    title="Edit product"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-400 pt-1">
                  {product.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}