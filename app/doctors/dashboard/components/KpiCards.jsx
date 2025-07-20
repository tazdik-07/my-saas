"use client";

import { DollarSign, Users, Clock, CalendarCheck } from "lucide-react";

export function KpiCards({ data }) {
  const kpis = [
    {
      id: 1,
      name: "Today’s Appointments",
      value: data.todayAppointments,
      icon: CalendarCheck,
      color: "text-[#02c39a]",
      bgColor: "bg-[#02c39a]/20",
    },
    {
      id: 2,
      name: "Patients in Queue",
      value: data.patientsInQueue,
      icon: Users,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
    },
    {
      id: 3,
      name: "Today's Earnings",
      value: `₹${data.todayEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
    },
    {
      id: 4,
      name: "Average Wait Time",
      value: data.averageWaitTime,
      icon: Clock,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          className="bg-[#0B1220] border border-gray-800 rounded-xl p-5 flex items-center space-x-4 shadow-xl"
        >
          <div
            className={`p-3 rounded-full ${kpi.bgColor} ${kpi.color}`}
          >
            <kpi.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-400">{kpi.name}</p>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}