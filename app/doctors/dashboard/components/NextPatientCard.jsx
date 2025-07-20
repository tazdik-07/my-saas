"use client";

import { Button } from "@/components/ui/button";
import { User, Clock, Stethoscope } from "lucide-react";

export function NextPatientCard({ patient }) {
  return (
    <div className="bg-[#0B1220] border border-gray-800 rounded-xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Next Patient</h3>
      {patient ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#02c39a] to-[#05668d] flex items-center justify-center text-white text-2xl font-bold">
              {patient.name.charAt(0)}
            </div>
            <div>
              <p className="text-xl font-semibold text-white">{patient.name}</p>
              <p className="text-gray-400 flex items-center text-sm mt-1">
                <Clock className="w-4 h-4 mr-1" /> {patient.time}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <Stethoscope className="w-4 h-4" />
            <span>Reason: {patient.reason}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <Clock className="w-4 h-4" />
            <span>Wait Time: {patient.waitTime}</span>
          </div>
          <div className="flex gap-3 mt-5">
            <Button className="btn-primary flex-1">Start Consultation</Button>
            <Button variant="outline" className="flex-1 border-gray-600 hover:bg-gray-700/50 hover:text-white">
              Skip Patient
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">No patients in queue.</p>
      )}
    </div>
  );
}