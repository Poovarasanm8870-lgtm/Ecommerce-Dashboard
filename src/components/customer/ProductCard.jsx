import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { QuickViewModal } from '../common/QuickViewModal';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const isWished = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added '${product.name}' to shopping cart!`, 'success');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (!isWished) {
      showToast(`Saved '${product.name}' to wishlist!`, 'success');
    } else {
      showToast(`Removed from wishlist`, 'info');
    }
  };

  return (
    <>
      <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
        
        {/* Product Image Container */}
        <div className="relative aspect-square overflow-hidden bg-slate-100 img-zoom-parent">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover img-zoom"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.discount > 0 && (
              <span className="px-2.5 py-1 bg-rose-600 text-white text-[11px] font-bold rounded-full shadow-sm">
                -{product.discount}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="px-2.5 py-1 bg-indigo-600 text-white text-[11px] font-bold rounded-full shadow-sm">
                NEW
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all duration-200 z-10 ${
              isWished
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
            }`}
            title={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWished ? 'fill-white' : ''}`} />
          </button>

          {/* Quick Action Overlay on Hover */}
          <div className="absolute inset-x-0 bottom-3 px-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button
              onClick={() => setQuickViewOpen(true)}
              className="flex-1 py-2 px-3 bg-white/90 hover:bg-white text-slate-800 font-semibold text-xs rounded-xl shadow-lg backdrop-blur-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg flex items-center justify-center transition-colors"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Details Content */}
        <div className="p-5 flex flex-col flex-1 justify-between gap-3">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-medium">
              <span>{product.category}</span>
              <span className="text-slate-500 font-semibold">{product.brand}</span>
            </div>

            <Link to={`/products/${product.id}`} className="block">
              <h3 className="font-semibold text-slate-900 line-clamp-2 text-sm group-hover:text-indigo-600 transition-colors leading-snug">
                {product.name}
              </h3>
            </Link>
          </div>

          <div>
            {/* Rating Stars */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-600 ml-1">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewsCount})</span>
            </div>

            {/* Pricing Row */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-slate-900 text-lg">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddToCart}
                className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-600 text-slate-700 hover:text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <QuickViewModal
          product={product}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </>
  );
};
