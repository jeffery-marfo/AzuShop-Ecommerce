import React from 'react';
import { Eye } from 'lucide-react';

export default function MyOrders() {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Tabs */}
        <div className="flex gap-8 mb-6">
          <button className="text-gray-600 hover:text-gray-800 font-medium">
            Update Profile
          </button>
          <button className="text-gray-800 font-medium border-b-2 border-gray-800 pb-1">
            My orders
          </button>
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
              <tr className=" hover:bg-gray-50">
                <td className="py-4 px-6">
                  <img 
                    src="/api/placeholder/48/48" 
                    alt="Product" 
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="py-4 px-6 font-mono text-sm text-gray-800">
                  65374b8fb1be49c3fe58
                </td>
                <td className="py-4 px-6 text-gray-800">
                  2025-03-1
                </td>
                <td className="py-4 px-6 font-semibold text-gray-800">
                  $1250.00
                </td>
                <td className="py-4 px-6">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Completed
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-500">
                  Pending
                </td>
                <td className="py-4 px-6">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}