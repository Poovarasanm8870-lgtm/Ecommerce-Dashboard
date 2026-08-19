import React, { useState } from 'react';
import { Search, Eye, Filter, CheckCircle2, Clock, Truck, XCircle } from 'lucide-react';
import { useOrders } from '../../../context/OrderContext';
import { useToast } from '../../../context/ToastContext';

export const AdminOrders = () => {
  const { orders, updateOrderStatus } = useOrders();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    showToast(`Order #${orderId} status updated to '${newStatus}'`, 'success');
  };

  const filteredOrders = orders.filter(order => {
    if (statusFilter !== 'All' && order.status !== statusFilter) return false;
    if (searchQuery.trim() &&
        !order.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Playfair_Display']">
            Order Pipeline & Status Control
          </h1>
          <p className="text-slate-400 text-xs mt-1">Manage order fulfilment lifecycle from processing to delivery</p>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search order ID or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-slate-950 border border-slate-800 text-slate-300 font-semibold text-xs rounded-xl focus:outline-none"
        >
          <option value="All">All Statuses</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Order Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono font-extrabold text-white">{order.id}</td>
                  <td className="p-4">
                    <div>
                      <h4 className="font-bold text-white text-xs">{order.customer.name}</h4>
                      <span className="text-[10px] text-slate-400">{order.customer.phone}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-400">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="p-4 font-extrabold text-white">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span className="text-xs text-slate-300">{order.paymentMethod}</span>
                    <span className="block text-[10px] text-emerald-400 font-bold">{order.paymentStatus}</span>
                  </td>
                  <td className="p-4">
                    {/* Status Dropdown selector for Admin */}
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs border focus:outline-none cursor-pointer ${
                        order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                        order.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                        order.status === 'Out for Delivery' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                      }`}
                    >
                      <option value="Processing" className="bg-slate-900 text-white">Processing</option>
                      <option value="Shipped" className="bg-slate-900 text-white">Shipped</option>
                      <option value="Out for Delivery" className="bg-slate-900 text-white">Out for Delivery</option>
                      <option value="Delivered" className="bg-slate-900 text-white">Delivered</option>
                      <option value="Cancelled" className="bg-slate-900 text-white">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-lg font-['Playfair_Display']">Order Inspection — {selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl space-y-1">
                <p className="font-bold text-slate-200">Customer: {selectedOrder.customer.name} ({selectedOrder.customer.email})</p>
                <p className="text-slate-400">Address: {selectedOrder.address.street}, {selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.postalCode}</p>
                <p className="text-slate-400">Phone: {selectedOrder.address.phone}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-300">Order Items:</h4>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-slate-950 rounded-xl">
                    <span className="font-medium text-white">{item.name} (x{item.quantity})</span>
                    <span className="font-bold text-slate-200">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-900/40 flex justify-between font-extrabold text-sm text-indigo-300">
                <span>Total Amount Paid:</span>
                <span>₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setSelectedOrder(null)} className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
