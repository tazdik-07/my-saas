'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { IndianRupee, TrendingUp, TrendingDown, Calendar, Download, Eye } from 'lucide-react';

export function EarningsSection() {
  const [timeRange, setTimeRange] = useState('week');

  const earningsData = {
    week: {
      total: 85000,
      change: '+12%',
      trend: 'up',
      chartData: [
        { day: 'Mon', amount: 15000 },
        { day: 'Tue', amount: 12000 },
        { day: 'Wed', amount: 18000 },
        { day: 'Thu', amount: 14000 },
        { day: 'Fri', amount: 16000 },
        { day: 'Sat', amount: 10000 },
        { day: 'Sun', amount: 0 }
      ]
    },
    month: {
      total: 340000,
      change: '+8%',
      trend: 'up',
      chartData: [
        { day: 'Week 1', amount: 85000 },
        { day: 'Week 2', amount: 92000 },
        { day: 'Week 3', amount: 78000 },
        { day: 'Week 4', amount: 85000 }
      ]
    }
  };

  const recentPayouts = [
    {
      id: 1,
      date: "Today",
      amount: 16000,
      patients: 8,
      type: "Consultation fees",
      status: "completed"
    },
    {
      id: 2,
      date: "Yesterday",
      amount: 14000,
      patients: 7,
      type: "Follow-up fees",
      status: "completed"
    },
    {
      id: 3,
      date: "Jan 15",
      amount: 18000,
      patients: 9,
      type: "Mixed consultations",
      status: "completed"
    },
    {
      id: 4,
      date: "Jan 14",
      amount: 12000,
      patients: 6,
      type: "Check-up fees",
      status: "pending"
    }
  ];

  const currentData = earningsData[timeRange];
  const maxAmount = Math.max(...currentData.chartData.map(d => d.amount));

  return (
    <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <IndianRupee className="w-6 h-6 mr-3 text-emerald-400" />
          Earnings Overview
        </h3>
        
        <div className="flex items-center space-x-3">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          
          <button className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Earnings</span>
            {currentData.trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            ₹{currentData.total.toLocaleString()}
          </div>
          <div className={`text-sm ${currentData.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            {currentData.change} from last {timeRange}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Avg per Patient</span>
            <IndianRupee className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            ₹{Math.round(currentData.total / (currentData.chartData.reduce((acc, day) => acc + (day.amount > 0 ? 1 : 0), 0) * 8)).toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">
            Per consultation
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Peak Day</span>
            <Calendar className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            ₹{Math.max(...currentData.chartData.map(d => d.amount)).toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">
            Best performing day
          </div>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-white mb-4">Daily Breakdown</h4>
        <div className="bg-gray-900/50 rounded-xl p-4">
          <div className="flex items-end justify-between h-40 space-x-2">
            {currentData.chartData.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ height: 0 }}
                animate={{ height: `${(day.amount / maxAmount) * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-1 bg-gradient-to-t from-emerald-500 to-cyan-500 rounded-t-lg min-h-[4px] relative group"
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{day.amount.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-400">
            {currentData.chartData.map((day) => (
              <span key={day.day}>{day.day}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Payouts */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Recent Payouts</h4>
        <div className="space-y-3">
          {recentPayouts.map((payout, index) => (
            <motion.div
              key={payout.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-gray-900/50 rounded-xl border border-gray-800/30 p-4 hover:bg-gray-900/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">₹{payout.amount.toLocaleString()}</span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      payout.status === 'completed' 
                        ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
                        : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                    }`}>
                      {payout.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{payout.type}</span>
                    <span>{payout.patients} patients</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{payout.date}</div>
                </div>

                <button className="ml-4 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
