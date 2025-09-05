import { BrowserRouter, Route, Routes } from "react-router"
import RootLayout from "./layouts/RootLayout"
import Landing from "./Pages/Landing"
import ShopPage from "./Pages/ShopPage"


function App() {
  

  return (
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<RootLayout/>}>
      <Route index element={<Landing/>}/>
      <Route path="/shop" element={<ShopPage/>}/>

    </Route>

   </Routes>
   </BrowserRouter>
  )
}

export default App
