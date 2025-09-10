// utils/productData.js
import Apple from "../assets/images/Apple.png";
import Apple1 from "../assets/images/Apple1.png";
import HP from "../assets/images/HP.png";
import iPhone from "../assets/images/iPhone.png";
import SamsungS22 from "../assets/images/SamsungS22.png";
import Lenovo from "../assets/images/Lenovo.png";
import Lens from "../assets/images/Lens.png";
import SamsungUltra from "../assets/images/SamsungUltra.png";
import iPad from "../assets/images/iPad.png";

// Function to generate slug from product name
export const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Centralized product data
export const products = [
  {
    id: 1,
    name: 'Apple MacBook Pro 2019 | 16"',
    slug: 'apple-macbook-pro-2019-16',
    image: Apple,
    specs: "RAM 16G GB | Memory 512 GB | Touch bar Five finger (English)",
    price: "$740.99",
    originalPrice: "$899.99",
    brand: "Apple",
    category: "Laptops",
    inStock: true,
    stockCount: 15,
    description: "Powerful MacBook Pro with 16-inch display, perfect for professional work and creative tasks. Features the latest Intel processor and exceptional build quality.",
    detailedSpecs: {
      ram: "16 GB DDR4",
      storage: "512 GB SSD",
      processor: "Intel Core i7",
      display: '16" Retina Display',
      keyboard: "Touch Bar + Touch ID",
      os: "macOS Monterey",
      graphics: "AMD Radeon Pro",
      weight: "2.0 kg"
    },
    tags: ["laptop", "apple", "macbook", "professional", "creative"]
  },
  {
    id: 2,
    name: 'Apple MacBook Pro 2020 | 13" Touch Bar',
    slug: 'apple-macbook-pro-2020-13-touch-bar',
    image: Apple1,
    specs: "RAM 16G GB | Memory 512 GB | Keyboard layout Eng (English)",
    price: "$949.99",
    originalPrice: "$1,199.99",
    brand: "Apple",
    category: "Laptops",
    inStock: true,
    stockCount: 8,
    description: "Compact and powerful MacBook Pro with Touch Bar technology. Perfect balance of performance and portability with the revolutionary Apple M1 chip.",
    detailedSpecs: {
      ram: "16 GB Unified Memory",
      storage: "512 GB SSD",
      processor: "Apple M1 Chip",
      display: '13.3" Retina Display',
      keyboard: "Touch Bar + Touch ID",
      os: "macOS Big Sur",
      graphics: "8-core GPU",
      weight: "1.4 kg"
    },
    tags: ["laptop", "apple", "macbook", "m1", "compact"]
  },
  {
    id: 3,
    name: 'HP EliteBook 840 G5 | i5-8350U | 14"',
    slug: 'hp-elitebook-840-g5-i5-8350u-14',
    image: HP,
    specs: "8 GB | 128 GB SSD | Backlit keyboard | Webcam | Win 11 Pro | silver | SE",
    price: "$549.99",
    originalPrice: "$799.99",
    brand: "HP",
    category: "Laptops",
    inStock: true,
    stockCount: 12,
    description: "Business-grade laptop with enhanced security features and professional design. Built for productivity and reliability in corporate environments.",
    detailedSpecs: {
      ram: "8 GB DDR4",
      storage: "128 GB SSD",
      processor: "Intel i5-8350U",
      display: '14" Full HD',
      keyboard: "Backlit Spill-resistant",
      os: "Windows 11 Pro",
      graphics: "Intel UHD Graphics",
      weight: "1.5 kg"
    },
    tags: ["laptop", "hp", "business", "professional", "windows"]
  },
  {
    id: 4,
    name: "iPhone 15",
    slug: 'iphone-15-blue-unlocked',
    image: iPhone,
    specs: "128 GB | Dual SIM | blue | Unlocked",
    price: "$449.99",
    originalPrice: "$599.99",
    brand: "Apple",
    category: "Phones",
    inStock: true,
    stockCount: 25,
    description: "Latest iPhone with advanced camera system and powerful A17 chip. Features USB-C connectivity and enhanced durability with Ceramic Shield.",
    detailedSpecs: {
      storage: "128 GB",
      color: "Blue",
      connectivity: "5G, Dual SIM",
      processor: "A17 Bionic chip",
      camera: "48MP Main + 12MP Ultra Wide",
      display: '6.1" Super Retina XDR',
      battery: "All-day battery",
      charging: "USB-C"
    },
    tags: ["phone", "apple", "iphone", "5g", "camera"]
  },
  {
    id: 5,
    name: "Samsung Galaxy S22 Ultra 5G",
    slug: 'samsung-galaxy-s22-ultra-5g-phantom-black',
    image: SamsungS22,
    specs: "8GB | 128 GB | Dual-SIM | Phantom Black",
    price: "$449.99",
    originalPrice: "$699.99",
    brand: "Samsung",
    category: "Phones",
    inStock: true,
    stockCount: 18,
    description: "Premium Samsung phone with built-in S Pen and advanced camera capabilities. The ultimate productivity phone with flagship performance.",
    detailedSpecs: {
      ram: "8 GB LPDDR5",
      storage: "128 GB",
      color: "Phantom Black",
      connectivity: "5G, Dual-SIM",
      processor: "Snapdragon 8 Gen 1",
      camera: "108MP Main + Triple Camera",
      display: '6.8" Dynamic AMOLED 2X',
      battery: "5000mAh",
      spen: "Built-in S Pen"
    },
    tags: ["phone", "samsung", "galaxy", "spen", "camera", "5g"]
  },
  {
    id: 6,
    name: 'Lenovo Thinkpad T14 G1 | 14"',
    slug: 'lenovo-thinkpad-t14-g1-14',
    image: Lenovo,
    specs: "16 GB | 512 GB SSD | Backlit keyboard | FP | Win 11 Home | NO",
    price: "$649.99",
    originalPrice: "$899.99",
    brand: "Lenovo",
    category: "Laptops",
    inStock: true,
    stockCount: 10,
    description: "Reliable business laptop with fingerprint reader and backlit keyboard. Engineered for performance, security, and all-day productivity.",
    detailedSpecs: {
      ram: "16 GB DDR4",
      storage: "512 GB SSD",
      processor: "Intel Core i5",
      display: '14" Full HD IPS',
      keyboard: "Backlit Spill-resistant",
      os: "Windows 11 Home",
      graphics: "Intel Iris Xe",
      weight: "1.46 kg"
    },
    tags: ["laptop", "lenovo", "thinkpad", "business", "reliable"]
  },
  {
    id: 7,
    name: 'Lenovo Thinkpad T14 G1 | i7-10610U | 14"',
    slug: 'lenovo-thinkpad-t14-g1-i7-10610u-14',
    image: Lens,
    specs: "16 GB | 512 GB SSD | Backlit keyboard | FP | Win 11 Home | NO",
    price: "$749.99",
    originalPrice: "$999.99",
    brand: "Lenovo",
    category: "Laptops",
    inStock: true,
    stockCount: 7,
    description: "High-performance business laptop with i7 processor. Enhanced performance for demanding tasks with premium build quality.",
    detailedSpecs: {
      ram: "16 GB DDR4",
      storage: "512 GB SSD",
      processor: "Intel i7-10610U",
      display: '14" Full HD IPS',
      keyboard: "Backlit Spill-resistant",
      os: "Windows 11 Home",
      graphics: "Intel UHD Graphics",
      weight: "1.46 kg"
    },
    tags: ["laptop", "lenovo", "thinkpad", "i7", "performance"]
  },
  {
    id: 8,
    name: 'Samsung Galaxy Ultra Pro | Premium Edition',
    slug: 'samsung-galaxy-ultra-pro-premium-edition',
    image: SamsungUltra,
    specs: "12 GB | 256 GB | 5G | Phantom Silver",
    price: "$899.99",
    originalPrice: "$1,199.99",
    brand: "Samsung",
    category: "Phones",
    inStock: false,
    stockCount: 0,
    description: "Ultra-premium Samsung device with cutting-edge technology. The pinnacle of mobile innovation with professional-grade features.",
    detailedSpecs: {
      ram: "12 GB LPDDR5",
      storage: "256 GB",
      color: "Phantom Silver",
      connectivity: "5G Ultra Wideband",
      processor: "Snapdragon 8 Gen 2",
      camera: "200MP Main + Quad Camera",
      display: '6.8" Dynamic AMOLED 2X',
      battery: "5000mAh",
      charging: "45W Super Fast Charging"
    },
    tags: ["phone", "samsung", "premium", "ultra", "pro", "camera"]
  },
  {
    id: 9,
    name: 'iPad Pro 12.9" | M2 Chip',
    slug: 'ipad-pro-129-m2-chip-space-gray',
    image: iPad,
    specs: "8 GB | 128 GB | Wi-Fi + Cellular | Space Gray",
    price: "$1099.99",
    brand: "Apple",
    category: "Tablets",
    inStock: true,
    stockCount: 14,
    description: "Professional tablet with M2 chip for creative professionals. Ultimate portable workstation with desktop-class performance.",
    detailedSpecs: {
      ram: "8 GB Unified Memory",
      storage: "128 GB",
      processor: "Apple M2 chip",
      display: '12.9" Liquid Retina XDR',
      connectivity: "Wi-Fi 6E + 5G Cellular",
      color: "Space Gray",
      camera: "12MP Pro camera system",
      weight: "682 grams"
    },
    tags: ["tablet", "apple", "ipad", "pro", "m2", "creative"]
  }
];

// Helper functions
export const getProductBySlug = (slug) => {
  return products.find(product => product.slug === slug);
};

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProductsByBrand = (brand) => {
  return products.filter(product => 
    product.brand.toLowerCase() === brand.toLowerCase()
  );
};

export const getRelatedProducts = (currentProduct, limit = 8) => {
  if (!currentProduct) return [];
  
  return products
    .filter(p => 
      p.id !== currentProduct.id && 
      (p.brand === currentProduct.brand || p.category === currentProduct.category)
    )
    .slice(0, limit);
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.includes(searchTerm))
  );
};

export const getInStockProducts = () => {
  return products.filter(product => product.inStock);
};

export const getOutOfStockProducts = () => {
  return products.filter(product => !product.inStock);
};

// Categories and brands for filtering
export const categories = [
  { name: "Laptops", count: products.filter(p => p.category === "Laptops").length },
  { name: "Phones", count: products.filter(p => p.category === "Phones").length },
  { name: "Tablets", count: products.filter(p => p.category === "Tablets").length },
  { name: "Cameras", count: 0 },
  { name: "Watches", count: 0 },
];

export const brands = [
  ...new Set(products.map(product => product.brand))
].sort();

export default products;