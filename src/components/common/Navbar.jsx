import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, ShieldAlert, LayoutDashboard, LogOut, Sparkles, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 transition-all">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>FESTIVE SALE: Extra 15% OFF with code <strong className="text-amber-400">FESTIVE15</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-slate-400">
            <span>📞 24/7 Support: +91 1800-LUXE-VIP</span>
            <Link to="/admin/login" className="hover:text-white flex items-center gap-1 transition-colors">
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" /> Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              L
            </div>
            <div className="flex flex-col">
              <span className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                LUXE
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold -mt-1">
                E-COMMERCE
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search products, brands & categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 focus:border-indigo-500 focus:bg-white focus:outline-none rounded-full text-sm transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          </form>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale text-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center gap-2 font-medium text-sm"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="w-5 h-5 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Account / Profile Menu */}
            <div className="relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pl-3 border border-slate-200 rounded-full hover:border-slate-300 transition-all bg-white"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center uppercase">
                      {user.name[0]}
                    </div>
                    <span className="text-sm font-semibold text-slate-700 max-w-[90px] truncate hidden sm:inline">
                      {user.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* Account Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold uppercase rounded bg-indigo-50 text-indigo-600">
                          {user.role}
                        </span>
                      </div>

                      <div className="py-1">
                        {isAdmin ? (
                          <Link
                            to="/admin/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                          >
                            <LayoutDashboard className="w-4 h-4 text-indigo-600" /> Admin Dashboard
                          </Link>
                        ) : (
                          <Link
                            to="/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                          >
                            <LayoutDashboard className="w-4 h-4 text-indigo-600" /> Customer Dashboard
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                            navigate('/');
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 font-medium transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white rounded-full text-sm font-semibold transition-all shadow-md"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Categories Bar */}
        <nav className="hidden md:flex items-center gap-8 py-3 border-t border-slate-100 text-sm font-medium text-slate-600">
          <Link to="/products" className="hover:text-indigo-600 transition-colors">All Products</Link>
          <Link to="/products?category=Electronics" className="hover:text-indigo-600 transition-colors">Electronics</Link>
          <Link to="/products?category=Fashion" className="hover:text-indigo-600 transition-colors">Fashion</Link>
          <Link to="/products?category=Accessories" className="hover:text-indigo-600 transition-colors">Accessories</Link>
          <Link to="/products?category=Wearables" className="hover:text-indigo-600 transition-colors">Wearables</Link>
          <Link to="/products?category=Footwear" className="hover:text-indigo-600 transition-colors">Footwear</Link>
          <Link to="/products?category=Home %26 Living" className="hover:text-indigo-600 transition-colors">Home & Living</Link>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-sm border border-slate-200 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          <div className="flex flex-col gap-2 font-medium text-slate-700">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Home</Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">All Products</Link>
            <Link to="/products?category=Electronics" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Electronics</Link>
            <Link to="/products?category=Fashion" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Fashion</Link>
            <Link to="/products?category=Wearables" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Wearables</Link>
            {user ? (
              <Link to={isAdmin ? "/admin/dashboard" : "/dashboard"} onClick={() => setMobileMenuOpen(false)} className="py-2 text-indigo-600 font-semibold">
                Go to {isAdmin ? 'Admin Dashboard' : 'Customer Dashboard'}
              </Link>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="py-2 text-indigo-600 font-semibold">
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
