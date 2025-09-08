import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MacbookPro from "../assets/images/MacbookPro.png";

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Apple MacBook Pro 2019 | 16"',
      brand: "Apple",
      price: 749.99,
      quantity: 1,
      image: MacbookPro,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Blue Header */}
      <div
        className="text-white py-8 sm:py-12 lg:py-16 text-center px-4"
        style={{
          background: "linear-gradient(to right, #01589A 0%, #009CDE 100%)",
        }}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          Cart
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white py-4">
        <div className="flex justify-center max-w-6xl mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Home
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Cart</span>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Desktop Table Header - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-12 gap-4 py-4 border-b border-gray-200 font-semibold text-gray-900 text-base lg:text-lg">
          <div className="col-span-5">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-2 text-center">Total</div>
        </div>

        {/* Cart Items */}
        <div className="py-4 sm:py-8">
          {cartItems.map((item) => (
            <div key={item.id} className="border-b border-gray-100 last:border-b-0">
              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-12 gap-4 items-center py-6">
                {/* Product */}
                <div className="col-span-5 flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-12 lg:w-20 lg:h-16 object-cover rounded flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Brand:{" "}
                      <span className="text-gray-900 font-medium">
                        {item.brand}
                      </span>
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center text-base lg:text-lg font-semibold text-gray-900">
                  ${item.price.toFixed(2)}
                </div>

                {/* Quantity */}
                <div className="col-span-3 flex justify-center">
                  <div className="relative">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="appearance-none bg-gray-50 border border-gray-300 rounded px-4 py-2 pr-8 text-center min-w-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-2 text-center text-base lg:text-lg font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden py-6 px-2">
                <div className="flex space-x-4">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded flex-shrink-0"
                  />
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Brand:{" "}
                      <span className="text-gray-900 font-medium">
                        {item.brand}
                      </span>
                    </p>
                    
                    {/* Price and Quantity Row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-lg font-semibold text-gray-900">
                        ${item.price.toFixed(2)}
                      </div>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Qty:</span>
                        <div className="relative">
                          <select
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                            className="appearance-none bg-gray-50 border border-gray-300 rounded px-3 py-1 pr-6 text-center min-w-[60px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {[...Array(10)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={14}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Total and Remove Row */}
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-900">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-6 sm:mt-8 bg-gray-50 rounded-lg p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base sm:text-lg font-semibold text-gray-900">
                Items:
              </span>
              <span className="text-base sm:text-lg font-semibold text-gray-900">
                {totalItems}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                Total:
              </span>
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="mt-4 sm:mt-6">
              <button className="w-full bg-blue-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-medium text-base sm:text-lg hover:bg-blue-700 transition-colors">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

