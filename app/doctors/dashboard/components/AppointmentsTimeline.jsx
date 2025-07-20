"use client";

import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";

export function AppointmentsTimeline({ appointments }) {
  return (
    <div className="bg-[#0B1220] border border-gray-800 rounded-xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Today's Appointments</h3>
      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div key={appointment.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <Clock className="w-5 h-5 text-[#02c39a]" />
                <span className="text-sm text-gray-400 mt-1">{appointment.time}</span>
                {index < appointments.length - 1 && (
                  <div className="w-px h-8 bg-gray-600 my-1"></div>
                )}
              </div>
              <div className="flex-1 bg-[#0B1220] rounded-lg p-3 border border-gray-800">
                <p className="font-semibold text-white">{appointment.patientName}</p>
                <p className="text-sm text-gray-400">{appointment.type}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No appointments today.</p>
      )}
    </div>
  );
}