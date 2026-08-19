import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, Heart, ShoppingCart, MapPin, User, Settings, LogOut,
  Package, Clock, CheckCircle2, AlertCircle, ChevronRight, Eye, CreditCard, BarChart2, Plus, Edit2, Trash2
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { useToast } from '../../context/ToastContext';

// Demo monthly spending chart data
const SPENDING_DATA = [
  { month: 'Jan', amount: 8500 },
  { month: 'Feb', amount: 12400 },
  { month: 'Mar', amount: 9200 },
  { month: 'Apr', amount: 18900 },
  { month: 'May', amount: 14500 },
  { month: 'Jun', amount: 20798 }
];

export const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { products } = useProducts();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'orders' | 'order-detail' | 'wishlist' | 'addresses' | 'profile' | 'settings'
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Address management state
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      name: 'Home Address',
      fullName: user?.name || 'Aarav Sharma',
      street: 'Flat 402, Green Glen Layout, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560103',
      phone: '+91 98765 43210',
      isDefault: true
    }
  ]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({ name: 'Office', fullName: '', street: '', city: '', state: '', postalCode: '', phone: '' });

  // Stats calculation
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(o => o.status === 'Processing' || o.status === 'Shipped' || o.status === 'Out for Delivery').length;
  const deliveredOrdersCount = orders.filter(o => o.status === 'Delivered').length;
  const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleAddAddress = (e) => {
    e.preventDefault();
    setAddresses(prev => [...prev, { ...newAddr, id: 'addr-' + Date.now(), isDefault: false }]);
    setShowAddressModal(false);
    showToast('New address saved successfully!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
            {user?.name?.[0] || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold font-['Playfair_Display']">
              Welcome back, {user?.name || 'Customer'}!
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">{user?.email} • VIP Luxe Gold Member</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-center relative z-10 bg-slate-800/80 px-6 py-3 rounded-2xl border border-slate-700">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Total Spent</span>
            <p className="font-extrabold text-amber-400 text-lg">₹{totalSpent.toLocaleString('en-IN')}</p>
          </div>
          <div className="h-8 w-px bg-slate-700"></div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Orders Placed</span>
            <p className="font-extrabold text-white text-lg">{totalOrdersCount}</p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Customer Sidebar Navigation */}
        <aside className="space-y-2 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm h-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
              activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Overview
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
              activeTab === 'orders' || activeTab === 'order-detail' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4" /> My Orders
            </div>
            {totalOrdersCount > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === 'orders' ? 'bg-white text-indigo-600' : 'bg-slate-100 text-slate-700'}`}>
                {totalOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
              activeTab === 'wishlist' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4" /> Wishlist
            </div>
            {wishlist.length > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === 'wishlist' ? 'bg-white text-indigo-600' : 'bg-slate-100 text-slate-700'}`}>
                {wishlist.length}
              </span>
            )}
          </button>

          <Link
            to="/cart"
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl font-semibold text-sm text-slate-600 hover:bg-slate-50 transition-all"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-4 h-4" /> Shopping Cart
            </div>
            {cart.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-600">
                {cart.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
              activeTab === 'addresses' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MapPin className="w-4 h-4" /> Saved Addresses
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
              activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" /> My Profile
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
              activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4 h-4" /> Settings
          </button>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                logout();
                showToast('Logged out of customer session', 'info');
                navigate('/');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </aside>

        {/* Dynamic Main Content Tab */}
        <main className="lg:col-span-3 space-y-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Stat Widgets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Total Orders</span>
                    <Package className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900">{totalOrdersCount}</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">Lifetime shopping history</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Pending Orders</span>
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900">{pendingOrdersCount}</p>
                  <p className="text-[11px] text-amber-600 font-semibold">In transit / processing</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Delivered Orders</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900">{deliveredOrdersCount}</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">Successfully received</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Wishlist Items</span>
                    <Heart className="w-5 h-5 text-rose-500" />
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900">{wishlist.length}</p>
                  <p className="text-[11px] text-slate-400 font-semibold">Saved for later</p>
                </div>
              </div>

              {/* Spending Summary Chart */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-base">Monthly Spending Summary</h3>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">2026 Analytics</span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={SPENDING_DATA}>
                      <defs>
                        <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `₹${val}`} tickLine={false} />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']} />
                      <Area type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSpent)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Orders List */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-base">Recent Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-indigo-600 hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.slice(0, 3).map(order => (
                    <div
                      key={order.id}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4"
                    >
                      <div className="space-y-1 text-center sm:text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-sm">{order.id}</span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                            order.status === 'Out for Delivery' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {new Date(order.date).toLocaleDateString()} • {order.items.length} item(s)
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-extrabold text-slate-900 text-base">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setActiveTab('order-detail');
                          }}
                          className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-500 transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                My Orders History ({orders.length})
              </h2>

              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="p-5 bg-slate-50 rounded-3xl border border-slate-200/80 space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                      <div>
                        <span className="text-xs font-bold text-slate-400">ORDER ID</span>
                        <h4 className="font-extrabold text-slate-900 text-base">{order.id}</h4>
                        <span className="text-xs text-slate-500">{new Date(order.date).toLocaleString()}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                          order.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setActiveTab('order-detail');
                          }}
                          className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-500 transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> View Tracking Timeline
                        </button>
                      </div>
                    </div>

                    {/* Order items preview */}
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-sm pt-2">
                      <span className="text-slate-500">Payment: <strong className="text-slate-800">{order.paymentMethod}</strong> ({order.paymentStatus})</span>
                      <span className="font-extrabold text-slate-900 text-lg">Total: ₹{order.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: VISUAL ORDER DETAIL TIMELINE TRACKING */}
          {activeTab === 'order-detail' && selectedOrder && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-indigo-600 hover:underline mb-1"
                  >
                    ← Back to Orders
                  </button>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Order Visual Timeline — {selectedOrder.id}
                  </h2>
                </div>
                <span className={`px-4 py-1.5 text-xs font-bold rounded-full ${
                  selectedOrder.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800'
                }`}>
                  Status: {selectedOrder.status}
                </span>
              </div>

              {/* Order Tracking Progress Line */}
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200/80 space-y-6">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Live Delivery Timeline</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                  {selectedOrder.timeline?.map((step, idx) => (
                    <div key={idx} className="flex md:flex-col items-center gap-3 md:text-center z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-colors ${
                        step.completed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                      }`}>
                        {step.completed ? <Check className="w-5 h-5" /> : idx + 1}
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.status}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Ordered Items</h3>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white border overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-slate-400">Qty: {item.quantity} • Color: {item.color} • Size: {item.size}</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-slate-900 text-sm">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">Saved Shipping Addresses</h2>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-500 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Address
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map(addr => (
                  <div key={addr.id} className="p-5 bg-slate-50 rounded-3xl border border-slate-200 space-y-2 relative">
                    {addr.isDefault && (
                      <span className="absolute top-4 right-4 text-[10px] font-bold uppercase bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                    <h4 className="font-bold text-slate-900 text-sm">{addr.name}</h4>
                    <p className="text-xs font-semibold text-slate-700">{addr.fullName}</p>
                    <p className="text-xs text-slate-500">{addr.street}, {addr.city}, {addr.state} - {addr.postalCode}</p>
                    <p className="text-xs text-slate-400">Phone: {addr.phone}</p>
                  </div>
                ))}
              </div>

              {/* Add Address Modal */}
              {showAddressModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <form onSubmit={handleAddAddress} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                    <h3 className="font-bold text-slate-900 text-lg">Add New Address</h3>
                    <input
                      type="text"
                      placeholder="Address Label (e.g. Work / Home)"
                      required
                      value={newAddr.name}
                      onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border rounded-xl text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={newAddr.fullName}
                      onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border rounded-xl text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Street / House Number"
                      required
                      value={newAddr.street}
                      onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border rounded-xl text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border rounded-xl text-sm"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        required
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border rounded-xl text-sm"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="PIN Code"
                      required
                      value={newAddr.postalCode}
                      onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border rounded-xl text-sm font-mono"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      required
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border rounded-xl text-sm"
                    />

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddressModal(false)}
                        className="px-4 py-2 text-slate-600 text-xs font-bold hover:bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-500"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: PROFILE & SETTINGS */}
          {(activeTab === 'profile' || activeTab === 'settings') && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Account Settings & Security
              </h2>

              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Account Display Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name || 'Aarav Sharma'}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled
                    defaultValue={user?.email || 'aarav.sharma@example.com'}
                    className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-500 cursor-not-allowed"
                  />
                </div>
                <button
                  onClick={() => showToast('Profile settings saved!', 'success')}
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-500 shadow-md"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
