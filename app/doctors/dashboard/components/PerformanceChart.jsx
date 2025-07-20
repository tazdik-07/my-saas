"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IndianRupee } from "lucide-react";

const data = [
  { name: 'Mon', earnings: 4000 },
  { name: 'Tue', earnings: 3000 },
  { name: 'Wed', earnings: 2000 },
  { name: 'Thu', earnings: 2780 },
  { name: 'Fri', earnings: 1890 },
  { name: 'Sat', earnings: 2390 },
  { name: 'Sun', earnings: 3490 },
];

export function PerformanceChart() {
  return (
    <div className="bg-[#0B1220] border border-gray-800 rounded-xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Weekly Earnings</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0B1220', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#E5E7EB' }}
              itemStyle={{ color: '#E5E7EB' }}
              formatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Line type="monotone" dataKey="earnings" stroke="#02c39a" strokeWidth={2} dot={{ r: 4, fill: '#02c39a' }} activeDot={{ r: 6, fill: '#02c39a', stroke: '#02c39a', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-white mb-3">Recent Payouts</h4>
        <ul className="space-y-3">
          <li className="flex justify-between items-center text-gray-300">
            <span><IndianRupee className="inline-block w-4 h-4 mr-1" /> Payout #12345</span>
            <span className="font-semibold text-white">₹12,500</span>
          </li>
          <li className="flex justify-between items-center text-gray-300">
            <span><IndianRupee className="inline-block w-4 h-4 mr-1" /> Payout #12344</span>
            <span className="font-semibold text-white">₹10,000</span>
          </li>
        </ul>
      </div>
    </div>
  );
}