import { Search, ListChecks, CalendarCheck, FileText } from 'lucide-react';

export default function BuiltForPatients() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0b1220] text-white">
      <div className="container mx-auto px-4 sm:px-6 text-center max-w-6xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Built for <span className="gradient-text">Patients</span></h2>
        <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">Everything you need for modern healthcare management</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          <div className="flex flex-col items-center bg-[#1c2434]/60 backdrop-blur-sm border border-gray-700/30 p-5 sm:p-6 rounded-xl shadow-lg card-hover">
            <div className="bg-[#0c1322] p-3 sm:p-4 rounded-2xl mb-3 sm:mb-4">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-[#02c39a]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-center">Smart Doctor Search</h3>
            <p className="text-gray-400 text-xs sm:text-sm text-center">Find the right specialist for your needs.</p>
          </div>

          <div className="flex flex-col items-center bg-[#1c2434]/60 backdrop-blur-sm border border-gray-700/30 p-5 sm:p-6 rounded-xl shadow-lg card-hover">
            <div className="bg-[#0c1322] p-3 sm:p-4 rounded-2xl mb-3 sm:mb-4">
              <ListChecks className="w-6 h-6 sm:w-8 sm:h-8 text-[#02c39a]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-center">Real-time Queue Tracking</h3>
            <p className="text-gray-400 text-xs sm:text-sm text-center">Stay updated on your position in the queue.</p>
          </div>

          <div className="flex flex-col items-center bg-[#1c2434]/60 backdrop-blur-sm border border-gray-700/30 p-5 sm:p-6 rounded-xl shadow-lg card-hover">
            <div className="bg-[#0c1322] p-3 sm:p-4 rounded-2xl mb-3 sm:mb-4">
              <CalendarCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[#02c39a]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-center">Book and Cancel Anytime</h3>
            <p className="text-gray-400 text-xs sm:text-sm text-center">Manage your appointments with ease, 24/7.</p>
          </div>

          <div className="flex flex-col items-center bg-[#1c2434]/60 backdrop-blur-sm border border-gray-700/30 p-5 sm:p-6 rounded-xl shadow-lg card-hover">
            <div className="bg-[#0c1322] p-3 sm:p-4 rounded-2xl mb-3 sm:mb-4">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-[#02c39a]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-center">Health Record Access</h3>
            <p className="text-gray-400 text-xs sm:text-sm text-center">Securely access your medical history and reports.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
