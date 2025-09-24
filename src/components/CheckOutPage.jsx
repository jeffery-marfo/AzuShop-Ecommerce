

import React, { useMemo, useState } from 'react';
import Apple from "../assets/images/Apple.png";
import { useStore } from '../context/StoreContext.jsx';
import { useOrders } from '../context/OrdersContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

const CheckoutPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('paypal');
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useStore();
  const { createOrder } = useOrders();
  const { addToast } = useToast();

  const totals = useMemo(() => {
    const itemsTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shipping = 0;
    const tax = Math.round(itemsTotal * 0.02 * 100) / 100; // 2% simple tax
    const grandTotal = Math.round((itemsTotal + shipping + tax) * 100) / 100;
    return { itemsTotal, shipping, tax, grandTotal };
  }, [cartItems]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!cartItems.length) {
      addToast({ title: 'Your cart is empty', variant: 'error' });
      return;
    }
    if (!formData.address) {
      addToast({ title: 'Address is required', variant: 'error' });
      return;
    }
    const order = createOrder({
      items: cartItems.map(i => ({ id: i.id, name: i.name, image: i.image, brand: i.brand, quantity: i.quantity, unitPrice: i.price, total: i.price * i.quantity, slug: i.slug })),
      totals,
      shippingAddress: formData,
      paymentMethod: selectedPayment,
    });
    clearCart();
    addToast({ title: 'Order placed', description: `Order #${order.id}`, variant: 'success' });
    navigate(`/order-detail/${order.id}`);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FBFC' }}>
      {/* Header */}
         <div
        className="text-white py-8 sm:py-12 lg:py-16 text-center px-4"
        style={{
          background: "linear-gradient(to right, #01589A 0%, #009CDE 100%)",
        }}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          Checkout
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-center">
        <div className="text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/cart" className="hover:text-blue-600 transition-colors">Cart</Link>
          <span className="mx-2">/</span>
          <span className="font-medium">Checkout</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Billing Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-8">Billing Details</h2>
            
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address *"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Summary */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Products</h2>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {cartItems.length === 0 ? (
                <div className="text-sm text-gray-600">Your cart is empty.</div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 mb-6 last:mb-0">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{item.brand}</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}

              {/* Divider Line */}
              <div className="border-t border-gray-200 mb-6"></div>

              {/* Shipping Section */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">Shipping</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping fees</span>
                    <span className="text-gray-900 font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax:</span>
                    <span className="text-gray-900 font-medium">$10.00</span>
                  </div>
                </div>
              </div>

              {/* Divider Line */}
              <div className="border-t border-gray-200 mb-6"></div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 text-sm">Total</span>
                  <span className="font-semibold text-gray-900">${totals.grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Divider Line */}
              <div className="border-t border-gray-200 mb-6"></div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">Select Method</h3>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={selectedPayment === 'paypal'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">Paypal or credit card</span>
                </label>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;