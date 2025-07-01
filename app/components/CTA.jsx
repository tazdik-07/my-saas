import { ArrowRightIcon } from "@heroicons/react/24/outline"

export default function CTA() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-[#0B1220]">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#143a5b] to-[#0a377a] px-8 py-16 shadow-2xl sm:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Take Control of Your Health?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of patients who trust HealthCare Pro for their medical needs. Book your first appointment
              today and experience healthcare the way it should be.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#3E8BFF] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:transform hover:scale-105 flex items-center justify-center">
                Book Appointment Now
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-[#3E8BFF] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  )
}
