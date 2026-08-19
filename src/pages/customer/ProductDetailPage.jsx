import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, MapPin, Check, ChevronRight } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { ProductCard } from '../../components/customer/ProductCard';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = products.find(p => p.id === id) || products[0];

  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  
  // Pincode checker state
  const [pincode, setPincode] = useState('560103');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  // Review submission state
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState([
    { id: 1, author: 'Aarav S.', rating: 5, date: '2 days ago', text: 'Exceptional build quality and crystal clear sound.' },
    { id: 2, author: 'Sneha M.', rating: 4, date: '1 week ago', text: 'Very comfortable for long hours. Premium finish.' }
  ]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <Link to="/products" className="text-indigo-600 font-semibold mt-4 inline-block">Return to Catalog</Link>
      </div>
    );
  }

  const isWished = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    showToast(`Added ${quantity} '${product.name}' to cart!`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/cart');
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus({ success: true, message: 'Free Express Delivery available! Delivered by tomorrow.' });
    } else {
      setPincodeStatus({ success: false, message: 'Please enter a valid 6-digit Indian PIN code.' });
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      setReviewsList(prev => [
        { id: Date.now(), author: 'You (Verified Buyer)', rating: reviewRating, date: 'Just now', text: reviewText },
        ...prev
      ]);
      setReviewText('');
      showToast('Thank you for submitting your review!', 'success');
    }
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link to="/" className="hover:text-slate-900">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/products" className="hover:text-slate-900">Catalog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/products?category=${product.category}`} className="hover:text-slate-900">{product.category}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-semibold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/80 shadow-md relative img-zoom-parent">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover img-zoom"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-rose-600 text-white font-bold text-xs rounded-full shadow-md">
                -{product.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    (selectedImage || product.image) === imgUrl ? 'border-indigo-600 scale-105 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg uppercase">
                {product.category}
              </span>
              <span className="text-xs text-slate-400 font-semibold">Brand: {product.brand}</span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                product.stock > 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {product.status} ({product.stock} available)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Playfair_Display'] leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-200'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-baseline gap-4">
            <span className="text-3xl font-extrabold text-slate-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-base text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
              Inclusive of all taxes
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color & Size selection */}
          {product.colors && (
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Select Color</label>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedColor === color ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Select Size</label>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedSize === size ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-slate-600 hover:bg-slate-200 transition-colors font-bold"
                >
                  -
                </button>
                <span className="px-5 py-3 text-sm font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-slate-600 hover:bg-slate-200 transition-colors font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all text-sm"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-2xl border transition-colors ${
                  isWished ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWished ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-200 transition-all text-sm uppercase tracking-wider"
            >
              Buy Now — Instant Checkout
            </button>
          </div>

          {/* Pincode Delivery Checker */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-600" /> Check Express Delivery Pincode
            </label>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit PIN..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-indigo-500"
              />
              <button type="submit" className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-indigo-600 transition-colors">
                Check
              </button>
            </form>
            {pincodeStatus && (
              <p className={`text-xs font-medium ${pincodeStatus.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                {pincodeStatus.message}
              </p>
            )}
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            <div>
              <Truck className="w-5 h-5 mx-auto text-indigo-600 mb-1" />
              <span>Free Shipping</span>
            </div>
            <div>
              <RotateCcw className="w-5 h-5 mx-auto text-indigo-600 mb-1" />
              <span>14 Days Returns</span>
            </div>
            <div>
              <ShieldCheck className="w-5 h-5 mx-auto text-indigo-600 mb-1" />
              <span>1 Year Warranty</span>
            </div>
          </div>
        </div>

      </div>

      {/* Specifications & Reviews Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Product Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {product.specs && Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex justify-between py-2 px-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-500">{key}</span>
                <span className="font-bold text-slate-900">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Customer Reviews ({reviewsList.length})
          </h3>

          <form onSubmit={handleAddReview} className="mb-6 bg-slate-50 p-4 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase">Write a Review</h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">Your Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="text-amber-400"
                  >
                    <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              required
              rows={2}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
            />
            <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-500 transition-colors">
              Submit Review
            </button>
          </form>

          <div className="space-y-4">
            {reviewsList.map(rev => (
              <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl space-y-1 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{rev.author}</span>
                  <span className="text-xs text-slate-400">{rev.date}</span>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-200'}`} />
                  ))}
                </div>
                <p className="text-sm text-slate-600">{rev.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h3 className="text-2xl font-extrabold text-slate-900 font-['Playfair_Display']">
            Related Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
