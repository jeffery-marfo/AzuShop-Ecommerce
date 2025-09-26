import React from 'react';
import { ChevronLeft, Eye } from 'lucide-react';

export default function AdminOrdersPage() {
  const orders = [
    {
      id: 1,
      image: "/api/placeholder/50/35",
      orderId: "65374b8fb1be49c3f658",
      date: "2025-03-1",
      total: "$1250.00",
      paid: "completed",
      delivered: "Pending"
    },
    {
      id: 2,
      image: "/api/placeholder/50/35",
      orderId: "65374b8fb1be49c3f658",
      date: "2025-03-1",
      total: "$1250.00",
      paid: "completed",
      delivered: "Delivered"
    },
    {
      id: 3,
      image: "/api/placeholder/50/35",
      orderId: "65374b8fb1be49c3f658",
      date: "2025-03-1",
      total: "$1250.00",
      paid: "completed",
      delivered: "Pending"
    },
    {
      id: 4,
      image: "/api/placeholder/50/35",
      orderId: "65374b8fb1be49c3f658",
      date: "2025-03-1",
      total: "$1250.00",
      paid: "completed",
      delivered: "Delivered"
    },
    {
      id: 5,
      image: "/api/placeholder/50/35",
      orderId: "65374b8fb1be49c3f658",
      date: "2025-03-1",
      total: "$1250.00",
      paid: "completed",
      delivered: "Pending"
    },
    {
      id: 6,
      image: "/api/placeholder/50/35",
      orderId: "65374b8fb1be49c3f658",
      date: "2025-03-1",
      total: "$1250.00",
      paid: "completed",
      delivered: "Pending"
    }
  ];

  const handleViewOrder = (orderId) => {
    console.log('View order:', orderId);
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
          
          <h1 className="text-blue-600 text-xl font-medium">Orders</h1>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 ">
                <th className="text-left py-4 px-6 font-medium text-gray-700">Image</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Id</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Total</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Paid</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Delivered</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className=" hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <img 
                      src={order.image} 
                      alt="Product"
                      className="w-12 h-8 object-cover rounded "
                    />
                  </td>
                  <td className="py-4 px-6 font-mono text-sm text-gray-800">
                    {order.orderId}
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    {order.date}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-800">
                    {order.total}
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {order.paid}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {order.delivered === "Delivered" ? (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {order.delivered}
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        {order.delivered}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <button 
                      onClick={() => handleViewOrder(order.orderId)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}