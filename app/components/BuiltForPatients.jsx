import { Search, ListChecks, CalendarCheck, FileText } from 'lucide-react';

export default function BuiltForPatients() {
  return (
    <section className="py-20 bg-[#0B1220] text-white">
      <div className="container mx-auto px-6 text-center max-w-6xl">
        <h2 className="text-5xl font-bold mb-6">Built for <span className="gradient-text">Patients</span></h2>
        <p className="text-lg text-gray-400 mb-12">Everything you need for modern healthcare management</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-xl shadow-lg card-hover">
            <div className="bg-[#13282c] p-4 rounded-2xl mb-4">
              <Search className="w-8 h-8 text-[#38e5d4]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Smart Doctor Search</h3>
            <p className="text-gray-400 text-sm">Find the right specialist for your needs.</p>
          </div>

          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-xl shadow-lg card-hover">
            <div className="bg-[#13282c] p-4 rounded-2xl mb-4">
              <ListChecks className="w-8 h-8 text-[#38e5d4]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Real-time Queue Tracking</h3>
            <p className="text-gray-400 text-sm">Stay updated on your position in the queue.</p>
          </div>

          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-xl shadow-lg card-hover">
            <div className="bg-[#13282c] p-4 rounded-2xl mb-4">
              <CalendarCheck className="w-8 h-8 text-[#38e5d4]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Book and Cancel Anytime</h3>
            <p className="text-gray-400 text-sm">Manage your appointments with ease, 24/7.</p>
          </div>

          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-xl shadow-lg card-hover">
            <div className="bg-[#13282c] p-4 rounded-2xl mb-4">
              <FileText className="w-8 h-8 text-[#38e5d4]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Health Record Access</h3>
            <p className="text-gray-400 text-s">Securely access your medical history and reports.</p>
          </div>
        </div>
      </div>
    </section>
  );
}