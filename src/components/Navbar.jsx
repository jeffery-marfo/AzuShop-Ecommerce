import { useState } from 'react';
import { useNavigate } from 'react-router'; 
import { Home, ShoppingBag, ShoppingCart, Heart, LogIn, UserPlus, Menu, X } from 'lucide-react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

function Navbar({ initialTab = 'Home', onTabChange }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Add this hook

  const handleTabClick = (tabName, route) => {
    setActiveTab(tabName);
    setIsMobileMenuOpen(false);
    
    // Navigate to route if provided
    if (route) {
      navigate(route);
    }
    
    // Call parent callback if provided
    if (onTabChange) {
      onTabChange(tabName);
    }
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Updated navigation items with routes
  const navigationItems = [
    { name: 'Home', icon: Home, route: '/' },
    { name: 'shop', icon: ShoppingBag, route: '/shop' }, // Add route here
    { name: 'Cart', icon: ShoppingCart, route: '/cart' },
    { name: 'Favourite', icon: Heart, route: '/favourite' }
  ];

  const authItems = [
    { name: 'Login', icon: LogIn, onClick: handleLoginClick },
    { name: 'Register', icon: UserPlus, onClick: handleRegisterClick }
  ];

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 px-4 sm:px-6 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-semibold text-gray-900 flex-shrink-0">
            Azushop
          </div>
          
          {/* Desktop Navigation Items - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationItems.map(({ name, icon: Icon, route }) => (
              <div 
                key={name}
                onClick={() => handleTabClick(name, route)} // Pass route to handler
                className={`flex items-center space-x-2 cursor-pointer relative pb-1 transition-colors duration-200 ${
                  activeTab === name 
                    ? 'text-gray-900' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{name}</span>
                {activeTab === name && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full transition-all duration-300"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Desktop Auth Items - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-shrink-0">
            {authItems.map(({ name, icon: Icon, onClick }) => (
              <div 
                key={name}
                onClick={onClick}
                className="flex items-center space-x-1 lg:space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200"
              >
                <Icon size={20} />
                <span className="text-sm font-medium hidden lg:inline">{name}</span>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-700 hover:text-gray-900 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Items */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Navigation
                </h3>
                {navigationItems.map(({ name, icon: Icon, route }) => (
                  <div 
                    key={name}
                    onClick={() => handleTabClick(name, route)} // Pass route to handler
                    className={`flex items-center space-x-3 cursor-pointer py-2 px-3 rounded-lg transition-colors duration-200 ${
                      activeTab === name 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-base font-medium">{name}</span>
                  </div>
                ))}
              </div>

              {/* Mobile Auth Items */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Account
                </h3>
                <div className="space-y-3">
                  {authItems.map(({ name, icon: Icon, onClick }) => (
                    <div 
                      key={name}
                      onClick={onClick}
                      className="flex items-center space-x-3 cursor-pointer py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                    >
                      <Icon size={20} />
                      <span className="text-base font-medium">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Background Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-[#D5D3D3]/60  z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={handleCloseLoginModal}
        onSwitchToRegister={handleSwitchToRegister}
      />

      {/* Register Modal */}
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={handleCloseRegisterModal}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
}

export default Navbar;