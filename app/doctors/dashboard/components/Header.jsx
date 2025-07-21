"use client";

import { useState, useEffect } from "react";
import { Bell, Search, ChevronDown, Settings, LogOut, User } from 'lucide-react';
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      const fetchDoctorProfile = async () => {
        try {
          const res = await fetch(`/api/doctors/${session.user.id}`);
          if (res.ok) {
            const data = await res.json();
            setDoctorProfile(data.doctor);
          } else {
            console.error("Failed to fetch doctor profile, status:", res.status);
          }
        } catch (error) {
          console.error("Error fetching doctor profile:", error);
        }
      };
      fetchDoctorProfile();
    }
  }, [session, status]);

  const doctorName = doctorProfile?.firstName && doctorProfile?.lastName 
    ? `Dr. ${doctorProfile.firstName} ${doctorProfile.lastName}` 
    : "Dr. Doctor";
  const doctorSpecialty = doctorProfile?.specialty || "Specialty";

  const getInitials = () => {
    if (doctorProfile?.firstName && doctorProfile?.lastName) {
      return `${doctorProfile.firstName[0]}${doctorProfile.lastName[0]}`.toUpperCase();
    }
    return "DR";
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#0B1220] via-[#0F1629] to-[#0B1220] border-b border-gray-800/50 backdrop-blur-sm">
      {/* Left section - Greeting */}
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Right section - Search, Notifications, Profile */}
      <div className="flex items-center space-x-6">
        {/* Enhanced Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search patients, appointments..." 
            className="w-80 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button className="relative p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/60 transition-all duration-200">
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#02c39a] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/60 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#02c39a] to-[#05668d] flex items-center justify-center text-white font-semibold text-sm">
              {getInitials()}
            </div>
            <div className="text-left hidden md:block">
              <p className="font-semibold text-white text-sm">{doctorName}</p>
              <p className="text-xs text-gray-400">{doctorSpecialty}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-700/50">
                <p className="font-semibold text-white">{doctorName}</p>
                <p className="text-sm text-gray-400">{doctorSpecialty}</p>
                <p className="text-xs text-gray-500 mt-1">{session?.user?.email}</p>
              </div>
              
              <Link href="/doctors/dashboard/profile" onClick={() => setIsProfileMenuOpen(false)}>
                <div className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors duration-200">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Profile Settings</span>
                </div>
              </Link>
              
              <Link href="/doctors/dashboard/settings" onClick={() => setIsProfileMenuOpen(false)}>
                <div className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors duration-200">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Account Settings</span>
                </div>
              </Link>
              
              <div className="border-t border-gray-700/50 mt-2">
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-colors duration-200 w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isProfileMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </header>
  );
}
