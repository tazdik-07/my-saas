import { MagnifyingGlassIcon, MapPinIcon, CheckIcon } from "@heroicons/react/24/outline"

import { Stethoscope, CalendarCheck, ClipboardList, Siren   } from "lucide-react";


const benefits = [
    { text: "Find the best doctors near you", icon: Stethoscope  },
    { text: "Book appointments instantly", icon: CalendarCheck  },
    { text: "Access medical records online", icon: ClipboardList  },
    { text: "24/7 emergency support available", icon: Siren  },
]

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-8 bg-gradient-to-br from-[#0B1220] via-[#0F1629] to-[#0B1220]">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-7xl text-center animate-fade-in">
          <h1 className="heading text-4xl font-bold text-white shadow-sm sm:text-7xl tracking-tight">
            Book Trusted Doctors <span className="gradient-text">Near You</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto sm:text-base">
            Get instant consultations with verified reviews, real-time availability, and a smooth, no-wait experience from start to finish.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-12 mx-auto max-w-4xl animate-slide-up">
          <div className="bg-[#1e2741] backdrop-blur-sm rounded-2xl p-6 border border-gray-700 glow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctors, specialties..."
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E8BFF] focus:border-transparent"
                />
              </div>
              <div className="relative">
                <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E8BFF] focus:border-transparent"
                />
              </div>
            </div>
            <button className="w-full mt-4 btn-primary py-4 px-8 rounded-xl text-white font-semibold text-lg">
              Search Doctors
            </button>
          </div>
        </div>

        {/* Benefits List */}
        <div className="mt-16 mx-auto max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <benefit.icon className="h-6 w-6 text-[#3E8BFF]" />
                </div>
                <span className="text-gray-300 text-lg">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3E8BFF]/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#4DAAFB]/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </section>
  )
}
