"use client";

import { motion } from "motion/react";
import { EarningsSection } from "../components/EarningsSection";

export default function EarningsPage() {
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
          Earnings & Financial Analytics
        </h1>
        <p className="text-gray-400">
          Track your income, analyze performance trends, and manage financial data
        </p>
      </motion.div>

      {/* Earnings Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <EarningsSection />
      </motion.div>
    </div>
  );
}
