"use client";

import AvailabilityManager from "@/app/doctors/dashboard/components/AvailabilityManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DoctorAvailabilityPage() {
  return (
    <div className="relative bg-gradient-to-br from-[#0B1220] via-[#0F1629] to-[#0B1220] min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-8 mt-5 ml-5">Manage Your <span className="gradient-text">Availability</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 ">
          <AvailabilityManager />
        </div>
      </div>
      {/* Background decoration (outside container) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3E8BFF]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#4DAAFB]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}
