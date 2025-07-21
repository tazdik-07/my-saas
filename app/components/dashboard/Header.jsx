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
  const [showMobileSearch, setShowMobileSearch] = useState(false);

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
    <>
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-[#0B1220] via-[#0F1629] to-[#0B1220] border-b border-gray-800/50 backdrop-blur-sm">
        {/* Left section - Greeting */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="lg:ml-0 ml-16">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 hidden sm:block">
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
        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
          {/* Enhanced Search Bar - Hidden on small screens */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search patients, appointments..." 
              className="w-48 lg:w-80 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl pl-10 lg:pl-12 pr-3 lg:pr-4 py-2 lg:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200 text-sm lg:text-base"
            />
          </div>

          {/* Mobile search button */}
          <button 
            className="md:hidden p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/60 transition-all duration-200"
            onClick={() => setShowMobileSearch(true)}
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/60 transition-all duration-200">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#02c39a] text-black text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/60 transition-all duration-200"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#02c39a] to-[#05668d] flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                {getInitials()}
              </div>
              <div className="text-left hidden sm:block">
                <p className="font-semibold text-white text-sm">{doctorName}</p>
                <p className="text-xs text-gray-400">{doctorSpecialty}</p>
              </div>
              <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''} hidden sm:block`} />
            </button>

            {/* Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 sm:w-64 bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-700/50">
                  <p className="font-semibold text-white text-sm">{doctorName}</p>
                  <p className="text-sm text-gray-400">{doctorSpecialty}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">{session?.user?.email}</p>
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

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#0B1220]/95 backdrop-blur-lg flex items-start justify-center pt-20">
          <div className="w-full max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search patients, appointments..." 
                autoFocus
                className="w-full bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a]/50 focus:border-[#02c39a]/50 transition-all duration-200"
              />
            </div>
            <button 
              onClick={() => setShowMobileSearch(false)}
              className="mt-4 w-full py-3 text-gray-400 hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
