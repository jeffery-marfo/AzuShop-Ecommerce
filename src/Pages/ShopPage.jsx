import React, { useState } from "react";
import { ChevronDown, ShoppingCart, Heart, Eye, Menu, X } from "lucide-react";
import Apple from "../assets/images/Apple.png";
import Apple1 from "../assets/images/Apple1.png";
import HP from "../assets/images/HP.png";
import iPhone from "../assets/images/iPhone.png";
import SamsungS22 from "../assets/images/SamsungS22.png";
import Lenovo from "../assets/images/Lenovo.png";
import Lens from "../assets/images/Lens.png";
import SamsungUltra from "../assets/images/SamsungUltra.png";
import iPad from "../assets/images/iPad.png";

const ShopPage = () => {
  const [openSections, setOpenSections] = useState({
    categories: true,
    brand: true,
    price: true,
  });
  const [isMobileSideMenuOpen, setIsMobileSideMenuOpen] = useState(false);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleMobileSideMenu = () => {
    setIsMobileSideMenuOpen(!isMobileSideMenuOpen);
  };

  const products = [
    {
      id: 1,
      name: 'Apple MacBook Pro 2019 | 16"',
      image: Apple,
      specs: "RAM 16G GB | Memory 512 GB | Touch bar Five finger (English)",
      price: "$740.99",
      brand: "Apple",
    },
    {
      id: 2,
      name: 'Apple MacBook Pro 2020 | 13" Touch Bar',
      image: Apple1,
      specs: "RAM 16G GB | Memory 512 GB | Keyboard layout Eng (English)",
      price: "$949.99",
      brand: "Apple",
    },
    {
      id: 3,
      name: 'HP EliteBook 840 G5 | i5-8350U | 14"',
      image: HP,
      specs:
        "8 GB | 128 GB SSD | Backlit keyboard | Webcam | Win 11 Pro | silver | SE",
      price: "$549.99",
      brand: "HP",
    },
    {
      id: 4,
      name: "iPhone 15",
      image: iPhone,
      specs: "128 GB | Dual SIM | blue | Unlocked",
      price: "$449.99",
      brand: "Apple",
    },
    {
      id: 5,
      name: "Samsung Galaxy S22 Ultra 5G",
      image: SamsungS22,
      specs: "8GB | 128 GB | Dual-SIM | Phantom Black",
      price: "$449.99",
      brand: "Samsung",
    },
    {
      id: 6,
      name: 'Lenovo Thinkpad T14 G1 | 14"',
      image: Lenovo,
      specs: "16 GB | 512 GB SSD | Backlit keyboard | FP | Win 11 Home | NO",
      price: "$649.99",
      brand: "Lenovo",
    },
     {
      id: 7,
      name: 'Lenovo Thinkpad T14 G1 | i7-10610U | 14"',
      image: Lens   ,
      specs: "16 GB | 512 GB SSD | Backlit keyboard | FP | Win 11 Home | NO",
      price: "$649.99",
      brand: "Lenovo",
    },
    {
      id: 8,
      name: 'Lenovo Thinkpad T14 G1 | i7-10610U | 14"',
      image: SamsungUltra,
      specs: "16 GB | 512 GB SSD | Backlit keyboard | FP | Win 11 Home | NO",
      price: "$649.99",
      brand: "Lenovo",
    },
    {
      id: 9,
      name: 'Lenovo Thinkpad T14 G1 | i7-10610U | 14"',
      image: iPad,
      specs: "16 GB | 512 GB SSD | Backlit keyboard | FP | Win 11 Home | NO",
      price: "$649.99",
      brand: "Lenovo",
    },

  ];

  const categories = [
    { name: "Laptops", count: 4 },
    { name: "Phones", count: 3 },
    { name: "Cameras", count: null },
    { name: "Watches", count: 3 },
  ];

  const brands = ["Apple", "Samsung", "Lenovo", "Sony"];

  const SidebarContent = () => (
    <>
      <h2 className="text-lg font-semibold mb-4">Shop By</h2>

      {/* Product Categories */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer py-2"
          onClick={() => toggleSection("categories")}
        >
          <h3 className="font-medium">Product Categories</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.categories ? "" : "rotate-180"
            }`}
          />
        </div>
        {openSections.categories && (
          <div className="mt-2 space-y-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex justify-between text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
              >
                <span>{category.name}</span>
                {category.count && <span>({category.count})</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Brand */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer py-2"
          onClick={() => toggleSection("brand")}
        >
          <h3 className="font-medium">Brand</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.brand ? "" : "rotate-180"
            }`}
          />
        </div>
        {openSections.brand && (
          <div className="mt-3 space-y-3">
            {brands.map((brand, index) => (
              <label
                key={index}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 border-2 border-gray-300 rounded mr-3 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer py-2"
          onClick={() => toggleSection("price")}
        >
          <h3 className="font-medium">Price</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.price ? "" : "rotate-180"
            }`}
          />
        </div>
        {openSections.price && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Enter price"
              className="w-full p-2 border border-gray-300 rounded text-sm mb-3"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
              Reset
            </button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9FBFC" }}>
      {/* Header Banner */}
      <div
        className="text-white py-8 sm:py-12 lg:py-16 text-center px-4"
        style={{
          background: "linear-gradient(to right, #01589A 0%, #009CDE 100%)",
        }}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">New Arrival</h1>
        <p className="text-blue-100 text-sm sm:text-base">
          Shop through our latest selection of Products
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <span className="text-gray-600">Home/ </span>
          <span className="text-gray-900 font-medium">shop</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex justify-between items-center px-4 py-4 bg-white ">
          <button
            onClick={toggleMobileSideMenu}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Menu className="w-4 h-4" />
            Menu
          </button>
          <span className="text-gray-600">Showing {products.length} products</span>
        </div>

        <div className="flex gap-4 lg:gap-8 p-4 lg:p-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 bg-white p-6 h-fit">
            <SidebarContent />
          </div>

          {/* Mobile Side Menu Overlay */}
          {isMobileSideMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-[#D5D3D3]/60"
                onClick={toggleMobileSideMenu}
              />
              {/* Side Menu */}
              <div className="relative bg-white w-80 max-w-[80vw] h-full overflow-y-auto">
                <div className="flex justify-between items-center p-4 ">
                  <h2 className="text-lg font-semibold">Shop Menu</h2>
                  <button onClick={toggleMobileSideMenu}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-4">
                  <SidebarContent />
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  style={{ backgroundColor: "#F9FBFC" }}
                >
                  {/* Product Image */}
                  <div className="relative bg-white rounded-t-lg p-4 h-40 sm:h-48 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                    {/* Brand label */}
                    <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                      {product.brand}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {product.specs}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-semibold text-blue-600">
                        {product.price}
                      </span>
                      <div className="flex space-x-1 sm:space-x-2">
                        <button className="p-1.5 sm:p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button className="p-1.5 sm:p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button className="p-1.5 sm:p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;