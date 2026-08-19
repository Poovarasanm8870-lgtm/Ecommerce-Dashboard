import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 font-['Playfair_Display']">
          Your Wishlist is Empty
        </h2>
        <p className="text-slate-500 max-w-md mx-auto text-sm">
          Save your favorite products to your wishlist so you can quickly find them later or move them straight into your bag.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg transition-all text-sm"
        >
          Discover Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 font-['Playfair_Display']">
          My Saved Wishlist
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          You have <strong className="text-slate-900">{wishlist.length}</strong> product(s) saved
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div key={product.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all">
            <div className="relative aspect-square bg-slate-100 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button
                onClick={() => {
                  removeFromWishlist(product.id);
                  showToast('Removed from wishlist', 'info');
                }}
                className="absolute top-3 right-3 p-2 bg-white/90 text-rose-600 rounded-full shadow-md hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">{product.category}</span>
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="font-extrabold text-slate-900 text-base mt-2">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
              </div>

              <button
                onClick={() => {
                  addToCart(product, 1);
                  removeFromWishlist(product.id);
                  showToast(`Moved '${product.name}' to cart!`, 'success');
                }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" /> Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
