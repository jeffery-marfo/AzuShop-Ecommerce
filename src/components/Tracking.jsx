
// import truck from "../assets/images/truck.png"
// import packageBox from "../assets/images/packageBox.png"
// import gem from "../assets/images/gem.png"

// const Tracking = () => {
//   return (
//     <section className="bg-[#01589A] text-white py-16 px-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <h2 className="text-3xl md:text-4xl font-bold mb-16 max-w-2xl">
//           We're tackling the biggest challenges in laptops and electronic products.
//         </h2>
        
//         {/* Features Grid */}
//         <div className="grid md:grid-cols-3 gap-12">
//           {/* Feature 1 */}
//           <div className="text-center">
//             <div className="mb-6 flex justify-center">
//               <img src={truck} alt="Fast shipping" className="w-12 h-12" />
//             </div>
//             <h3 className="text-xl font-semibold mb-4">Fast & free shipping</h3>
//             <p className="text-blue-100 leading-relaxed">
//               Every single order ships for free. No minimums, no tiers, no fine print whatsoever.
//             </p>
//           </div>
          
//           {/* Feature 2 */}
//           <div className="text-center">
//             <div className="mb-6 flex justify-center">
//               <img src={packageBox} alt="User-centric design" className="w-12 h-12" />
//             </div>
//             <h3 className="text-xl font-semibold mb-4">Innovative, User-Centric Design</h3>
//             <p className="text-blue-100 leading-relaxed">
//               Our cutting-edge designs prioritize performance, portability, and seamless integration into your lifestyle.
//             </p>
//           </div>
          
//           {/* Feature 3 */}
//           <div className="text-center">
//             <div className="mb-6 flex justify-center">
//               <img src={gem} alt="High-quality materials" className="w-12 h-12" />
//             </div>
//             <h3 className="text-xl font-semibold mb-4">Durable, High-Quality Materials</h3>
//             <p className="text-blue-100 leading-relaxed">
//               We use premium aluminum, high-resolution OLED displays, and durable batteries for superior quality.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Tracking;

import React from 'react';
import truck from "../assets/images/truck.png"
import packageBox from "../assets/images/packageBox.png"
import gem from "../assets/images/gem.png"

const Tracking = () => {
  return (
    <section className="bg-[#01589A] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold mb-16 max-w-2xl text-left">
          We're tackling the biggest challenges in laptops and electronic products.
        </h2>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="text-left">
            <div className="mb-6">
              <img src={truck} alt="Fast shipping" className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Fast & free shipping</h3>
            <p className="text-blue-100 leading-relaxed">
              Every single order ships for free. No minimums, no tiers, no fine print whatsoever.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="text-left">
            <div className="mb-6">
              <img src= {packageBox} alt="User-centric design" className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Innovative, User-Centric Design</h3>
            <p className="text-blue-100 leading-relaxed">
              Our cutting-edge designs prioritize performance, portability, and seamless integration into your lifestyle.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <img src={gem} alt="High-quality materials" className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Durable, High-Quality Materials</h3>
            <p className="text-blue-100 leading-relaxed">
              We use premium aluminum, high-resolution OLED displays, and durable batteries for superior quality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tracking;

// import React from 'react';

// const FeaturesSection = () => {
//   return (
//     <section className="bg-blue-600 text-white py-16 px-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <h2 className="text-3xl md:text-4xl font-bold mb-16 max-w-2xl text-left">
//           We're tackling the biggest challenges in laptops and electronic products.
//         </h2>
        
//         {/* Features Grid */}
//         <div className="grid md:grid-cols-3 gap-12">
//           {/* Feature 1 */}
//           <div className="text-left">
//             <div className="mb-6 flex justify-center">
//               <img src="" alt="Fast shipping" className="w-12 h-12" />
//             </div>
//             <h3 className="text-xl font-semibold mb-4">Fast & free shipping</h3>
//             <p className="text-blue-100 leading-relaxed">
//               Every single order ships for free. No minimums, no tiers, no fine print whatsoever.
//             </p>
//           </div>
          
//           {/* Feature 2 */}
//           <div className="text-left">
//             <div className="mb-6 flex justify-center">
//               <img src="" alt="User-centric design" className="w-12 h-12" />
//             </div>
//             <h3 className="text-xl font-semibold mb-4">Innovative, User-Centric Design</h3>
//             <p className="text-blue-100 leading-relaxed">
//               Our cutting-edge designs prioritize performance, portability, and seamless integration into your lifestyle.
//             </p>
//           </div>
          
//           {/* Feature 3 */}
//           <div className="text-left">
//             <div className="mb-6">
//               <img src="" alt="High-quality materials" className="w-12 h-12" />
//             </div>
//             <h3 className="text-xl font-semibold mb-4">Durable, High-Quality Materials</h3>
//             <p className="text-blue-100 leading-relaxed">
//               We use premium aluminum, high-resolution OLED displays, and durable batteries for superior quality.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;