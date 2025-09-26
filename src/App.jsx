import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Landing from "./Pages/Landing";
import ShopPage from "./Pages/ShopPage";

import Cart from "./components/Cart";
import FavouritePage from "./components/FavouritePage";
import ProductDetailPage from "./Pages/ProductDetailPage";

import OrderHistory from "./components/OrderHistory";
import CheckoutPage from "./components/CheckOutPage";
import OrderDetail from "./components/OrderDetails";
import MyOrders from "./components/MyOrders";
import PaymentSuccess from "./Pages/PaymentSuccess";
import Dashboard from "./Pages/Admin/Dashboard";
import CreateProductPage from "./Pages/Admin/CreateProduct";
import UpdateProductPage from "./Pages/Admin/UpdateProductPage";
import CategoryPage from "./Pages/Admin/CategoryPage";
import UpdateProfilePage from "./Pages/Admin/UpdateProfile";
import UsersPage from "./Pages/Admin/Users";
import AdminOrdersPage from "./Pages/Admin/AdminOrdersPage";
import AdminOrderDetailsPage from "./Pages/Admin/AdminOrderDetailsPage";
import UpdateCategoryPage from "./Pages/Admin/UpdateCategoryPage";
import AdminTestPage from "./Pages/AdminTestPage";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import AdminLoginModal from "./components/AdminLoginModal";
import AdminRegisterModal from "./components/AdminRegisterModal";
import { useState, useEffect } from "react";
import { isAdminAuthenticated, getCurrentUser } from "./services/auth";

// Protected Admin Route Component
function ProtectedAdminRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminAuth = () => {
      const adminAuth = isAdminAuthenticated();
      setIsAdmin(adminAuth);
      setIsLoading(false);
    };

    checkAdminAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

function App() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminRegister, setShowAdminRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleAdminLoginSuccess = (user, token) => {
    setCurrentUser(user);
    setShowAdminLogin(false);
    // Navigate to admin dashboard using React Router
    window.location.href = '/admin-dashboard';
  };

  const handleAdminRegistrationSuccess = () => {
    setShowAdminRegister(false);
    setShowAdminLogin(true);
  };

  const handleSwitchToAdminRegister = () => {
    setShowAdminLogin(false);
    setShowAdminRegister(true);
  };

  const handleSwitchToAdminLogin = () => {
    setShowAdminRegister(false);
    setShowAdminLogin(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Landing />} />
          <Route path="/shop" element={<ShopPage />} />
          {/* Dynamic route with slug parameter */}
          <Route path="/shop/:productSlug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favourite" element={<FavouritePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-detail/:orderId" element={<OrderDetail />} />
          <Route path="/my-orders" element={<MyOrders />} />
          {/* Admin Routes - Protected */}
          <Route path="/admin-dashboard" element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/create-product" element={
            <ProtectedAdminRoute>
              <CreateProductPage />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/update-product/:productId" element={
            <ProtectedAdminRoute>
              <UpdateProductPage />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/categories" element={
            <ProtectedAdminRoute>
              <CategoryPage />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/update-category/:categoryId" element={
            <ProtectedAdminRoute>
              <UpdateCategoryPage />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/profile" element={
            <ProtectedAdminRoute>
              <UpdateProfilePage />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedAdminRoute>
              <UsersPage />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedAdminRoute>
              <AdminOrdersPage />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/orders/:orderId" element={
            <ProtectedAdminRoute>
              <AdminOrderDetailsPage />
            </ProtectedAdminRoute>
          } />
        </Route>
        
        {/* Admin Auth Routes */}
        <Route path="/admin-login" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
                <p className="text-gray-600 mt-2">Sign in to access the admin dashboard</p>
              </div>
              <AdminLoginModal 
                isOpen={true}
                onClose={() => window.location.href = '/'}
                onSwitchToRegister={handleSwitchToAdminRegister}
                onLoginSuccess={handleAdminLoginSuccess}
              />
            </div>
          </div>
        } />
        
        <Route path="/admin-register" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Registration</h1>
                <p className="text-gray-600 mt-2">Create an admin account to access the dashboard</p>
              </div>
              <AdminRegisterModal 
                isOpen={true}
                onClose={() => window.location.href = '/'}
                onSwitchToLogin={handleSwitchToAdminLogin}
                onRegistrationSuccess={handleAdminRegistrationSuccess}
              />
            </div>
          </div>
        } />
        
        {/* Admin Test Page */}
        <Route path="/admin-test" element={<AdminTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
