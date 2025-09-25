import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import AdminProductsPage from "./Pages/Admin/Dashboard";
import CreateProductPage from "./Pages/Admin/CreateProduct";
import UpdateProductPage from "./Pages/Admin/UpdateProductPage";
import CategoryPage from "./Pages/Admin/CategoryPage";
import UpdateProfilePage from "./Pages/Admin/UpdateProfile";
import UsersPage from "./Pages/Admin/Users";
import AdminOrdersPage from "./Pages/Admin/AdminOrdersPage";
import AdminOrderDetailsPage from "./Pages/Admin/AdminOrderDetailsPage";
import UpdateCategoryPage from "./Pages/Admin/UpdateCategoryPage";
import Dashboard from "./Pages/Admin/Dashboard";

function App() {
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
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-detail/:orderId" element={<OrderDetail />} />
          <Route path="/my-orders" element={<MyOrders />} />
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/Create-Product" element={<CreateProductPage />} />
          <Route path="/UpdateProductPage" element={<UpdateProductPage />} />
          <Route path="/categorypage" element={<CategoryPage/>}/>
          <Route path="/update-profile" element={<UpdateProfilePage/>}/>
          <Route path="/userspage" element={<UsersPage/>}/>
          <Route path="/admin-order-page" element={<AdminOrdersPage/>} />
          <Route path="/admin-order-page/order-detail/:orderId" element={<AdminOrderDetailsPage />} />
          <Route path="/update-category-page" element={<UpdateCategoryPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
