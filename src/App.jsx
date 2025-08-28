import { BrowserRouter, Route, Routes } from "react-router"
import RootLayout from "./layouts/RootLayout"
import Landing from "./Pages/Landing"


function App() {
  

  return (
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<RootLayout/>}>
      <Route index element={<Landing/>}/>

    </Route>

   </Routes>
   </BrowserRouter>
  )
}

export default App
