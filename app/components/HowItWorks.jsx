import { Search, Calendar, Bell } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-[#0b1220] text-white">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5">How It <span className="gradient-text">Works</span></h2>
        <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">Get medical care in three simple steps.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center p-6 sm:p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 card-hover">
            <div className="bg-[#0c1322] p-3 sm:p-4 rounded-2xl mb-4 sm:mb-6">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-[#02c39a]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 w-full text-center">Search</h3>
            <p className="text-gray-400 w-full text-center text-sm sm:text-base">Find doctors and clinics near you with smart filters.</p>
          </div>

          <div className="flex flex-col items-center p-6 sm:p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 card-hover sm:col-span-2 lg:col-span-1">
            <div className="bg-[#0c1322] p-3 sm:p-4 rounded-2xl mb-4 sm:mb-6">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#02c39a]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 w-full text-center">Book</h3>
            <p className="text-gray-400 w-full text-center text-sm sm:text-base">Schedule appointments instantly and join virtual queues.</p>
          </div>

          <div className="flex flex-col items-center p-6 sm:p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 card-hover sm:col-span-2 lg:col-span-1">
            <div className="bg-[#0c1322] p-3 sm:p-4 rounded-2xl mb-4 sm:mb-6">
              <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-[#02c39a]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 w-full text-center">Get Live Updates</h3>
            <p className="text-gray-400 w-full text-center text-sm sm:text-base">Receive real-time notifications about your appointment status.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
