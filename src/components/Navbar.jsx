// import { Home, ShoppingBag, ShoppingCart, Heart, LogIn, UserPlus } from 'lucide-react';

// function Navbar() {
//   return (
//     <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
//       <div className="flex items-center justify-between">
//         {/* Logo */}
//         <div className="text-xl font-semibold text-gray-900">
//           Azushop
//         </div>
        
//         {/* Navigation Items */}
//         <div className="flex items-center space-x-8">
//           {/* Home */}
//           <div className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer">
//             <Home size={20} />
//             <span className="text-sm font-medium">Home</span>
//           </div>
          
//           {/* Shop */}
//           <div className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer">
//             <ShoppingBag size={20} />
//             <span className="text-sm font-medium">shop</span>
//           </div>
          
//           {/* Cart */}
//           <div className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer">
//             <ShoppingCart size={20} />
//             <span className="text-sm font-medium">Cart</span>
//           </div>
          
//           {/* Favourite */}
//           <div className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer">
//             <Heart size={20} />
//             <span className="text-sm font-medium">Favourite</span>
//           </div>
//         </div>
        
//         {/* Right side actions */}
//         <div className="flex items-center space-x-6">
//           {/* Login */}
//           <div className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer">
//             <LogIn size={20} />
//             <span className="text-sm font-medium">Login</span>
//           </div>
          
//           {/* Register */}
//           <div className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer">
//             <UserPlus size={20} />
//             <span className="text-sm font-medium">Register</span>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import { useState } from 'react';
import { Home, ShoppingBag, ShoppingCart, Heart, LogIn, UserPlus } from 'lucide-react';

function Navbar({ initialTab = 'Home', onTabChange }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    // Call parent callback if provided
    if (onTabChange) {
      onTabChange(tabName);
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold text-gray-900">
          Azushop
        </div>
        
        {/* Navigation Items */}
        <div className="flex items-center space-x-8">
          {/* Home */}
          <div 
            onClick={() => handleTabClick('Home')}
            className={`flex items-center space-x-2 cursor-pointer relative pb-1 transition-colors duration-200 ${
              activeTab === 'Home' 
                ? 'text-gray-900' 
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <Home size={20} />
            <span className="text-sm font-medium">Home</span>
            {activeTab === 'Home' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full transition-all duration-300"></div>
            )}
          </div>
          
          {/* Shop */}
          <div 
            onClick={() => handleTabClick('shop')}
            className={`flex items-center space-x-2 cursor-pointer relative pb-1 transition-colors duration-200 ${
              activeTab === 'shop' 
                ? 'text-gray-900' 
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <ShoppingBag size={20} />
            <span className="text-sm font-medium">shop</span>
            {activeTab === 'shop' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full transition-all duration-300"></div>
            )}
          </div>
          
          {/* Cart */}
          <div 
            onClick={() => handleTabClick('Cart')}
            className={`flex items-center space-x-2 cursor-pointer relative pb-1 transition-colors duration-200 ${
              activeTab === 'Cart' 
                ? 'text-gray-900' 
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <ShoppingCart size={20} />
            <span className="text-sm font-medium">Cart</span>
            {activeTab === 'Cart' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full transition-all duration-300"></div>
            )}
          </div>
          
          {/* Favourite */}
          <div 
            onClick={() => handleTabClick('Favourite')}
            className={`flex items-center space-x-2 cursor-pointer relative pb-1 transition-colors duration-200 ${
              activeTab === 'Favourite' 
                ? 'text-gray-900' 
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <Heart size={20} />
            <span className="text-sm font-medium">Favourite</span>
            {activeTab === 'Favourite' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full transition-all duration-300"></div>
            )}
          </div>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-6">
          {/* Login */}
          <div className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200">
            <LogIn size={20} />
            <span className="text-sm font-medium">Login</span>
          </div>
          
          {/* Register */}
          <div className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200">
            <UserPlus size={20} />
            <span className="text-sm font-medium">Register</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;