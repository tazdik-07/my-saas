
import { Users, CalendarCheck, BarChart, IndianRupee } from 'lucide-react';

export default function JoinFibula() {
  return (
    <section className="py-20 px-4">
      <div className="relative max-w-6xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 md:p-12 border border-gray-700 shadow-lg overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-green-500/10 to-transparent rounded-r-xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Column */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Own a Clinic? Join Fibula for <span className="gradient-text">Free.</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Streamline your practice, manage appointments effortlessly, and enhance patient engagement with our intuitive platform.
            </p>
            <button className="btn-primary text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-cyan-600 transition duration-300">
              Create Free Doctor Account
            </button>
          </div>

          {/* Right Column - Feature List */}
          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="bg-[#13282c] p-4 rounded-2xl">
                  <Users className="w-8 h-8 text-[#38e5d4]" />
                </div>
                <span className="text-lg text-white">Patient Management</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-[#13282c] p-4 rounded-2xl">
                  <CalendarCheck className="w-8 h-8 text-[#38e5d4]" />
                </div>
                <span className="text-lg text-white">Smart Scheduling</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="bg-[#13282c] p-4 rounded-2xl">
                  <BarChart className="w-8 h-8 text-[#38e5d4]" />
                </div>
                <span className="text-lg text-white">Analytics Dashboard</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-[#13282c] p-4 rounded-2xl">
                  <IndianRupee className="w-8 h-8 text-[#38e5d4]" />
                </div>
                <span className="text-lg text-white">Zero Commission Model</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}