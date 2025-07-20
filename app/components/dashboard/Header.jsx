import { Bell, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-[#0B1220] border-b border-gray-800">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        
      </div>
      <div className="flex items-center">
        <div className="relative mr-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search patients, appointments..." 
            className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#02c39a]"
          />
        </div>
        <Bell className="w-6 h-6 mr-6 text-gray-400 cursor-pointer hover:text-white transition-colors duration-200" />
        </div>
    </header>
  );
}
