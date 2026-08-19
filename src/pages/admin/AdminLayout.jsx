import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Layers, Tag, Star, BarChart3,
  Settings, LogOut, ShieldAlert, Search, Bell, Menu, X, ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

// Import Admin tab view sub-components
import { AdminOverview } from './tabs/AdminOverview';
import { AdminProducts } from './tabs/AdminProducts';
import { AdminOrders } from './tabs/AdminOrders';
import { AdminCustomers } from './tabs/AdminCustomers';
import { AdminInventory } from './tabs/AdminInventory';
import { AdminAnalytics } from './tabs/AdminAnalytics';
import { AdminSettings } from './tabs/AdminSettings';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'products' | 'orders' | 'customers' | 'inventory' | 'analytics' | 'settings'
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Navbar Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm">
              L
            </div>
            <span className="font-['Playfair_Display'] text-xl font-bold tracking-tight text-white">
              LUXE <span className="text-xs text-indigo-400 uppercase font-sans font-extrabold ml-1">SaaS Control</span>
            </span>
          </div>
        </div>

        {/* Global Admin Search & Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          >
            <span>Live Customer Store</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
          </Link>

          <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-white">Admin Master</p>
              <p className="text-[10px] text-indigo-400 font-semibold">Super Administrator</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Admin Navigation Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between p-3 shrink-0`}>
          <div className="space-y-1">
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-xs transition-all ${
                activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>Dashboard Overview</span>}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-xs transition-all ${
                activeTab === 'products' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Package className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>Products Catalog</span>}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-xs transition-all ${
                activeTab === 'orders' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <ShoppingCart className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>Orders Pipeline</span>}
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-xs transition-all ${
                activeTab === 'customers' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>Customers Directory</span>}
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-xs transition-all ${
                activeTab === 'inventory' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Layers className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>Inventory & Stock</span>}
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-xs transition-all ${
                activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BarChart3 className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>Sales Analytics</span>}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-xs transition-all ${
                activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Settings className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>Store Settings</span>}
            </button>

          </div>

          {/* Logout Action */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                logout();
                showToast('Admin logged out', 'info');
                navigate('/admin/login');
              }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-xs text-rose-400 hover:bg-rose-950/40 transition-colors"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>Sign Out</span>}
            </button>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {activeTab === 'dashboard' && <AdminOverview onNavigate={(tab) => setActiveTab(tab)} />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'customers' && <AdminCustomers />}
          {activeTab === 'inventory' && <AdminInventory />}
          {activeTab === 'analytics' && <AdminAnalytics />}
          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>

    </div>
  );
};
