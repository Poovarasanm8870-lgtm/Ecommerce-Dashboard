import React, { useState } from 'react';
import { Save, Building, ShieldCheck, DollarSign, Truck } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export const AdminSettings = () => {
  const { showToast } = useToast();

  const [settings, setSettings] = useState({
    storeName: 'LUXE Retail Private Limited',
    currency: 'INR (₹)',
    taxRate: '8',
    freeShippingMin: '2000',
    supportEmail: 'support@luxe.store',
    supportPhone: '+91 1800-LUXE-VIP'
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Store parameters saved successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Playfair_Display']">
          Store Operations Settings
        </h1>
        <p className="text-slate-400 text-xs mt-1">Configure global parameters, tax rates, and store contact information</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl text-white">
        <div className="space-y-4">
          <h3 className="font-bold text-base border-b border-slate-800 pb-2 text-indigo-400">General Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Registered Brand Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-semibold focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Primary Currency</label>
              <input
                type="text"
                disabled
                value={settings.currency}
                className="w-full p-3 bg-slate-950/50 border border-slate-800 rounded-xl text-sm font-semibold text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-base border-b border-slate-800 pb-2 text-indigo-400">Financial & Shipping Rules</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Standard GST Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Free Shipping Threshold (₹)</label>
              <input
                type="number"
                value={settings.freeShippingMin}
                onChange={(e) => setSettings({ ...settings, freeShippingMin: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Store Settings
          </button>
        </div>
      </form>
    </div>
  );
};
