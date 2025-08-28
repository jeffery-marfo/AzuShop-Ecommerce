import { ChevronRight } from 'lucide-react';
import herobg from '../assets/images/herobg.png'

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src= {herobg}
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
    
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Next-Gen
            <br />
            Mobility
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
            Power, performance, and style—experience the future of smartphones today
          </p>
          
          {/* CTA Button */}
          <button className="group inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-lg font-medium text-base hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-transparent hover:border-gray-300">
            <span>Shop Now</span>
            <ChevronRight 
              size={20} 
              className="ml-2 group-hover:translate-x-1 transition-transform duration-300" 
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;