import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_COUPONS } from '../data/mockCoupons';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('luxe_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const saved = localStorage.getItem('luxe_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('luxe_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('luxe_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('luxe_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (product, quantity = 1, color = null, size = null) => {
    const chosenColor = color || (product.colors && product.colors[0]) || 'Standard';
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'Standard';

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.color === chosenColor && item.size === chosenSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, quantity, color: chosenColor, size: chosenSize }];
    });
  };

  const removeFromCart = (productId, color, size) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.color === color && item.size === size)
    ));
  };

  const updateQuantity = (productId, color, size, delta) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.color === color && item.size === size) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const found = INITIAL_COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code' };
    }

    const currentSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    if (currentSubtotal < found.minSpend) {
      return { success: false, message: `Minimum spend of ₹${found.minSpend} required for this coupon.` };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Coupon '${found.code}' applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Pricing calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  let couponDiscount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minSpend) {
    if (appliedCoupon.discountType === 'percentage') {
      couponDiscount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      couponDiscount = appliedCoupon.value;
    }
  }

  const shippingFee = subtotal > 2000 || cart.length === 0 ? 0 : 150;
  const tax = Math.round((subtotal - couponDiscount) * 0.08); // 8% demo tax
  const totalAmount = Math.max(0, subtotal - couponDiscount + shippingFee + tax);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      subtotal,
      couponDiscount,
      shippingFee,
      tax,
      totalAmount,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
