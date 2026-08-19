import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, Clock, ShieldCheck, Star, Award, ChevronRight, Zap } from 'lucide-react';
import { INITIAL_CATEGORIES } from '../../data/mockCategories';
import { useProducts } from '../../context/ProductContext';
import { ProductCard } from '../../components/customer/ProductCard';

export const HomePage = () => {
  const { products } = useProducts();

  // Filters for sections
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  // Flash Sale Countdown timer logic
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        {/* Glow backgrounds */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" /> Premium Collection 2026
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Playfair_Display'] tracking-tight leading-tight">
              Elevate Your Everyday <span className="text-gradient">Luxe Lifestyle</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover curated luxury noise-canceling acoustics, Swiss chronograph timepieces, tailored Merino wool apparel, and precision home innovations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/products"
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/40 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 text-sm"
              >
                Explore Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?category=Electronics"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl backdrop-blur-md border border-white/15 flex items-center justify-center transition-all text-sm"
              >
                View Audio Acoustics
              </Link>
            </div>

            {/* Social Trust */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span><strong className="text-white">4.9/5</strong> Rating (12k+ reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>Official Warranty & Authenticity Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Hero Feature Visual */}
          <div className="relative flex justify-center">
            <div className="relative max-w-md w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80"
                alt="Aura Headphones Hero"
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
              
              {/* Floating Feature Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-indigo-300 font-bold uppercase">Featured Spotlight</span>
                    <h3 className="font-bold text-base">Aura Noise-Canceling ANC</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through">₹19,999</span>
                    <p className="font-extrabold text-amber-400 text-lg">₹14,999</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">Browse Collections</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Playfair_Display']">
              Popular Categories
            </h2>
          </div>
          <Link to="/products" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {INITIAL_CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 bg-slate-100 img-zoom-parent relative">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover img-zoom" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </h3>
              <span className="text-xs text-slate-400 mt-0.5">{cat.count} Items</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Flash Sale Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase">
              <Flame className="w-4 h-4 text-rose-400 animate-bounce" /> 24-Hour Flash Deals
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Playfair_Display']">
              Up to <span className="text-amber-400">40% OFF</span> Premium Smartwear & Timepieces
            </h2>

            <p className="text-indigo-200 text-sm leading-relaxed">
              Limited time offers with complimentary express insured delivery across India. Grab your favorite luxury items before stock exhausts.
            </p>

            {/* Countdown timer */}
            <div className="flex items-center gap-3 pt-2">
              <div className="bg-slate-950/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center min-w-[70px]">
                <span className="block font-mono font-extrabold text-2xl text-amber-400">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Hours</span>
              </div>
              <span className="text-2xl font-bold text-slate-400">:</span>
              <div className="bg-slate-950/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center min-w-[70px]">
                <span className="block font-mono font-extrabold text-2xl text-amber-400">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Mins</span>
              </div>
              <span className="text-2xl font-bold text-slate-400">:</span>
              <div className="bg-slate-950/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center min-w-[70px]">
                <span className="block font-mono font-extrabold text-2xl text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Secs</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/products"
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-2xl shadow-lg transition-colors inline-flex items-center gap-2 text-sm"
              >
                Shop Flash Sale <Zap className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">Handpicked Selection</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Playfair_Display']">
              Featured Products
            </h2>
          </div>
          <Link to="/products" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            See All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">Most Popular</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Playfair_Display']">
              Trending Right Now
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Customer Reviews Carousel / Testimonials */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">Verified Experience</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Playfair_Display']">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "The Aura headphones are astonishing. The noise cancellation silences my entire office environment, and delivery took less than 24 hours to Bangalore!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                  AS
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Aarav Sharma</h4>
                  <p className="text-xs text-slate-400">Verified Buyer • Bengaluru</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "Packaging was luxury standard. The Vogue chronograph looks twice as expensive as it is. Will definitely shop from LUXE again."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm">
                  PP
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Priya Patel</h4>
                  <p className="text-xs text-slate-400">Verified Buyer • Hyderabad</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "Seamless checkout via UPI and tracking timeline kept me updated every step of the way. High quality urban crossbody bag!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                  RV
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Rohan Verma</h4>
                  <p className="text-xs text-slate-400">Verified Buyer • New Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
