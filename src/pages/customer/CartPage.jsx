import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Heart, Tag, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponDiscount,
    shippingFee,
    tax,
    totalAmount
  } = useCart();
  
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode.trim());
    if (res.success) {
      showToast(res.message, 'success');
      setCouponCode('');
    } else {
      showToast(res.message, 'error');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 font-['Playfair_Display']">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-slate-500 max-w-md mx-auto text-sm">
          Looks like you haven't added anything to your cart yet. Explore our luxury noise-canceling acoustics, timepieces, and apparel collections!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg transition-all text-sm"
        >
          Explore Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Free shipping progress threshold (₹2000)
  const freeShippingThreshold = 2000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Clear Cart */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-['Playfair_Display']">
            Shopping Cart
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            You have <strong className="text-slate-900">{cart.length}</strong> unique item(s) in your bag
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Clear Cart
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 bg-indigo-50/80 border border-indigo-100 rounded-2xl space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
          <span>
            {subtotal >= freeShippingThreshold ? (
              <span className="flex items-center gap-1.5 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" /> Congratulations! You unlocked FREE Express Shipping!
              </span>
            ) : (
              `Add ₹${(freeShippingThreshold - subtotal).toLocaleString('en-IN')} more to unlock FREE Shipping!`
            )}
          </span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-indigo-200/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => {
            const isWished = isInWishlist(item.product.id);

            return (
              <div
                key={`${item.product.id}-${item.color}-${item.size}-${index}`}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-5 transition-all hover:shadow-md"
              >
                {/* Item Thumbnail */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-600 tracking-wider">
                    {item.product.category}
                  </span>
                  <Link to={`/products/${item.product.id}`}>
                    <h3 className="font-bold text-slate-900 text-base hover:text-indigo-600 transition-colors line-clamp-1">
                      {item.product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 font-medium">
                    <span>Color: <strong className="text-slate-800">{item.color}</strong></span>
                    <span>•</span>
                    <span>Size: <strong className="text-slate-800">{item.size}</strong></span>
                  </div>

                  <p className="font-extrabold text-slate-900 text-lg pt-1">
                    ₹{item.product.price.toLocaleString('en-IN')}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.color, item.size, -1)}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition-colors font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-sm font-bold text-slate-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.color, item.size, 1)}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition-colors font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Move to Wishlist */}
                  <button
                    onClick={() => {
                      toggleWishlist(item.product);
                      showToast('Toggled wishlist state', 'info');
                    }}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isWished ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                    title="Move to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWished ? 'fill-rose-600' : ''}`} />
                  </button>

                  {/* Delete Item */}
                  <button
                    onClick={() => {
                      removeFromCart(item.product.id, item.color, item.size);
                      showToast(`Removed item from cart`, 'info');
                    }}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-6">
          <h3 className="font-extrabold text-slate-900 text-lg pb-3 border-b border-slate-100">
            Order Summary
          </h3>

          {/* Promo Coupon Form */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Apply Promo Coupon</label>
            {appliedCoupon ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span>{appliedCoupon.code}</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. FESTIVE15"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-indigo-600 transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            <p className="text-[11px] text-slate-400 mt-1">Try codes: <strong>LUXE20</strong> or <strong>FESTIVE15</strong></p>
          </div>

          {/* Breakdown */}
          <div className="space-y-3 text-sm pt-2">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Coupon Discount</span>
                <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Estimated Delivery Charge</span>
              {shippingFee === 0 ? (
                <span className="font-bold text-emerald-600">FREE</span>
              ) : (
                <span className="font-bold text-slate-900">₹{shippingFee}</span>
              )}
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Estimated GST Tax (8%)</span>
              <span className="font-bold text-slate-900">₹{tax.toLocaleString('en-IN')}</span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
              <span className="font-extrabold text-slate-900 text-base">Grand Total</span>
              <span className="font-extrabold text-indigo-600 text-2xl">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>

          <Link to="/products" className="block text-center text-xs font-bold text-slate-500 hover:text-slate-800">
            ← Continue Shopping
          </Link>
        </div>

      </div>

    </div>
  );
};
