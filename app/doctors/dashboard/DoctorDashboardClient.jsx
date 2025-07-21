"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useSession } from "next-auth/react";
import { KpiCards } from "./components/KpiCards";
import { PatientQueue } from "./components/PatientQueue";
import { AppointmentsSection } from "./components/AppointmentsSection";
import { EarningsSection } from "./components/EarningsSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { ActivityFeed } from "./components/ActivityFeed";

export default function DoctorDashboardClient() {
  const { data: session } = useSession();
  const [doctorName, setDoctorName] = useState("Doctor");

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/doctors/${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.doctor) {
            setDoctorName(`Dr. ${data.doctor.firstName}`);
          }
        });
    }
  }, [session]);

  // Enhanced dummy data for demonstration
  const kpiData = {
    todayAppointments: 12,
    patientsInQueue: 3,
    todayEarnings: 15000,
    averageWaitTime: "15 min",
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
        <div>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}, {doctorName}! 👋
            </h1>
            <p className="text-gray-400">
              You have {kpiData.todayAppointments} appointments today and {kpiData.patientsInQueue} patients waiting
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-gray-400">
              {currentTime.toLocaleDateString([], { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <KpiCards data={kpiData} />
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="xl:col-span-2 space-y-8">
          {/* Patient Queue */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PatientQueue />
          </motion.div>

          {/* Appointments Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AppointmentsSection />
          </motion.div>

          {/* Earnings Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <EarningsSection />
          </motion.div>
        </div>

        {/* Right Column - Secondary Content */}
        <div className="xl:col-span-1 space-y-8">
          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ActivityFeed />
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ReviewsSection />
          </motion.div>
        </div>
      </div>

      {/* Quick Action Floating Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="fixed bottom-8 right-8"
      >
        <button className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center">
          <span className="text-2xl">+</span>
        </button>
      </motion.div>
    </div>
  );
}
