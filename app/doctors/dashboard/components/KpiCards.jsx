'use client';

import { Calendar, Users, IndianRupee, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';

export function KpiCards({ data }) {
  const cards = [
    {
      title: "Today's Appointments",
      value: data.todayAppointments,
      change: "+2",
      trend: "up",
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/10"
    },
    {
      title: "Patients in Queue",
      value: data.patientsInQueue,
      change: "-1",
      trend: "down",
      icon: Users,
      color: "from-emerald-500 to-green-500",
      bgColor: "from-emerald-500/10 to-green-500/10"
    },
    {
      title: "Today's Earnings",
      value: `₹${data.todayEarnings.toLocaleString()}`,
      change: "+12%",
      trend: "up",
      icon: IndianRupee,
      color: "from-violet-500 to-purple-500",
      bgColor: "from-violet-500/10 to-purple-500/10"
    },
    {
      title: "Average Wait Time",
      value: data.averageWaitTime,
      change: "-3 min",
      trend: "down",
      icon: Clock,
      color: "from-amber-500 to-orange-500",
      bgColor: "from-amber-500/10 to-orange-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.bgColor} border border-gray-800/50 p-6 hover:scale-[1.02] transition-transform duration-300`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          
          {/* Icon */}
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${card.color} mb-4`}>
            <card.icon className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="relative">
            <p className="text-gray-400 text-sm font-medium mb-1">{card.title}</p>
            <p className="text-white text-2xl font-bold mb-2">{card.value}</p>
            
            {/* Trend */}
            <div className="flex items-center">
              {card.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-emerald-400 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                card.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {card.change}
              </span>
              <span className="text-gray-400 text-sm ml-1">vs yesterday</span>
            </div>
          </div>

          {/* Subtle glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 hover:opacity-[0.02] transition-opacity duration-300`} />
        </motion.div>
      ))}
    </div>
  );
}
