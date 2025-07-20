"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, CalendarPlus, UserPlus, MessageSquare } from "lucide-react";

export function QuickTasks() {
  const tasks = [
    { icon: CalendarPlus, label: "Add Appointment", href: "/doctors/appointments/new" },
    { icon: UserPlus, label: "Add New Patient", href: "/doctors/patients/new" },
    { icon: MessageSquare, label: "Send Broadcast", href: "/doctors/messages/new" },
    { icon: PlusCircle, label: "Update Availability", href: "/doctors/availability" },
  ];

  return (
    <div className="bg-[#0B1220] border border-gray-800 rounded-xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Quick Tasks</h3>
      <div className="grid grid-cols-2 gap-4">
        {tasks.map((task, index) => (
          <Button key={index} variant="outline" className="flex flex-col items-center justify-center h-28 border-gray-700 hover:bg-gray-700/50 hover:text-white text-center">
            <task.icon className="w-6 h-6 mb-2 text-[#02c39a]" />
            <span className="text-sm font-medium">{task.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}