'use client';

import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <AnimatePresence mode="wait">
          <motion.div
            key={Math.random()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-8"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
