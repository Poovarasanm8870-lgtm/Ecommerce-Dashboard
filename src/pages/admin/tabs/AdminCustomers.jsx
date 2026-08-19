import React, { useState } from 'react';
import { Search, ShieldOff, ShieldCheck, User, Eye, Ban } from 'lucide-react';
import { INITIAL_CUSTOMERS } from '../../../data/mockCustomers';
import { useToast } from '../../../context/ToastContext';

export const AdminCustomers = () => {
  const { showToast } = useToast();
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const toggleCustomerStatus = (id) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === id) {
        const newStatus = c.status === 'Active' ? 'Blocked' : 'Active';
        showToast(`Customer account set to ${newStatus}`, newStatus === 'Blocked' ? 'error' : 'success');
        return { ...c, status: newStatus };
      }
      return c;
    }));
  };

  const filteredCustomers = customers.filter(c => {
    if (searchQuery.trim() &&
        !c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Playfair_Display']">
            Customer Directory Management
          </h1>
          <p className="text-slate-400 text-xs mt-1">View lifetime customer spend, accounts, and block/unblock privileges</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center gap-4">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Location</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
              {filteredCustomers.map(c => (
                <tr key={c.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-xs">
                        {c.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs">{c.name}</h4>
                        <span className="text-[10px] text-slate-400">Joined: {c.registrationDate}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-white font-medium">{c.email}</p>
                    <span className="text-[10px] text-slate-400">{c.phone}</span>
                  </td>
                  <td className="p-4">{c.city}, {c.state}</td>
                  <td className="p-4 font-bold text-white">{c.totalOrders} orders</td>
                  <td className="p-4 font-extrabold text-amber-400">₹{c.totalSpent.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleCustomerStatus(c.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1 ${
                          c.status === 'Active' ? 'bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800' : 'bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                        }`}
                      >
                        {c.status === 'Active' ? <Ban className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                        <span>{c.status === 'Active' ? 'Block Account' : 'Unblock Account'}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
