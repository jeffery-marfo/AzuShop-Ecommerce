import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function AdminOrderDetailsPage() {
  const orderItems = [
    {
      id: 1,
      image: "/api/placeholder/50/35",
      product: "Apple MacBook Pro 2019 | 16",
      quantity: 1,
      unitPrice: 1250,
      total: 1250.00
    },
    {
      id: 2,
      image: "/api/placeholder/50/35",
      product: "iPhone 15",
      quantity: 1,
      unitPrice: 400,
      total: 1400.00
    },
    {
      id: 3,
      image: "/api/placeholder/50/35",
      product: "Apple MacBook Pro 2019 | 16",
      quantity: 1,
      unitPrice: 300,
      total: 1250.00
    },
    {
      id: 4,
      image: "/api/placeholder/50/35",
      product: "Apple MacBook Pro 2019 | 16",
      quantity: 1,
      unitPrice: 300,
      total: 1250.00
    }
  ];

  const handleMarkAsDelivered = () => {
    console.log('Order marked as delivered');
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center text-gray-600 hover:text-gray-800 mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          
          <h1 className="text-blue-600 text-xl font-medium">Order details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 ">
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Image</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Product</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Quantity</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Unit Price</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item.id} className=" hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <img 
                          src={item.image} 
                          alt={item.product}
                          className="w-12 h-8 object-cover rounded "
                        />
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        {item.product}
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        {item.quantity}
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        {item.unitPrice}
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        $ {item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Section - Single Card with Shipping & Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-[#003087] mb-4 sm:mb-6">Shipping</h2>
              
              {/* Shipping Details */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start">
                  <span className="text-xs sm:text-sm text-[#003087] font-medium mb-1 xs:mb-0">Order:</span>
                  <span className="text-xs sm:text-sm text-gray-800 break-all xs:ml-2">65374b8fb1be49c3f658</span>
                </div>
                
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start">
                  <span className="text-xs sm:text-sm text-[#003087] font-medium mb-1 xs:mb-0">Name:</span>
                  <span className="text-xs sm:text-sm text-gray-800 xs:ml-2">John Doe</span>
                </div>
                
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start">
                  <span className="text-xs sm:text-sm text-[#003087] font-medium mb-1 xs:mb-0">Email:</span>
                  <span className="text-xs sm:text-sm text-gray-800 break-all xs:ml-2">johndoe@gmail.com</span>
                </div>
                
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start">
                  <span className="text-xs sm:text-sm text-[#003087] font-medium mb-1 xs:mb-0">Address:</span>
                  <span className="text-xs sm:text-sm text-gray-800 xs:ml-2">AK-1129-7289, GH</span>
                </div>
                
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start">
                  <span className="text-xs sm:text-sm text-[#003087] font-medium mb-1 xs:mb-0">Method:</span>
                  <span className="text-xs sm:text-sm text-gray-800 xs:ml-2">PayStack</span>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4 sm:pt-6">
                <h3 className="text-base sm:text-lg font-semibold text-[#003087] mb-3 sm:mb-4">Order Summary</h3>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-[#003087] font-medium">Items:</span>
                    <span className="text-xs sm:text-sm text-gray-800">$ 5000.00</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-[#003087] font-medium">Shipping:</span>
                    <span className="text-xs sm:text-sm text-gray-800">$ 0</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-[#003087] font-medium">Tax:</span>
                    <span className="text-xs sm:text-sm text-gray-800">$ 20</span>
                  </div>
                  
                  <div className="flex justify-between pt-2 sm:pt-3 border-t border-gray-200">
                    <span className="text-sm sm:text-sm text-[#003087] font-semibold">Total:</span>
                    <span className="text-sm sm:text-sm text-gray-800 font-semibold">$ 5200.00</span>
                  </div>

                  {/* Mark as Delivered Button */}
                  <div className="pt-3">
                    <button
                      onClick={handleMarkAsDelivered}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-sm"
                    >
                      Mark as delivered
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border Line */}
        <div className="mt-12">
          <hr className="border-gray-300" />
        </div>
      </div>
    </div>
  );
}