import { useState } from 'react';
import { ShoppingCart, Heart, Eye, X } from 'lucide-react';
import MacbookPro from '../assets/images/MacbookPro.png';

function FavouritePage() {
  const [favouriteItems, setFavouriteItems] = useState([
    {
      id: 1,
      name: 'Apple MacBook Pro 2019 | 16"',
      image: MacbookPro,
      specs: "RAM 16.0 GB | Memory 512 GB | Keyboard layout Eng (English)",
      price: "$749.99",
      brand: "Apple",
    }
  ]);

  const removeFromFavourites = (id) => {
    setFavouriteItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9FBFC" }}>
      {/* Blue Header */}
      <div
        className="text-white py-8 sm:py-12 lg:py-16 text-center px-4"
        style={{
          background: "linear-gradient(to right, #01589A 0%, #009CDE 100%)",
        }}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          Favourite
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Favourite</span>
          </div>
        </div>
      </div>

      {/* Favourite Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {favouriteItems.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 sm:py-16">
            <Heart size={48} className="mx-auto text-gray-400 mb-4 sm:w-16 sm:h-16" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No favourites yet</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base px-4">Add some products to your favourites to see them here</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {favouriteItems.map((product) => (
              <div
                key={product.id}
                className="rounded-lg shadow-sm hover:shadow-md transition-shadow relative"
                style={{ backgroundColor: "#F9FBFC" }}
              >
                {/* Product Image */}
                <div className="relative bg-white rounded-t-lg p-3 sm:p-4 h-40 sm:h-48 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                  {/* Brand label */}
                  <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded font-medium">
                    {product.brand}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {product.specs}
                  </p>
                  
                  {/* Desktop Layout: Price and Actions in one row */}
                  <div className="hidden sm:flex items-center justify-between">
                    <span className="text-lg font-semibold text-blue-600">
                      {product.price}
                    </span>
                    <div className="flex space-x-2">
                      <button 
                        className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors" 
                        title="Add to cart"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 bg-red-100 border border-red-300 rounded hover:bg-red-200 transition-colors text-red-600"
                        title="Remove from favourites"
                        onClick={() => removeFromFavourites(product.id)}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                      <button 
                        className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors" 
                        title="Quick view"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Layout: Price and Actions stacked */}
                  <div className="sm:hidden space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-blue-600">
                        {product.price}
                      </span>
                    </div>
                    
                    {/* Action Buttons - Full Width on Mobile */}
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        className="flex items-center justify-center py-2 px-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
                        title="Add to cart"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        <span className="text-xs">Add</span>
                      </button>
                      <button 
                        className="flex items-center justify-center py-2 px-3 bg-red-100 border border-red-300 rounded hover:bg-red-200 transition-colors text-red-600 text-sm"
                        title="Remove from favourites"
                        onClick={() => removeFromFavourites(product.id)}
                      >
                        <Heart className="w-4 h-4 fill-current mr-1" />
                        <span className="text-xs">Remove</span>
                      </button>
                      <button 
                        className="flex items-center justify-center py-2 px-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
                        title="Quick view"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        <span className="text-xs">View</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Favourite Items Count */}
        {favouriteItems.length > 0 && (
          <div className="mt-6 sm:mt-8 text-center">
            <div className="bg-white rounded-lg p-4 shadow-sm inline-block">
              <p className="text-gray-600 text-sm sm:text-base">
                <span className="font-semibold text-gray-900">{favouriteItems.length}</span>{' '}
                {favouriteItems.length === 1 ? 'item' : 'items'} in your favourites
              </p>
            </div>
          </div>
        )}

        {/* Additional Actions */}
        {favouriteItems.length > 0 && (
          <div className="mt-6 sm:mt-8 text-center">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium">
                Add All to Cart
              </button>
              <button className="w-full sm:w-auto border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium">
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FavouritePage;