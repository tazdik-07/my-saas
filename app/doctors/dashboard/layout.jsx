'use client';

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#0B1220] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header />
        <AnimatePresence mode="wait">
          <motion.div
            key={Math.random()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0B1220] p-4 sm:p-6 lg:p-8 pt-16 lg:pt-4"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
