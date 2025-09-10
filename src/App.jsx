import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Landing from "./Pages/Landing";
import ShopPage from "./Pages/ShopPage";

import Cart from "./components/Cart";
import FavouritePage from "./components/FavouritePage";
import ProductDetailPage from "./Pages/ProductDetailPage";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
