import React from 'react';
import {
  DollarSign, ShoppingCart, Users, Package, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight, Layers
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell
} from 'recharts';
import { useOrders } from '../../../context/OrderContext';
import { useProducts } from '../../../context/ProductContext';
import { INITIAL_CUSTOMERS } from '../../../data/mockCustomers';

// Chart colors
const PIE_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

const REVENUE_DATA = [
  { month: 'Jan', revenue: 142000, orders: 42 },
  { month: 'Feb', revenue: 198000, orders: 58 },
  { month: 'Mar', revenue: 165000, orders: 51 },
  { month: 'Apr', revenue: 245000, orders: 74 },
  { month: 'May', revenue: 289000, orders: 89 },
  { month: 'Jun', revenue: 312000, orders: 96 }
];

const CATEGORY_DATA = [
  { name: 'Electronics', value: 45 },
  { name: 'Fashion', value: 25 },
  { name: 'Wearables', value: 15 },
  { name: 'Accessories', value: 10 },
  { name: 'Home & Living', value: 5 }
];

export const AdminOverview = ({ onNavigate }) => {
  const { orders } = useOrders();
  const { products } = useProducts();

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 1245000;
  const totalOrders = orders.length + 380;
  const lowStockCount = products.filter(p => p.stock < 10).length;
  const pendingOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Playfair_Display']">
            Business Executive Overview
          </h1>
          <p className="text-slate-400 text-xs mt-1">Real-time performance telemetry across store operations</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('products')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center gap-1.5"
          >
            <Package className="w-4 h-4" /> Manage Catalog
          </button>
          <button
            onClick={() => onNavigate('orders')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <ShoppingCart className="w-4 h-4" /> Process Orders
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Total Store Revenue</span>
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">₹{totalRevenue.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
            <TrendingUp className="w-4 h-4" /> +18.4% vs last month
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Total Orders</span>
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{totalOrders}</p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
            <ArrowUpRight className="w-4 h-4" /> {pendingOrders} pending shipment
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Registered Customers</span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">1,248</p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
            <ArrowUpRight className="w-4 h-4" /> +12 new today
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Low Stock Alerts</span>
            <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-rose-400">{lowStockCount}</p>
          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold">
            Requires stock restock
          </div>
        </div>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Trend Area Chart */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-base">Revenue Overview & Forecast</h3>
            <span className="text-xs text-indigo-400 font-bold bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-800">
              H1 2026 Metrics
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `₹${v/1000}k`} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#adminRevGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Pie Chart */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <h3 className="font-extrabold text-white text-base">Category Performance Share</h3>

          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_DATA} innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {CATEGORY_DATA.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }}></span>
                  <span>{c.name}</span>
                </div>
                <span className="font-bold text-white">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top Products & Low Stock Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-white text-base">Top Selling Products</h3>
          <div className="space-y-3">
            {products.slice(0, 4).map(p => (
              <div key={p.id} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-white text-xs line-clamp-1">{p.name}</h4>
                    <span className="text-[10px] text-slate-400">{p.category} • SKU: {p.sku}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-white text-sm">₹{p.price.toLocaleString('en-IN')}</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">{p.stock} in stock</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-base">Low Stock Inventory Warnings</h3>
            <button onClick={() => onNavigate('inventory')} className="text-xs font-bold text-indigo-400 hover:underline">
              Inventory Module →
            </button>
          </div>

          <div className="space-y-3">
            {products.filter(p => p.stock < 20).map(p => (
              <div key={p.id} className="p-3.5 bg-slate-950 rounded-2xl border border-rose-900/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs">
                    {p.stock}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs line-clamp-1">{p.name}</h4>
                    <span className="text-[10px] text-rose-400 font-semibold">Low Stock Threshold Triggered</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('inventory')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] rounded-xl border border-slate-700"
                >
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
