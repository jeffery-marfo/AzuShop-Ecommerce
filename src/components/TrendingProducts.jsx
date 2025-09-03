
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Macbook from "../assets/images/Macbook.png"
import iphones from "../assets/images/iphones.png"
import Lens from "../assets/images/Lens.png"

function TrendingProducts() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -5
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        delay: 0.5
      }
    }
  };

  const products = [
    {
      title: "Macbook",
      description: "Up to 50% off laptop",
      image: Macbook,
      bgColor: "bg-blue-50",
      alt: "MacBook"
    },
    {
      title: "Iphones", 
      description: "Free shipping",
      image: iphones,
      bgColor: "bg-blue-100",
      alt: "iPhone"
    },
    {
      title: "Digital Lens",
      description: "Up to 40% off Camera", 
      image: Lens,
      bgColor: "bg-gray-100",
      alt: "Digital Camera Lens"
    }
  ];

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-10 lg:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Top Trending Products
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base text-gray-600 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover the latest must-have items that are taking the market by storm. Stay ahead with our curated collection of trending products designed to elevate your lifestyle.
          </motion.p>
        </motion.div>

        {/* Product Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product, index) => (
            <motion.div 
              key={product.title}
              className={`${product.bgColor} rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden group cursor-pointer`}
              variants={cardVariants}
              whileHover={{ 
                scale: [1, 1.02, 1.03], 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative z-10">
                <motion.h3 
                  className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                >
                  {product.title}
                </motion.h3>
                <motion.p 
                  className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 lg:mb-8"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                >
                  {product.description}
                </motion.p>
                
                {/* Product Image */}
                <motion.div 
                  className="mb-4 sm:mb-6 lg:mb-8 flex justify-center"
                  variants={imageVariants}
                >
                  <img 
                    src={product.image} 
                    alt={product.alt} 
                    className="w-full max-w-[200px] sm:max-w-[240px] lg:max-w-xs h-32 sm:h-40 lg:h-48 object-contain"
                  />
                </motion.div>
                
                {/* Shop Now Button */}
                <motion.button 
                  className="group/btn inline-flex items-center text-gray-900 font-medium hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-1"
                  variants={buttonVariants}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Shop ${product.title} now`}
                >
                  <span className="underline underline-offset-2">Shop now</span>
                  <ArrowRight 
                    size={14} 
                    className="ml-1 sm:ml-2 group-hover/btn:translate-x-2 transition-transform duration-300 sm:size-4" 
                  />
                </motion.button>
              </div>

              {/* Decorative background elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default TrendingProducts;