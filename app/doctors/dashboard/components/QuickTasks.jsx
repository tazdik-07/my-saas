"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, FlaskConical, Mail, CheckCircle } from "lucide-react";

const quickTasks = [
  { id: "prescriptions", label: "Unsigned Prescriptions", count: 3, icon: FileText },
  { id: "lab_reviews", label: "Lab Reviews", count: 5, icon: FlaskConical },
  { id: "messages", label: "Unread Messages", count: 2, icon: Mail },
];

export default function QuickTasks() {
  return (
    <Card className="p-6 rounded-xl shadow-lg bg-gray-800 text-gray-100 flex-grow border border-gray-600">
      <h2 className="text-2xl font-semibold text-gray-50 mb-4">Quick Tasks</h2>
      {quickTasks.length > 0 ? (
        <div className="space-y-4">
          {quickTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <Checkbox id={task.id} className="mr-3 border-gray-500 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                <task.icon className="h-5 w-5 mr-2 text-indigo-400" />
                <label htmlFor={task.id} className="text-lg font-medium text-gray-50 cursor-pointer">
                  {task.label}
                </label>
              </div>
              <span className="text-blue-400 font-semibold">{task.count}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-8">
          <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-600" />
          <p className="text-lg">All caught up! No quick tasks for today.</p>
        </div>
      )}
    </Card>
  );
}
