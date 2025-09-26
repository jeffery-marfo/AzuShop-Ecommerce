import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronDown, ShoppingCart, Heart, Eye, Menu, X } from "lucide-react";
import { products, categories, brands } from "../utils/productData"; 
import { useStore } from "../context/StoreContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

const ShopPage = () => {
  const navigate = useNavigate();
  const { addToCart, toggleFavourite, isFavourite } = useStore();
  const { addToast } = useToast();
  const [openSections, setOpenSections] = useState({
    categories: true,
    brand: true,
    price: true,
  });
  const [isMobileSideMenuOpen, setIsMobileSideMenuOpen] = useState(false);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceFilter, setPriceFilter] = useState('');

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleMobileSideMenu = () => {
    setIsMobileSideMenuOpen(!isMobileSideMenuOpen);
  };

  // Filter functions
  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceFilter('');
  };

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }

    // Filter by price
    if (priceFilter) {
      const maxPrice = parseFloat(priceFilter);
      if (!isNaN(maxPrice)) {
        filtered = filtered.filter(product => {
          const productPrice = parseFloat(product.price.replace('$', '').replace(',', ''));
          return productPrice <= maxPrice;
        });
      }
    }

    return filtered;
  }, [selectedCategories, selectedBrands, priceFilter]);

  // Calculate category counts based on current filters
  const categoryCounts = useMemo(() => {
    const counts = {};
    categories.forEach(category => {
      counts[category.name] = products.filter(product => 
        product.category === category.name &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
        (!priceFilter || parseFloat(product.price.replace('$', '').replace(',', '')) <= parseFloat(priceFilter) || isNaN(parseFloat(priceFilter)))
      ).length;
    });
    return counts;
  }, [selectedBrands, priceFilter]);

  // Calculate brand counts based on current filters
  const brandCounts = useMemo(() => {
    const counts = {};
    brands.forEach(brand => {
      counts[brand] = products.filter(product => 
        product.brand === brand &&
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        (!priceFilter || parseFloat(product.price.replace('$', '').replace(',', '')) <= parseFloat(priceFilter) || isNaN(parseFloat(priceFilter)))
      ).length;
    });
    return counts;
  }, [selectedCategories, priceFilter]);

  // Function to handle product card click using slug
  const handleProductClick = (product) => {
    // Navigate to detail page with product slug
    navigate(`/shop/${product.slug}`);
  };

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
                className={`flex justify-between text-sm cursor-pointer transition-colors ${
                  selectedCategories.includes(category.name)
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => handleCategoryToggle(category.name)}
              >
                <span>{category.name}</span>
                {categoryCounts[category.name] > 0 && <span>({categoryCounts[category.name]})</span>}
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
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="w-4 h-4 border-2 border-gray-300 rounded mr-3 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-700 flex-1">{brand}</span>
                {brandCounts[brand] > 0 && <span className="text-gray-500 text-sm">({brandCounts[brand]})</span>}
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
              type="number"
              placeholder="Enter max price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full p-2 border border-gray-300 rounded text-sm mb-3"
            />
            <button 
              onClick={resetFilters}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
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
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
          <span className="text-gray-600"> / </span>
          <span className="text-gray-900 font-medium">Shop</span>
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
          <span className="text-gray-600">Showing {filteredProducts.length} products</span>
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
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">No products found</div>
                <div className="text-gray-400 text-sm mb-4">Try adjusting your filters</div>
                <button 
                  onClick={resetFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  style={{ backgroundColor: "#F9FBFC" }}
                  onClick={() => handleProductClick(product)}
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
                        <button 
                          className="p-1.5 sm:p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                          addToCart(product, 1);
                          addToast({ title: 'Added to cart', description: product.name, variant: 'success' });
                          navigate('/cart');
                          }}
                        >
                          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button 
                        className={`p-1.5 sm:p-2 border rounded transition-colors ${isFavourite(product.id) ? 'bg-red-100 border-red-300' : 'border-gray-300 hover:bg-gray-50'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                          toggleFavourite(product);
                          addToast({ title: isFavourite(product.id) ? 'Removed from favourites' : 'Added to favourites', description: product.name });
                          }}
                        >
                        <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavourite(product.id) ? 'fill-current text-red-600' : ''}`} />
                        </button>
                        <button 
                          className="p-1.5 sm:p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle quick view
                          }}
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;