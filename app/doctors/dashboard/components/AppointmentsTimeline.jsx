"use client";

import { Card } from "@/components/ui/card";

const appointmentsToday = [
  { time: "08:00 AM", patient: "Alice Smith", status: "completed", type: "In-person" },
  { time: "09:00 AM", patient: "Bob Johnson", status: "upcoming", type: "Virtual" },
  { time: "10:00 AM", patient: "Charlie Brown", status: "cancelled", type: "In-person" },
  { time: "11:00 AM", patient: "Diana Prince", status: "upcoming", type: "Virtual" },
  { time: "12:00 PM", patient: "Eve Adams", status: "completed", type: "In-person" },
  { time: "01:00 PM", patient: "Frank White", status: "upcoming", type: "Virtual" },
  { time: "02:00 PM", patient: "Grace Lee", status: "upcoming", type: "In-person" },
  { time: "03:00 PM", patient: "Harry Potter", status: "upcoming", type: "Virtual" },
  { time: "04:00 PM", patient: "Ivy Green", status: "upcoming", type: "In-person" },
  { time: "05:00 PM", patient: "Jack Black", status: "upcoming", type: "Virtual" },
].sort((a, b) => {
  const timeA = new Date(`2000/01/01 ${a.time}`);
  const timeB = new Date(`2000/01/01 ${b.time}`);
  return timeB - timeA;
});

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-900/20";
    case "upcoming":
      return "bg-blue-900/20";
    case "cancelled":
      return "bg-red-900/20";
    default:
      return "bg-gray-900/20";
  }
};

export default function AppointmentsTimeline() {
  return (
    <Card className="p-6 rounded-xl shadow-lg bg-gray-800 text-gray-100 flex-grow border border-gray-600">
      <h2 className="text-2xl font-semibold text-gray-50 mb-4">Appointments Timeline</h2>
      <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {/* Custom Scrollbar Style */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #374151; /* gray-700 */
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4b5563; /* gray-600 */
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #6b7280; /* gray-500 */
          }
        `}</style>
        <div className="relative border-l-2 border-gray-700 pl-4">
          {appointmentsToday.map((appt, index) => (
            <div key={index} className={`mb-6 last:mb-0 relative p-3 rounded-lg ${getStatusColor(appt.status)}`}>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-medium text-gray-50">{appt.patient}</h3>
                <span className="font-bold text-indigo-400">{appointmentsToday.length - index}.</span>
              </div>
              <p className="text-sm text-gray-400">
                {appt.type} -{" "}
                <span
                  className={`font-semibold ${
                    appt.status === "completed"
                      ? "text-green-400"
                      : appt.status === "upcoming"
                      ? "text-blue-400"
                      : "text-red-400"
                  }`}
                >
                  {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                </span>
              </p>
              {/* Drag to reschedule, double click to create - conceptual */}
              {index === 0 && <p className="text-xs text-gray-500 mt-1">Drag to reschedule, double-click empty slot to create</p>}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
