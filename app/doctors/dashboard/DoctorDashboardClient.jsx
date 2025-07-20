"use client";

import { useState, useEffect } from "react";
import { KpiCards } from "./components/KpiCards";
import { NextPatientCard } from "./components/NextPatientCard";
import { AppointmentsTimeline } from "./components/AppointmentsTimeline";
import { PerformanceChart } from "./components/PerformanceChart";
import { RecentReviews } from "./components/RecentReviews";
import { QuickTasks } from "./components/QuickTasks";
import { NotificationsDrawer } from "./components/NotificationsDrawer";
import { ProfileEditor } from "./components/ProfileEditor";
import { AvailabilityManager } from "./components/AvailabilityManager";

export default function DoctorDashboardClient() {
  // Dummy data for demonstration
  const kpiData = {
    todayAppointments: 12,
    patientsInQueue: 3,
    todayEarnings: 15000,
    averageWaitTime: "15 min",
  };

  const nextPatient = {
    name: "Jane Doe",
    time: "10:30 AM",
    reason: "Follow-up",
    waitTime: "10 min",
  };

  const appointments = [
    { id: 1, patientName: "John Doe", time: "10:00 AM", type: "Consultation" },
    { id: 2, patientName: "Jane Smith", time: "10:30 AM", type: "Follow-up" },
    { id: 3, patientName: "Peter Jones", time: "11:00 AM", type: "Check-up" },
  ];

  const reviews = [
    { id: 1, patientName: "Alice Brown", rating: 5, comment: "Excellent doctor, very thorough!" },
    { id: 2, patientName: "Bob White", rating: 4, comment: "Good experience, a bit of a wait." },
  ];

  const recentActivity = [
    { id: 1, type: "New Patient", description: "Sarah Connor registered." },
    { id: 2, type: "Appointment Change", description: "John Doe's appointment moved to 2 PM." },
  ];

  return (
    <div className="space-y-8">
      <KpiCards data={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <NextPatientCard patient={nextPatient} />
          <AppointmentsTimeline appointments={appointments} />
          <PerformanceChart />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <RecentReviews reviews={reviews} />
          <QuickTasks />
          <NotificationsDrawer notifications={recentActivity} />
        </div>
      </div>
    </div>
  );
}
