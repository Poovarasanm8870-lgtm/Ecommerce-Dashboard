import React, { useState } from 'react';
import { Layers, AlertTriangle, RefreshCw, CheckCircle2, Edit } from 'lucide-react';
import { useProducts } from '../../../context/ProductContext';
import { useToast } from '../../../context/ToastContext';

export const AdminInventory = () => {
  const { products, updateStock } = useProducts();
  const { showToast } = useToast();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStockVal, setNewStockVal] = useState(0);

  const handleStockSave = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      updateStock(selectedProduct.id, newStockVal);
      showToast(`Updated stock for '${selectedProduct.name}' to ${newStockVal} units`, 'success');
      setSelectedProduct(null);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Playfair_Display']">
            Inventory & Stock Control
          </h1>
          <p className="text-slate-400 text-xs mt-1">Monitor real-time warehouse inventory quantities and low-stock alerts</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4">Stock Level Gauge</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
              {products.map(p => {
                const stockPercent = Math.min(100, Math.round((p.stock / 60) * 100));

                return (
                  <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt="" className="w-10 h-10 rounded-xl object-cover" />
                        <h4 className="font-bold text-white text-xs line-clamp-1">{p.name}</h4>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-slate-400">{p.sku}</td>
                    <td className="p-4 font-extrabold text-white text-sm">{p.stock} units</td>
                    <td className="p-4 w-48">
                      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div
                          className={`h-full rounded-full transition-all ${
                            p.stock < 10 ? 'bg-rose-500' : p.stock < 25 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${stockPercent}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.stock < 10 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                        p.stock < 25 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {p.stock < 10 ? 'LOW STOCK ALERT' : p.stock < 25 ? 'Moderate' : 'Healthy'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedProduct(p);
                          setNewStockVal(p.stock);
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 font-bold text-xs rounded-xl transition-colors border border-slate-700 inline-flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Adjust
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form onSubmit={handleStockSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-white">
            <h3 className="font-bold text-lg font-['Playfair_Display']">Adjust Inventory Stock</h3>
            <p className="text-xs text-slate-400">{selectedProduct.name} ({selectedProduct.sku})</p>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">New Stock Units Count</label>
              <input
                type="number"
                required
                min="0"
                value={newStockVal}
                onChange={(e) => setNewStockVal(Number(e.target.value))}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-base font-mono font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Save Stock
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
