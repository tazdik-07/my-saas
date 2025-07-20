'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Clock, Users, Star, IndianRupee } from 'lucide-react';

const navItems = [
  { href: '/doctors/dashboard', icon: Home, label: 'Overview' },
  { href: '/doctors/appointments', icon: Calendar, label: 'Appointments' },
  { href: '/doctors/dashboard/patient-queue', icon: Users, label: 'Patient Queue' },
  { href: '/doctors/reviews', icon: Star, label: 'Reviews' },
  { href: '/doctors/earnings', icon: IndianRupee, label: 'Earnings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0B1220] border-r border-gray-800 flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">Fibula</h2>
      </div>
      <nav className="flex-1 px-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${pathname === item.href ? 'bg-[#02c39a] text-white shadow-md' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-4 border-t border-gray-800">
        <div className="flex items-center">
          <img 
            src="/img/doctor-placeholder.png" 
            alt="Dr. Sarah Johnson" 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold text-white">Dr. Sarah Johnson</p>
            <p className="text-sm text-gray-400">Cardiologist</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
