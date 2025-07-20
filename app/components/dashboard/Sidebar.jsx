'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Clock, Users, Star, IndianRupee } from 'lucide-react';

const navItems = [
  { href: '/doctors', icon: Home, label: 'Overview' },
  { href: '/doctors/appointments', icon: Calendar, label: 'Appointments' },
  { href: '/doctors/availability', icon: Clock, label: 'Availability' },
  { href: '/doctors/queue', icon: Users, label: 'Queue' },
  { href: '/doctors/reviews', icon: Star, label: 'Reviews' },
  { href: '/doctors/earnings', icon: IndianRupee, label: 'Earnings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-800 flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">Fibula</h2>
      </div>
      <nav className="flex-1 px-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${pathname === item.href ? ' btn-primary' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
