"use client";

import { Card } from "@/components/ui/card";
import { Users, Calendar, AlertTriangle, IndianRupee, ArrowUpRight, ArrowDownRight } from "lucide-react";

const kpiData = [
  {
    title: "Patients Waiting",
    value: 12,
    icon: Users,
    change: 5,
    changeType: "increase",
    bgColor: "from-blue-700 to-blue-800",
  },
  {
    title: "Appointments Today",
    value: 25,
    icon: Calendar,
    change: 2,
    changeType: "increase",
    bgColor: "from-green-700 to-green-800",
  },
  {
    title: "Cancellations",
    value: 3,
    icon: AlertTriangle,
    change: 1,
    changeType: "increase",
    bgColor: "from-red-700 to-red-800",
  },
  {
    title: "Earnings Today",
    value: "₹1,200",
    icon: IndianRupee,
    change: 150,
    changeType: "increase",
    bgColor: "from-purple-700 to-purple-800",
  },
];

export default function KpiCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi) => (
        <Card
          key={kpi.title}
          className={`p-6 rounded-xl shadow-lg bg-gradient-to-br ${kpi.bgColor} text-white border border-gray-600 hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium opacity-90">{kpi.title}</h3>
            <kpi.icon className="h-8 w-8 opacity-70" />
          </div>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-bold">{kpi.value}</span>
            <div
              className={`flex items-center text-sm font-semibold ${
                kpi.changeType === "increase" ? "text-green-200" : "text-red-200"
              }`}
            >
              {kpi.changeType === "increase" ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {kpi.change}
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
}
