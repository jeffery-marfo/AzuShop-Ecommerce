import { ChevronRight } from 'lucide-react';
import herobg from '../assets/images/herobg.png'

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={herobg}
          alt="Hero Background" 
          className="w-full h-full object-cover object-center"
        />
        {/* Optional dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 sm:bg-black/10"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6">
              <span className="block">Next-Gen</span>
              <span className="block">Mobility</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-sm sm:max-w-md lg:max-w-xl">
              Power, performance, and style—experience the future of smartphones today
            </p>
            
            {/* CTA Button */}
            <button className="group inline-flex items-center bg-white text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-transparent hover:border-gray-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent">
              <span>Shop Now</span>
              <ChevronRight 
                size={18} 
                className="ml-2 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300" 
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;