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

  return (
    <section className="w-full py-16 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Top Trending Products
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover the latest must-have items that are taking the market by storm. Stay ahead with our curated collection of trending products designed to elevate your lifestyle.
          </motion.p>
        </motion.div>

        {/* Product Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Macbook Card */}
          <motion.div 
            className="bg-blue-50 rounded-2xl p-8 relative overflow-hidden group cursor-pointer"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative z-10">
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Macbook
              </motion.h3>
              <motion.p 
                className="text-gray-700 mb-8"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Up to 50% off laptop
              </motion.p>
              
              {/* Macbook Image */}
              <motion.div 
                className="mb-8 flex justify-center"
                variants={imageVariants}
              >
                <img 
                  src={Macbook} 
                  alt="MacBook" 
                  className="w-full max-w-xs h-48 object-contain"
                />
              </motion.div>
              
              {/* Shop Now Button */}
              <motion.button 
                className="group/btn inline-flex items-center text-gray-900 font-medium hover:text-blue-600 transition-colors duration-200"
                variants={buttonVariants}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="underline underline-offset-2">Shop now</span>
                <ArrowRight 
                  size={16} 
                  className="ml-2 group-hover/btn:translate-x-2 transition-transform duration-300" 
                />
              </motion.button>
            </div>
          </motion.div>

          {/* iPhone Card */}
          <motion.div 
            className="bg-blue-100 rounded-2xl p-8 relative overflow-hidden group cursor-pointer"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative z-10">
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Iphones
              </motion.h3>
              <motion.p 
                className="text-gray-700 mb-8"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Free shipping
              </motion.p>
              
              {/* iPhone Image */}
              <motion.div 
                className="mb-8 flex justify-center"
                variants={imageVariants}
              >
                <img 
                  src={iphones} 
                  alt="iPhone" 
                  className="w-full max-w-xs h-48 object-contain"
                />
              </motion.div>
              
              {/* Shop Now Button */}
              <motion.button 
                className="group/btn inline-flex items-center text-gray-900 font-medium hover:text-blue-600 transition-colors duration-200"
                variants={buttonVariants}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="underline underline-offset-2">Shop now</span>
                <ArrowRight 
                  size={16} 
                  className="ml-2 group-hover/btn:translate-x-2 transition-transform duration-300" 
                />
              </motion.button>
            </div>
          </motion.div>

          {/* Digital Lens Card */}
          <motion.div 
            className="bg-gray-100 rounded-2xl p-8 relative overflow-hidden group cursor-pointer"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative z-10">
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Digital Lens
              </motion.h3>
              <motion.p 
                className="text-gray-700 mb-8"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Up to 40% off Camera
              </motion.p>
              
              {/* Camera Lens Image */}
              <motion.div 
                className="mb-8 flex justify-center"
                variants={imageVariants}
              >
                <img 
                  src={Lens} 
                  alt="Digital Camera Lens" 
                  className="w-full max-w-xs h-48 object-contain"
                />
              </motion.div>
              
              {/* Shop Now Button */}
              <motion.button 
                className="group/btn inline-flex items-center text-gray-900 font-medium hover:text-blue-600 transition-colors duration-200"
                variants={buttonVariants}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="underline underline-offset-2">Shop now</span>
                <ArrowRight 
                  size={16} 
                  className="ml-2 group-hover/btn:translate-x-2 transition-transform duration-300" 
                />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default TrendingProducts;