import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Check, ShieldCheck, CreditCard, Smartphone, Banknote, Truck, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, subtotal, couponDiscount, shippingFee, tax, totalAmount, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [createdOrder, setCreatedOrder] = useState(null);

  // Step 1 Form: Address
  const [address, setAddress] = useState({
    fullName: user?.name || 'Aarav Sharma',
    email: user?.email || 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    street: 'Flat 402, Green Glen Layout, Bellandur',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560103'
  });

  // Step 2: Shipping option
  const [shippingOption, setShippingOption] = useState('standard'); // 'standard' | 'express'

  // Step 3: Payment method
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'Card' | 'COD'
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [cardDetails, setCardDetails] = useState({ number: '4532 •••• •••• 8892', exp: '08/28', cvv: '•••' });

  useEffect(() => {
    if (cart.length === 0 && step !== 4) {
      navigate('/cart');
    }
  }, [cart, step, navigate]);

  const handleStep1Submit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const selectedShippingCost = shippingOption === 'express' ? shippingFee + 200 : shippingFee;
    const finalTotal = totalAmount + (shippingOption === 'express' ? 200 : 0);

    const orderData = {
      customer: {
        id: user?.id || 'guest-001',
        name: address.fullName,
        email: address.email,
        phone: address.phone
      },
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        image: item.product.image
      })),
      address,
      subtotal,
      discount: couponDiscount,
      shippingFee: selectedShippingCost,
      tax,
      totalAmount: finalTotal,
      paymentMethod: paymentMethod === 'UPI' ? `UPI (${upiId})` : paymentMethod === 'Card' ? 'Credit Card' : 'Cash on Delivery'
    };

    const newOrder = createOrder(orderData);
    setCreatedOrder(newOrder);
    clearCart();
    setStep(4);

    // Trigger celebratory confetti animation
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti triggered');
    }

    showToast(`Order #${newOrder.id} placed successfully!`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Checkout Wizard Header Steps */}
      <div className="flex items-center justify-between max-w-xl mx-auto pb-6">
        {[
          { num: 1, label: 'Address' },
          { num: 2, label: 'Delivery' },
          { num: 3, label: 'Payment' },
          { num: 4, label: 'Confirmation' }
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                step === s.num
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                  : step > s.num
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              {step > s.num ? <Check className="w-4 h-4" /> : s.num}
            </div>
            <span className={`text-xs font-bold hidden sm:inline ${step === s.num ? 'text-slate-900' : 'text-slate-400'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: Address */}
      {step === 1 && (
        <form onSubmit={handleStep1Submit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Step 1 — Shipping & Delivery Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={address.fullName}
                onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={address.email}
                onChange={(e) => setAddress({ ...address, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">Street Address / House No.</label>
              <input
                type="text"
                required
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
              <input
                type="text"
                required
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">State</label>
              <input
                type="text"
                required
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Postal PIN Code</label>
              <input
                type="text"
                required
                value={address.postalCode}
                onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg flex items-center gap-2 text-sm"
            >
              Continue to Delivery <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: Delivery Option */}
      {step === 2 && (
        <form onSubmit={handleStep2Submit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Step 2 — Select Delivery Speed
          </h2>

          <div className="space-y-4">
            <label
              onClick={() => setShippingOption('standard')}
              className={`p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                shippingOption === 'standard' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <Truck className="w-6 h-6 text-indigo-600" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Standard Insured Delivery</h4>
                  <p className="text-xs text-slate-500">Delivered within 3–4 business days</p>
                </div>
              </div>
              <span className="font-bold text-slate-900 text-sm">
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
              </span>
            </label>

            <label
              onClick={() => setShippingOption('express')}
              className={`p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                shippingOption === 'express' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <Truck className="w-6 h-6 text-amber-500" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">VIP Priority Express Delivery</h4>
                  <p className="text-xs text-slate-500">Guaranteed Next-Day Morning Delivery</p>
                </div>
              </div>
              <span className="font-bold text-indigo-600 text-sm">
                +₹200 Extra
              </span>
            </label>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Address
            </button>
            <button
              type="submit"
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg flex items-center gap-2 text-sm"
            >
              Continue to Payment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Payment */}
      {step === 3 && (
        <form onSubmit={handlePlaceOrder} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Step 3 — Select Payment Method
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('UPI')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                paymentMethod === 'UPI' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Smartphone className="w-6 h-6 text-indigo-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-sm">UPI Payment</h4>
              <p className="text-xs text-slate-500">Google Pay, PhonePe, Paytm</p>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('Card')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                paymentMethod === 'Card' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <CreditCard className="w-6 h-6 text-purple-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-sm">Credit / Debit Card</h4>
              <p className="text-xs text-slate-500">Visa, Mastercard, RuPay</p>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('COD')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                paymentMethod === 'COD' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Banknote className="w-6 h-6 text-emerald-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-sm">Cash on Delivery</h4>
              <p className="text-xs text-slate-500">Pay cash upon delivery</p>
            </button>
          </div>

          {/* Form details for UPI/Card */}
          {paymentMethod === 'UPI' && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Enter VPA / UPI ID</label>
              <input
                type="text"
                required
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@upi"
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-slate-400">Demo Instant UPI Verification Ready</p>
            </div>
          )}

          {paymentMethod === 'Card' && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Card Number</label>
                <input
                  type="text"
                  required
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Expiry Date</label>
                  <input
                    type="text"
                    required
                    value={cardDetails.exp}
                    onChange={(e) => setCardDetails({ ...cardDetails, exp: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">CVV Security Code</label>
                  <input
                    type="password"
                    maxLength={3}
                    required
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Amount to pay */}
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
            <span className="font-extrabold text-indigo-900 text-sm">Total Payable Amount:</span>
            <span className="font-extrabold text-indigo-600 text-2xl">
              ₹{(totalAmount + (shippingOption === 'express' ? 200 : 0)).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Delivery
            </button>
            <button
              type="submit"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-200 flex items-center gap-2 text-sm uppercase tracking-wider"
            >
              Confirm & Place Order <Check className="w-5 h-5" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: Order Confirmation */}
      {step === 4 && createdOrder && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-2xl text-center space-y-8 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest block mb-1">
              Order Confirmed & Placed
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 font-['Playfair_Display']">
              Thank You for Your Order!
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Order Reference ID: <strong className="text-slate-900 font-mono text-base">{createdOrder.id}</strong>
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 text-left space-y-4 text-sm max-w-lg mx-auto">
            <div className="flex justify-between pb-3 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Estimated Delivery:</span>
              <span className="font-bold text-slate-900">{createdOrder.estimatedDelivery}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Payment Method:</span>
              <span className="font-bold text-slate-900">{createdOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Shipping Address:</span>
              <span className="font-bold text-slate-900 text-right">{createdOrder.address.street}, {createdOrder.address.city}</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="font-extrabold text-slate-900">Total Paid:</span>
              <span className="font-extrabold text-indigo-600 text-xl">₹{createdOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/dashboard/orders"
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg transition-colors text-sm"
            >
              Track Order in Customer Dashboard
            </Link>
            <Link
              to="/products"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl transition-colors text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};
