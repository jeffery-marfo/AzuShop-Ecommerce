
import { ChevronLeft, Eye } from "lucide-react";
import Apple from "../assets/images/Apple.png";

function OrderHistory() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center">
          <ChevronLeft className="w-5 h-5 text-gray-600 mr-2" />
          <span className="text-gray-600 text-sm">Back</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 lg:px-8 xl:px-12">
        {/* Tab Navigation */}
        <div className="flex space-x-4 sm:space-x-8 mb-6 overflow-x-auto">
          <button className="text-gray-500 text-sm pb-1 whitespace-nowrap">Update Profile</button>
          <button className="text-blue-600 text-sm pb-1 border-b-2 border-blue-600 font-medium whitespace-nowrap">
            My orders
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-100 px-4 py-3">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-600">
              <div>Image</div>
              <div>Id</div>
              <div>Date</div>
              <div>Total</div>
              <div>Paid</div>
              <div>Delivered</div>
            </div>
          </div>

          {/* Table Row */}
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="grid grid-cols-6 gap-4 items-center">
              {/* Image */}
              <div>
                <img 
                  src={Apple} 
                  alt="Apple MacBook Pro" 
                  className="w-16 h-12 object-cover rounded"
                />
              </div>

              {/* ID */}
              <div className="text-sm text-gray-700 break-all">
                6537b4b8b1be49cc3f658
              </div>

              {/* Date */}
              <div className="text-sm text-gray-700">
                2025-03-1
              </div>

              {/* Total */}
              <div className="text-sm text-gray-700">
                $ 1250.00
              </div>

              {/* Paid Status */}
              <div>
                <span className="inline-flex items-center px-4.5 py-2.5 rounded-sm text-xs font-medium bg-[#77C053] text-white">
                  Completed
                </span>
              </div>

              {/* Delivered Status */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-4.5 py-2.5 rounded-sm text-xs font-medium bg-[#F7E9EA] text-black">
                  Pending
                </span>
                <button className="bg-[#003087] hover:bg-blue-700 text-white p-2 rounded-sm ml-2">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Card Layout */}
        <div className="md:hidden space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-start space-x-4 mb-4">
              <img 
                src={Apple} 
                alt="Apple MacBook Pro" 
                className="w-16 h-12 sm:w-20 sm:h-16 object-cover rounded flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 mb-1">Order ID</div>
                <div className="text-sm text-gray-700 break-all mb-2">
                  6537b4b8b1be49cc3f658
                </div>
                <div className="text-xs text-gray-500 mb-1">Date</div>
                <div className="text-sm text-gray-700 mb-2">2025-03-1</div>
                <div className="text-xs text-gray-500 mb-1">Total</div>
                <div className="text-sm font-semibold text-gray-700">$ 1250.00</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">Paid:</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium bg-[#77C053] text-white">
                    Completed
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">Delivered:</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium bg-[#F7E9EA] text-black">
                    Pending
                  </span>
                </div>
              </div>
              <button className="bg-[#003087] hover:bg-blue-700 text-white p-2 rounded-sm self-start sm:self-auto">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;