import { Bell, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        
      </div>
      <div className="flex items-center">
        <div className="relative mr-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search patients, appointments..." 
            className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <Bell className="w-6 h-6 mr-6 text-gray-400 cursor-pointer" />
        <div className="flex items-center cursor-pointer">
          <img 
            src="/img/doctor-placeholder.png" 
            alt="Dr. Sarah Johnson" 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold">Dr. Sarah Johnson</p>
            <p className="text-sm text-gray-400">Cardiologist</p>
          </div>
        </div>
      </div>
    </header>
  );
}
