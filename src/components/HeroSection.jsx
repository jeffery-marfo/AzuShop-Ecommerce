
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import herobg from '../assets/images/herobg.png';
import HeroBG1 from '../assets/images/HeroBG1.png';
import HeroBG2 from '../assets/images/HeroBG2.png';

function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: ["Next-Gen", "Mobility"],
      subtitle: "Power, performance, and style—experience the future of smartphones today",
      buttonText: "Shop Now",
      backgroundImage: herobg,
     
    },
    {
      id: 2,
      title: ["Capture Every", "Moment"],
      subtitle: "Experience exceptional clarity and precision with our new high-performance cameras.",
      buttonText: "Shop collection",
      backgroundImage: HeroBG1, 
      
    },
    {
      id: 3,
      title: ["Power Meets", "Portability"],
      subtitle: "Unmatched performance and sleek design—built for work and play.",
      buttonText: "Shop collection",
      backgroundImage: HeroBG2, 
      
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Images Container */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.backgroundImage}
              alt={`${slide.title.join(' ')} Background`}
              className="w-full h-full object-cover object-center"
            />
            {/* Dynamic gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-80`}></div>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Content Container */}
      <div className="relative z-10 w-full px-16 sm:px-20 lg:px-24 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            {/* Animated Content */}
            <div
              key={currentSlide}
              className="animate-fadeInUp"
            >
              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6">
                <span className="block">{slides[currentSlide].title[0]}</span>
                <span className="block">{slides[currentSlide].title[1]}</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-sm sm:max-w-md lg:max-w-xl">
                {slides[currentSlide].subtitle}
              </p>
              
              {/* CTA Button */}
              <button className="group inline-flex items-center bg-white text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-transparent hover:border-gray-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent">
                <span>{slides[currentSlide].buttonText}</span>
                <ChevronRight 
                  size={18} 
                  className="ml-2 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`
          }}
        />
      </div>
    </section>
  );
}

export default HeroCarousel;