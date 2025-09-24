import { ChevronLeft } from "lucide-react";
import Apple from "../assets/images/Apple.png";
import iPhone from "../assets/images/iPhone.png";
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);
  const { addToCart } = useStore();
  const { addToast } = useToast();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 mr-2" />
            <span className="text-gray-800 text-sm sm:text-base font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Page Title */}
        <h1 className="text-xl sm:text-2xl font-semibold text-[#003087] mb-6 sm:mb-8">Order {order?.id || ''}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Side - Orders Table */}
<div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Mobile Table with Fixed Headers */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] sm:min-w-0">
                  {/* Table Header */}
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-600 w-16 sm:w-20">
                        Image
                      </th>
                      <th className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-600 w-40 sm:w-auto">
                        Product
                      </th>
                      <th className="px-3 py-3 text-center text-xs sm:text-sm font-medium text-gray-600 w-20">
                        Quantity
                      </th>
                      <th className="px-3 py-3 text-center text-xs sm:text-sm font-medium text-gray-600 w-24">
                        Unit Price
                      </th>
                      <th className="px-3 py-3 text-center text-xs sm:text-sm font-medium text-gray-600 w-24">
                        Total
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-100">
                    {(order?.items || []).map((item, idx) => (
                      <tr key={item.id}>
                        {/* Image */}
                        <td className="px-3 py-3 sm:py-4 w-16 sm:w-20">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-10 h-8 sm:w-14 sm:h-10 object-contain rounded mx-auto"
                          />
                        </td>

                        {/* Product */}
                        <td className="px-3 py-3 sm:py-4 w-40 sm:w-auto">
                          <div className="text-xs sm:text-sm text-gray-700 leading-tight">
                            {item.name}
                          </div>
                        </td>

                        {/* Quantity */}
                        <td className="px-3 py-3 sm:py-4 w-20 text-center">
                          <span className="text-xs sm:text-sm text-gray-700">
                            {item.quantity}
                          </span>
                        </td>

                        {/* Unit Price */}
                        <td className="px-3 py-3 sm:py-4 w-24 text-center">
                          <span className="text-xs sm:text-sm text-gray-700">
                            ${Number(item.unitPrice).toFixed(2)}
                          </span>
                        </td>

                        {/* Total */}
                        <td className="px-3 py-3 sm:py-4 w-24 text-center">
                          <span className="text-xs sm:text-sm font-medium text-gray-700">
                            ${Number(item.total).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Side - Shipping Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-[#003087] mb-4 sm:mb-6">Shipping</h2>
              
              {/* Shipping Details */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start">
                  <span className="text-xs sm:text-sm text-[#003087] font-medium mb-1 xs:mb-0">Order:</span>
                  <span className="text-xs sm:text-sm text-gray-800 break-all xs:ml-2">{order?.id}</span>
                </div>
                
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start">
                  <span className="text-xs sm:text-sm text-[#003087] font-medium mb-1 xs:mb-0">Name:</span>
                  <span className="text-xs sm:text-sm text-gray-800 xs:ml-2">—</span>
                </div>
                
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start">
                  <span className="text-xs sm:text-sm text-[#003087] font-medium mb-1 xs:mb-0">Email:</span>
                  <span className="text-xs sm:text-sm text-gray-800 break-all xs:ml-2">—</span>
                </div>
                
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start">
                  <span className="text-xs sm:text-sm text-[#003087] font-medium mb-1 xs:mb-0">Address:</span>
                  <span className="text-xs sm:text-sm text-gray-800 xs:ml-2">{order?.shippingAddress?.address}, {order?.shippingAddress?.city} {order?.shippingAddress?.postalCode}, {order?.shippingAddress?.country}</span>
                </div>
                
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start">
                  <span className="text-xs sm:text-sm text-[#003087] font-medium mb-1 xs:mb-0">Method:</span>
                  <span className="text-xs sm:text-sm text-gray-800 xs:ml-2">{order?.paymentMethod}</span>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4 sm:pt-6">
                <h3 className="text-base sm:text-lg font-semibold text-[#003087] mb-3 sm:mb-4">Order Summary</h3>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-[#003087] font-medium">Items:</span>
                    <span className="text-xs sm:text-sm text-gray-800">$ {order ? order.totals.itemsTotal.toFixed(2) : '0.00'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-[#003087] font-medium">Shipping:</span>
                    <span className="text-xs sm:text-sm text-gray-800">$ {order ? order.totals.shipping.toFixed(2) : '0.00'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-[#003087] font-medium">Tax:</span>
                    <span className="text-xs sm:text-sm text-gray-800">$ {order ? order.totals.tax.toFixed(2) : '0.00'}</span>
                  </div>
                  
                  <div className="flex justify-between pt-2 sm:pt-3 border-t border-gray-200">
                    <span className="text-sm sm:text-sm text-[#003087] font-semibold">Total:</span>
                    <span className="text-sm sm:text-sm text-gray-800 font-semibold">$ {order ? order.totals.grandTotal.toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="pt-3">
                    <button
                      onClick={() => {
                        if (!order) return;
                        order.items.forEach((it) => {
                          addToCart({ id: it.id, name: it.name, image: it.image, brand: it.brand, price: it.unitPrice, slug: it.slug }, it.quantity);
                        });
                        addToast({ title: 'Items added to cart', description: `Order ${order.id}`, variant: 'success' });
                        navigate('/cart');
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-sm"
                    >
                      Buy again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;