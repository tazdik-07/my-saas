"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { AppointmentsSection } from "../components/AppointmentsSection";

export default function AppointmentsPage() {
  return (
        <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Appointments Management
        </h1>
        <p className="text-gray-400">
          View, manage, and schedule patient appointments
        </p>
      </motion.div>

      {/* Appointments Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <AppointmentsSection />
      </motion.div>
    </div>
  );
}
