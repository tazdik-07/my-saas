import { Search, Calendar, Bell } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-5">How It <span className="gradient-text">Works</span></h2>
        <p className="text-lg text-gray-400 mb-12">Get medical care in three simple steps.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-8 rounded-xl bg-gray-800 card-hover ">
            <div className="bg-[#13282c] p-4 rounded-2xl mb-6">
              <Search className="w-8 h-8 text-[#38e5d4]" />
            </div>
            <h3 className="text-xl font-bold mb-3 w-full text-center">Search</h3>
            <p className="text-gray-400 w-full text-center">Find doctors and clinics near you with smart filters.</p>
          </div>

          <div className="flex flex-col items-center p-8 rounded-xl bg-gray-800 card-hover  ">
            <div className="bg-[#13282c] p-4 rounded-2xl mb-6">
              <Calendar className="w-8 h-8 text-[#38e5d4]" />
            </div>
            <h3 className="text-xl font-bold mb-3 w-full text-center">Book</h3>
            <p className="text-gray-400 w-full text-center">Schedule appointments instantly or join virtual queues.</p>
          </div>

          <div className="flex flex-col items-center p-8 rounded-xl bg-gray-800 card-hover ">
            <div className="bg-[#13282c] p-4 rounded-2xl mb-6">
              <Bell className="w-8 h-8 text-[#38e5d4]" />
            </div>
            <h3 className="text-xl font-bold mb-3 w-full text-center">Get Live Updates</h3>
            <p className="text-gray-400 w-full text-center">Receive real-time notifications about your appointment status.</p>
          </div>
        </div>
      </div>
    </section>
  );
}