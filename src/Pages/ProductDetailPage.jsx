import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronDown, ShoppingCart, Heart, Eye, ArrowLeft } from 'lucide-react';
import { products, getProductBySlug, getRelatedProducts } from '../utils/productData';
import { useStore } from '../context/StoreContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

const ProductDetailPage = () => {
  const { productSlug } = useParams(); 
  const navigate = useNavigate();
  const { addToCart, toggleFavourite, isFavourite } = useStore();
  const { addToast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('Related Product');
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find product by slug
    const foundProduct = getProductBySlug(productSlug);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Product not found, redirect to shop
      navigate('/shop', { replace: true });
    }
    setLoading(false);
  }, [productSlug, navigate]);

  const handleProductClick = (clickedProduct) => {
    navigate(`/shop/${clickedProduct.slug}`);
  };

  const handleBackToShop = () => {
    navigate('/shop');
  };

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
      name: 'Jane Smith',
      rating: 5,
      comment: 'Amazing product, highly recommended!',
      date: 'August 8, 2024'
    }
  ];

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-blue-500' : 'text-gray-300'}`}>★</span>
    ));
  };

  const handleSubmitReview = () => {
    console.log('Review submitted:', { rating, comment });
    // Reset form
    setRating('');
    setComment('');
    // You could also add the review to a reviews state or send to API
  };

  const renderSpecs = (specs) => {
    if (!specs) return null;
    
    return Object.entries(specs).map(([key, value]) => (
      <div key={key} className="flex justify-between py-1">
        <span className="capitalize text-gray-600">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
        <span className="font-medium">{value}</span>
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-4 bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Product not found</p>
            <button 
              onClick={handleBackToShop}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product);

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white">
      {/* Back Button */}
      <button 
        onClick={handleBackToShop}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Shop
      </button>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link> <span>|</span> 
        <Link to="/shop" className="hover:text-blue-600 transition-colors">{product.category || 'Product'}</Link> <span>|</span> 
        <span className="font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img 
            src={product.image}
            alt={product.name} 
            className="w-full max-w-md h-auto object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          {/* Brand and Rating */}
          <div className="mb-2">
            <span className="text-sm text-gray-600">Brand: </span>
            <span className="text-sm font-medium">{product.brand}</span>
            <div className="flex items-center gap-2 mt-1">
              {renderStars(4)}
              <span className="text-sm text-gray-600">({reviews.length} reviews)</span>
            </div>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

          {/* Description */}
          {product.description && (
            <p className="text-gray-700 mb-4">{product.description}</p>
          )}

          {/* Specs */}
          <div className="text-sm text-gray-600 mb-4">
            {product.detailedSpecs ? (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Specifications:</h4>
                {renderSpecs(product.detailedSpecs)}
              </div>
            ) : (
              <div>{product.specs}</div>
            )}
          </div>



          {/* Price */}
          <div className="text-2xl font-bold text-[#01589A] mb-2">{product.price}</div>
          <div className={`text-sm mb-4 flex items-center gap-2 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            <span>{product.inStock ? 'In stock' : 'Out of stock'}</span>
            {product.stockCount && product.inStock && (
              <span className="text-gray-500">({product.stockCount} available)</span>
            )}
          </div>

          {/* Quantity */}
          {product.inStock && (
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity:</label>
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
          )}

          {/* Add to Cart */}
          <div className="flex gap-2">
            <button 
              className={`flex-1 py-2 px-4 rounded font-medium transition-colors ${
                product.inStock 
                  ? 'bg-[#01589A] text-white hover:bg-blue-700' 
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
              disabled={!product.inStock}
              onClick={() => {
                if (!product.inStock) return;
                addToCart(product, quantity);
                addToast({ title: 'Added to cart', description: product.name, variant: 'success' });
                navigate('/cart');
              }}
            >
              {product.inStock ? 'Add to cart' : 'Out of Stock'}
            </button>
            <button 
              className={`p-2 border rounded transition-colors ${isFavourite(product.id) ? 'bg-red-100 border-red-300' : 'border-gray-300 hover:bg-gray-50'}`}
              onClick={() => {
                const removing = isFavourite(product.id);
                toggleFavourite(product);
                addToast({ title: removing ? 'Removed from favourites' : 'Added to favourites', description: product.name });
              }}
            >
              <Heart className={`w-5 h-5 ${isFavourite(product.id) ? 'fill-current text-red-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
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
        <div>
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(relatedProduct => (
                <div
                  key={relatedProduct.id}
                  className="rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  style={{ backgroundColor: "#F9FBFC" }}
                  onClick={() => handleProductClick(relatedProduct)}
                >
                  {/* Product Image */}
                  <div className="relative bg-white rounded-t-lg p-4 h-40 sm:h-48 flex items-center justify-center overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain"
                    />
                    {/* Brand label */}
                    <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                      {relatedProduct.brand}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {relatedProduct.specs}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-semibold text-blue-600">
                        {relatedProduct.price}
                      </span>
                      <div className="flex space-x-1 sm:space-x-2">
                        <button 
                          className="p-1.5 sm:p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(relatedProduct, 1);
                            addToast({ title: 'Added to cart', description: relatedProduct.name, variant: 'success' });
                            navigate('/cart');
                          }}
                        >
                          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button 
                          className={`p-1.5 sm:p-2 border rounded transition-colors ${isFavourite(relatedProduct.id) ? 'bg-red-100 border-red-300' : 'border-gray-300 hover:bg-gray-50'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavourite(relatedProduct);
                            addToast({ title: isFavourite(relatedProduct.id) ? 'Removed from favourites' : 'Added to favourites', description: relatedProduct.name });
                          }}
                        >
                          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavourite(relatedProduct.id) ? 'fill-current text-red-600' : ''}`} />
                        </button>
                        <button 
                          className="p-1.5 sm:p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              <p>No related products found.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Write your Review' && (
        <div className="flex justify-center">
          <div className="max-w-md w-full">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="relative">
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-8 bg-gray-100 text-sm"
                >
                  <option value="">Select Rating</option>
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
              <label className="block text-sm font-medium mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 h-32 text-sm"
                placeholder="Write your review..."
              />
            </div>

            <button 
              onClick={handleSubmitReview}
              disabled={!rating || !comment.trim()}
              className={`w-full py-2 px-4 rounded font-medium transition-colors ${
                rating && comment.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
            >
              Submit Review
            </button>
          </div>
        </div>
      )}

      {activeTab === 'All Reviews' && (
        <div className="flex justify-center">
          <div className="max-w-2xl w-full space-y-6">
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review.id} className="border-b border-gray-200 pb-4">
                  <h4 className="font-medium text-blue-600 mb-1">{review.name}</h4>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm text-gray-800 mb-1">{review.comment}</p>
                  <p className="text-xs text-gray-600">{review.date}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-600">
                <p>No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;