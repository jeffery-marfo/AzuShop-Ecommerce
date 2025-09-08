import { BrowserRouter, Route, Routes } from "react-router"
import RootLayout from "./layouts/RootLayout"
import Landing from "./Pages/Landing"
import ShopPage from "./Pages/ShopPage"
import ShopDetail from "./Pages/ShopDetail"
import Cart from "./components/Cart"
import FavouritePage from "./components/FavouritePage"



function App() {
  

  return (
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<RootLayout/>}>
      <Route index element={<Landing/>}/>
      <Route path="/shop" element={<ShopPage/>}/>
      <Route path='/shop/shopdetail' element={<ShopDetail/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/favourite" element={<FavouritePage/>}/>


    </Route>

   </Routes>
   </BrowserRouter>
  )
}

export default App
