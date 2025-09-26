

import React, { useMemo, useState } from 'react';
import Apple from "../assets/images/Apple.png";
import { useStore } from '../context/StoreContext.jsx';
import { useOrders } from '../context/OrdersContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { 
  processPaystackPayment, 
  createPayment, 
  createPaymentFallback, 
  validatePaymentData,
  validatePaymentResponse,
  formatAmount,
  getSupportedPaymentMethods 
} from '../services/paystack.js';

const CheckoutPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('paypal');
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    email: ''
  });
  
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [showCVV, setShowCVV] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
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

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      // Format card number with spaces
      const formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      setCardData(prev => ({ ...prev, [name]: formattedValue }));
    } else if (name === 'expiryDate') {
      // Format expiry date as MM/YY
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2');
      setCardData(prev => ({ ...prev, [name]: formattedValue }));
    } else if (name === 'cvv') {
      // Limit CVV to 3-4 digits
      const formattedValue = value.replace(/\D/g, '').slice(0, 4);
      setCardData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setCardData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!cartItems.length) {
      addToast({ title: 'Your cart is empty', variant: 'error' });
      return;
    }
    if (!formData.address) {
      addToast({ title: 'Address is required', variant: 'error' });
      return;
    }
    if (selectedPayment === 'paystack' && !formData.email) {
      addToast({ title: 'Email is required for Paystack payment', variant: 'error' });
      return;
    }

    if (selectedPayment === 'paystack') {
      // Validate card details
      if (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv || !cardData.cardName) {
        addToast({ title: 'Please fill in all card details', variant: 'error' });
        return;
      }

      // Validate card number (remove spaces and check length)
      const cleanCardNumber = cardData.cardNumber.replace(/\s/g, '');
      if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
        addToast({ title: 'Please enter a valid card number', variant: 'error' });
        return;
      }

      // Validate expiry date
      const [month, year] = cardData.expiryDate.split('/');
      if (!month || !year || month.length !== 2 || year.length !== 2) {
        addToast({ title: 'Please enter a valid expiry date (MM/YY)', variant: 'error' });
        return;
      }

      // Validate CVV
      if (cardData.cvv.length < 3 || cardData.cvv.length > 4) {
        addToast({ title: 'Please enter a valid CVV', variant: 'error' });
        return;
      }
    }

    if (selectedPayment === 'paystack') {
      await handlePaystackPayment();
    } else {
      handleRegularPayment();
    }
  };

  const handleRegularPayment = () => {
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

  const handlePaystackPayment = async () => {
    setIsProcessingPayment(true);
    
    try {
      // First create the order
      const order = createOrder({
        items: cartItems.map(i => ({ id: i.id, name: i.name, image: i.image, brand: i.brand, quantity: i.quantity, unitPrice: i.price, total: i.price * i.quantity, slug: i.slug })),
        totals,
        shippingAddress: formData,
        paymentMethod: selectedPayment,
      });

      // Prepare payment data
      const paymentData = {
        orderId: order.id,
        amount: totals.grandTotal,
        email: formData.email
      };

      // Validate payment data
      const validation = validatePaymentData(paymentData);
      if (!validation.isValid) {
        addToast({ 
          title: 'Validation Error', 
          description: validation.errors.join(', '), 
          variant: 'error' 
        });
        return;
      }

      let paymentResponse;
      
      try {
        // Try to create payment with backend first
        paymentResponse = await createPayment(paymentData);
      } catch (backendError) {
        console.warn('Backend payment creation failed, using fallback:', backendError.message);
        // Use fallback if backend is not available
        paymentResponse = await createPaymentFallback(paymentData);
        
        // Show warning about using test mode
        // addToast({ 
        //   title: 'Test Mode', 
        //   description: 'Using test payment mode. Backend not available.', 
        //   variant: 'warning' 
        // });
      }

      // Validate payment response
      const responseValidation = validatePaymentResponse(paymentResponse);
      if (!responseValidation.isValid) {
        addToast({ 
          title: 'Payment Error', 
          description: responseValidation.errors.join(', '), 
          variant: 'error' 
        });
        return;
      }

      // Process Paystack payment
      await processPaystackPayment(
        {
          ...paymentResponse,
          email: formData.email,
          amount: totals.grandTotal,
          orderId: order.id
        },
        (response) => {
          // Payment successful
          clearCart();
          addToast({ 
            title: 'Payment Successful!', 
            description: 'Redirecting to payment confirmation...', 
            variant: 'success' 
          });
          // Redirect to payment success page with reference
          window.location.href = `/payment-success?reference=${response.reference}&trxref=${response.trxref}`;
        },
        (error) => {
          // Payment failed or cancelled
          addToast({ 
            title: 'Payment Failed', 
            description: error.message || 'Payment was cancelled', 
            variant: 'error' 
          });
        }
      );
    } catch (error) {
      addToast({ 
        title: 'Payment Error', 
        description: error.message || 'Failed to process payment', 
        variant: 'error' 
      });
    } finally {
      setIsProcessingPayment(false);
    }
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
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
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
                <div className="space-y-3">
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
                  
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="paystack"
                      checked={selectedPayment === 'paystack'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">Paystack (Card, Bank Transfer, USSD)</span>
                  </label>
                </div>
              </div>

              {/* Card Details Form - Only show when Paystack is selected */}
              {selectedPayment === 'paystack' && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="flex space-x-2 mr-3">
                      <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">V</div>
                      <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">M</div>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">Card Details</h3>
                  </div>
                  <div className="space-y-4">
                    {/* Card Number */}
                    <div>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.cardNumber}
                        onChange={handleCardInputChange}
                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                        maxLength={19}
                      />
                    </div>
                    
                    {/* Card Name */}
                    <div>
                      <input
                        type="text"
                        name="cardName"
                        placeholder="Cardholder Name"
                        value={cardData.cardName}
                        onChange={handleCardInputChange}
                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                      />
                    </div>
                    
                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={cardData.expiryDate}
                          onChange={handleCardInputChange}
                          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                          maxLength={5}
                        />
                      </div>
                      <div className="relative">
                        <input
                          type={showCVV ? "text" : "password"}
                          name="cvv"
                          placeholder="CVV"
                          value={cardData.cvv}
                          onChange={handleCardInputChange}
                          className="w-full px-4 py-3 pr-10 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                          maxLength={4}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCVV(!showCVV)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showCVV ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Your card details are secure and encrypted
                  </div>
                </div>
              )}


              {/* Place Order Button */}
              <button
                onClick={handleSubmit}
                disabled={isProcessingPayment}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
              >
                {isProcessingPayment ? 'Processing Payment...' : 'Place order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;