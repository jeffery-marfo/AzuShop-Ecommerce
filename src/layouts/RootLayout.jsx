// import React from 'react'

// import Navbar from '../components/Navbar'
// import { Outlet } from 'react-router'
// import Footer from '../components/Footer'

// const RootLayout = () => {
//   return (
//     <div>
//         <Navbar/>
//         <Outlet/>
//         <Footer/>
//     </div>
//   )
// }

// export default RootLayout

import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar/>
        <main className="flex-1">
          <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default RootLayout