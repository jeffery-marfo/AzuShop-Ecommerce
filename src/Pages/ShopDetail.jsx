import React, { useState } from 'react';
import { ChevronDown, ShoppingCart, Heart, Eye } from 'lucide-react';
import Mac from '../assets/images/Mac.png';
import Apple from "../assets/images/Apple.png";
import Apple1 from "../assets/images/Apple1.png";
import HP from "../assets/images/HP.png";

const ProductDetailPage = () => {
  const [activeTab, setActiveTab] = useState('Related Product');
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const relatedProducts = [
    {
      id: 1,
      brand: 'Apple',
      name: 'Apple MacBook Pro 2019 | 16"',
      specs: 'RAM 16.0 GB | Memory 512 GB | Keyboard layout Eng (English)',
      price: '$749.99',
      image: Apple,
    },
    {
      id: 2,
      brand: 'Apple', 
      name: 'Apple MacBook Pro 2020 | 13.3" | Touch Bar',
      specs: 'RAM 16.0 GB | Memory 512 GB | Keyboard layout Eng (English)',
      price: '$949.99',
      image: Apple1,    
    },
    {
      id: 3,
      brand: 'Apple',
      name: 'Apple MacBook Pro 2020 | 13.3" | Touch Bar', 
      specs: 'RAM 16.0 GB | Memory 512 GB | Keyboard layout Eng (English)',
      price: '$949.99',
      image: Apple1,
    },
    {
      id: 4,
      brand: 'HP',
      name: 'HP EliteBook 840 G5 | i5-8350U | 14"',
      specs: '8 GB | 128 GB SSD | Backlit keyboard | Webcam | Win 11 Pro | silver | SE',
      price: '$449.99',
      image: HP,
    },
    {
      id: 5,
      brand: 'Apple',
      name: 'Apple MacBook Pro 2019 | 16"',
      specs: 'RAM 16.0 GB | Memory 512 GB | Keyboard layout Eng (English)', 
      price: '$749.99',
      image: Apple,
    },
    {
      id: 6,
      brand: 'Apple',
      name: 'Apple MacBook Pro 2020 | 13.3" | Touch Bar',
      specs: 'RAM 16.0 GB | Memory 512 GB | Keyboard layout Eng (English)',
      price: '$949.99', 
      image: Apple1
    },
    {
      id: 7,
      brand: 'Apple',
      name: 'Apple MacBook Pro 2020 | 13.3" | Touch Bar',
      specs: 'RAM 16.0 GB | Memory 512 GB | Keyboard layout Eng (English)',
      price: '$949.99',
      image: Apple1,
    },
    {
      id: 8,
      brand: 'HP', 
      name: 'HP EliteBook 840 G5 | i5-8350U | 14"',
      specs: '8 GB | 128 GB SSD | Backlit keyboard | Webcam | Win 11 Pro | silver | SE',
      price: '$449.99',
      image: HP,
    }
  ];

  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      rating: 4,
      comment: 'Experience exceptional clarity and precision',
      date: 'August 6, 2024'
    },
    {
      id: 2, 
      name: 'John Doe',
      rating: 4,
      comment: 'Experience exceptional clarity and precision',
      date: 'August 6, 2024'
    }
  ];

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-blue-500' : 'text-gray-300'}`}>★</span>
    ));
  };

  const handleSubmitReview = () => {
    // Handle review submission
    console.log('Review submitted:', { rating, comment });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        <span>Home</span> <span>|</span> <span>laptop</span> <span>|</span> <span className="font-medium">Apple MacBook Pro 2019 | 16"</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img 
            src={Mac}
            alt="MacBook Pro" 
            className="w-full max-w-md h-auto object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          {/* Brand and Rating */}
          <div className="mb-2">
            <span className="text-sm text-gray-600">Brand: </span>
            <span className="text-sm font-medium">Apple</span>
            <div className="flex items-center gap-2 mt-1">
              {renderStars(4)}
              <span className="text-sm text-gray-600">(1 review)</span>
            </div>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl font-bold mb-2">Apple MacBook Pro 2019 | 16"</h1>

          {/* Specs */}
          <div className="text-sm text-gray-600 mb-4">
            <div>RAM 16.0 GB | Memory 512 GB</div>
            <div>Keyboard layout Eng (English)</div>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-[#01589A] mb-2">$749.99</div>
          <div className="text-green-600 text-sm mb-4">In stock</div>

          {/* Quantity */}
          <div className="mb-4">
            <div className="relative inline-block">
              <select 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="appearance-none border border-gray-300 rounded px-3 py-2 pr-8 bg-white text-sm"
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>

          {/* Add to Cart */}
          <button className="w-full bg-[#01589A] text-white py-2 px-4 rounded hover:bg-blue-700 font-medium">
            Add to cart
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className=" mb-6">
        <div className="flex justify-center">
          {['Related Product', 'Write your Review', 'All Reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'Related Product' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map(product => (
            <div
              key={product.id}
              className="rounded-lg shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: "#F9FBFC" }}
            >
              {/* Product Image */}
              <div className="relative bg-white rounded-t-lg p-4 h-40 sm:h-48 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                {/* Brand label */}
                <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                  {product.brand}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {product.specs}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base sm:text-lg font-semibold text-blue-600">
                    {product.price}
                  </span>
                  <div className="flex space-x-1 sm:space-x-2">
                    <button className="p-1.5 sm:p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button className="p-1.5 sm:p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button className="p-1.5 sm:p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Write your Review' && (
        <div className="flex justify-center">
          <div className="max-w-md w-full">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Ratings</label>
              <div className="relative">
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-8 bg-gray-100 text-sm"
                >
                  <option value="">Select</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Comments</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 h-32 text-sm"
                placeholder=""
              />
            </div>

            <button 
              onClick={handleSubmitReview}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-medium"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {activeTab === 'All Reviews' && (
        <div className="flex justify-center">
          <div className="max-w-2xl w-full space-y-6">
            {reviews.map(review => (
              <div key={review.id}>
                <h4 className="font-medium text-blue-600 mb-1">{review.name}</h4>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-sm text-gray-800 mb-1">{review.comment}</p>
                <p className="text-xs text-gray-600">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;