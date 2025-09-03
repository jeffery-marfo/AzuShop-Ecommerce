import React from 'react';
import truck from "../assets/images/truck.png"
import packageBox from "../assets/images/packageBox.png"
import gem from "../assets/images/gem.png"

const Tracking = () => {
  const features = [
    {
      icon: truck,
      title: "Fast & free shipping",
      description: "Every single order ships for free. No minimums, no tiers, no fine print whatsoever.",
      alt: "Fast shipping"
    },
    {
      icon: packageBox,
      title: "Innovative, User-Centric Design",
      description: "Our cutting-edge designs prioritize performance, portability, and seamless integration into your lifestyle.",
      alt: "User-centric design"
    },
    {
      icon: gem,
      title: "Durable, High-Quality Materials",
      description: "We use premium aluminum, high-resolution OLED displays, and durable batteries for superior quality.",
      alt: "High-quality materials"
    }
  ];

  return (
    <section className="bg-[#01589A] text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
         
          <h2 className="text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold max-w-xs sm:max-w-md lg:max-w-2xl xl:max-w-3xl text-left leading-tight">
            We're tackling the biggest challenges in laptops and electronic products.
          </h2>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center sm:text-left lg:text-center group hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {/* Icon Container */}
              <div className="mb-4 sm:mb-5 lg:mb-6 flex justify-center sm:justify-start lg:justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
                  <img 
                    src={feature.icon} 
                    alt={feature.alt} 
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain filter brightness-0 invert" 
                  />
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-lg sm:text-xl lg:text-xl font-semibold mb-3 sm:mb-4 leading-snug">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-blue-100 leading-relaxed text-sm sm:text-base max-w-sm mx-auto sm:mx-0 lg:mx-auto group-hover:text-blue-50 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Tracking;