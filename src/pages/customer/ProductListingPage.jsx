import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, Star, X, RefreshCw } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { ProductCard } from '../../components/customer/ProductCard';

export const ProductListingPage = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(25000);
  const [minRating, setMinRating] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state whenever URL query params change (e.g. clicking top Navbar links)
  useEffect(() => {
    const catFromUrl = searchParams.get('category') || 'All';
    const searchFromUrl = searchParams.get('search') || '';
    setSelectedCategory(catFromUrl);
    setSearchQuery(searchFromUrl);
  }, [searchParams]);

  // Extract unique brands
  const brands = useMemo(() => {
    const bSet = new Set(products.map(p => p.brand));
    return ['All', ...Array.from(bSet)];
  }, [products]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cSet = new Set(products.map(p => p.category));
    return ['All', ...Array.from(cSet)];
  }, [products]);

  // Filter category update handler
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      // Brand filter
      if (selectedBrand !== 'All' && product.brand !== selectedBrand) return false;
      // Search query
      if (searchQuery.trim() && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      // Price range
      if (product.price > priceRange) return false;
      // Rating filter
      if (product.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [products, selectedCategory, selectedBrand, searchQuery, priceRange, minRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange(25000);
    setMinRating(0);
    setSelectedBrand('All');
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-['Playfair_Display']">
            {selectedCategory === 'All' ? 'All Products Catalog' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> available items
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Filter catalog..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) {
                  searchParams.set('search', e.target.value);
                } else {
                  searchParams.delete('search');
                }
                setSearchParams(searchParams);
              }}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  searchParams.delete('search');
                  setSearchParams(searchParams);
                }}
                className="absolute right-3 top-2.5 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl focus:bg-white focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">New Arrivals</option>
          </select>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden p-2 bg-indigo-50 text-indigo-600 rounded-xl flex items-center gap-1 font-semibold text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filter Sidebar Component */}
        <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm h-fit`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" /> Filter Products
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider block mb-2.5">Category</label>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-indigo-50 text-indigo-600 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-xs text-slate-400">
                    {cat === 'All' ? products.length : products.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Max Price</label>
              <span className="text-sm font-bold text-indigo-600">₹{priceRange.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="25000"
              step="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>₹1,000</span>
              <span>₹25,000</span>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider block mb-2">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-indigo-500"
            >
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider block mb-2">Minimum Rating</label>
            <div className="space-y-1">
              {[4, 3, 2, 0].map(stars => (
                <button
                  key={stars}
                  onClick={() => setMinRating(stars)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors ${
                    minRating === stars ? 'bg-amber-50 text-amber-800 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < stars ? 'fill-amber-400' : 'text-slate-200'}`} />
                    ))}
                  </div>
                  <span>{stars > 0 ? `${stars} Stars & Up` : 'All Ratings'}</span>
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-slate-200/80 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-2xl">
                🔍
              </div>
              <h3 className="text-xl font-bold text-slate-900">No matching products found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                We couldn't find any products matching your current filters. Try resetting your search or price range.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

    </div>
  );
};
