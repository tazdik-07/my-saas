'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Home, 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  IndianRupee, 
  Menu,
  X,
  ChevronLeft,
  User
} from 'lucide-react';

const navItems = [
  { href: '/doctors/dashboard', icon: Home, label: 'Overview' },
  { href: '/doctors/dashboard/appointments', icon: Calendar, label: 'Appointments' },
  { href: '/doctors/dashboard/patient-queue', icon: Users, label: 'Patient Queue' },
  { href: '/doctors/dashboard/availability', icon: Clock, label: 'Availability' },
  { href: '/doctors/dashboard/profile', icon: User, label: 'Profile' },
  { href: '/doctors/dashboard/earnings', icon: IndianRupee, label: 'Earnings' },
  { href: '/doctors/dashboard/reviews', icon: Star, label: 'Reviews' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    // Close mobile menu when navigation item is clicked
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-lg bg-[#0B1220]/90 backdrop-blur-sm border border-gray-700/50 text-white hover:bg-gray-800/50 transition-all duration-200"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${isCollapsed ? 'w-16' : 'w-64'} 
        bg-[#0A0F1C]/95 backdrop-blur-lg border-r border-gray-800/50 flex flex-col transition-all duration-300 ease-in-out relative
        max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50 max-lg:w-80
        ${isMobileMenuOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}
      `}>
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-800/50">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h2 className="text-xl sm:text-2xl font-bold text-white bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Fibula
              </h2>
            )}
            
            {/* Desktop collapse button */}
            <button
              className="hidden lg:flex p-2 rounded-lg hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>

            {/* Mobile close button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 sm:py-6 overflow-y-auto">
          <ul className="space-y-1 sm:space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.label}>
                  <Link 
                    href={item.href} 
                    onClick={handleNavClick}
                    className={`
                      group flex items-center px-3 py-3 sm:py-3 rounded-xl transition-all duration-200 relative
                      ${isActive 
                        ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                      }
                    `}
                    title={isCollapsed ? item.label : ''}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-r-full" />
                    )}
                    <item.icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} />
                    {!isCollapsed && (
                      <span className="font-medium truncate text-sm sm:text-base">{item.label}</span>
                    )}
                    {isActive && !isCollapsed && (
                      <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Doctor Profile */}
        <div className="mt-auto p-4 border-t border-gray-800/50">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-[#0A0F1C] font-semibold">
                SJ
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#0A0F1C]" />
            </div>
            {!isCollapsed && (
              <div className="ml-3 flex-1 min-w-0">
                <p className="font-semibold text-white truncate text-sm sm:text-base">Dr. Sarah Johnson</p>
                <p className="text-xs sm:text-sm text-gray-400 truncate">Cardiologist</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
