import React from 'react';
import { TrendingUp, DollarSign, Users, Award, Percent } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell
} from 'recharts';

const MONTHLY_ANALYTICS = [
  { month: 'Jan', revenue: 142000, profit: 42000, customers: 120 },
  { month: 'Feb', revenue: 198000, profit: 64000, customers: 180 },
  { month: 'Mar', revenue: 165000, profit: 51000, customers: 140 },
  { month: 'Apr', revenue: 245000, profit: 82000, customers: 210 },
  { month: 'May', revenue: 289000, profit: 95000, customers: 260 },
  { month: 'Jun', revenue: 312000, profit: 104000, customers: 310 }
];

export const AdminAnalytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Playfair_Display']">
          Executive Sales & Financial Analytics
        </h1>
        <p className="text-slate-400 text-xs mt-1">Detailed metric breakdowns of monthly revenue, profit margins, and conversion velocity</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase text-slate-400">Total H1 Gross Revenue</span>
          <p className="text-3xl font-extrabold text-white">₹13,51,000</p>
          <p className="text-xs text-emerald-400 font-bold">+24.5% YoY Growth</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase text-slate-400">Average Order Value (AOV)</span>
          <p className="text-3xl font-extrabold text-amber-400">₹8,450</p>
          <p className="text-xs text-amber-400 font-bold">High Ticket Basket Size</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase text-slate-400">Store Conversion Rate</span>
          <p className="text-3xl font-extrabold text-indigo-400">3.82%</p>
          <p className="text-xs text-indigo-400 font-bold">+0.6% vs Industry Benchmark</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase text-slate-400">Net Profit Margin</span>
          <p className="text-3xl font-extrabold text-emerald-400">32.4%</p>
          <p className="text-xs text-emerald-400 font-bold">Healthy EBITDA</p>
        </div>
      </div>

      {/* Monthly Bar Chart Comparison */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-white text-base">Gross Revenue vs Net Profit Comparison</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_ANALYTICS}>
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `₹${v/1000}k`} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                formatter={(val) => [`₹${val.toLocaleString('en-IN')}`]}
              />
              <Bar dataKey="revenue" fill="#6366f1" radius={[8, 8, 0, 0]} name="Revenue" />
              <Bar dataKey="profit" fill="#10b981" radius={[8, 8, 0, 0]} name="Profit Margin" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
