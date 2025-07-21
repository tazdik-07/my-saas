"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { Stethoscope, CalendarCheck, ClipboardList, Siren } from "lucide-react"

export default function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const params = new URLSearchParams()
    if (query) params.set("query", query)
    if (location) params.set("city", location)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <section className="relative min-h-screen flex items-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0B1220] via-[#0F1629] to-[#0B1220]">
      <div className="mx-auto max-w-7xl w-full">
        {/* Main content */}
        <div className="mx-auto max-w-4xl text-center animate-fade-in flex flex-col items-center">
          <h1 className="heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white shadow-sm tracking-tight bg-clip-text leading-tight whitespace-nowrap">
            Book Trusted Doctors <span className="gradient-text mt-2 sm:mt-0">Near You</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-6 sm:leading-8 text-gray-300 max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-0">
            Get instant consultations with verified reviews, real-time availability, and a smooth, no-wait experience from start to finish.
          </p>
        </div>

        {/* Enhanced Search Bar for Mobile */}
        <div className="mt-8 sm:mt-12 mx-auto max-w-4xl animate-slide-up">
          <form
            onSubmit={handleSearch}
            className="bg-[#1e2741]/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-gray-700/50 glow"
          >
            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctors, specialties..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-[#0b1220]/90 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                />
              </div>
              <div className="relative">
                <MapPinIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="City or area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-[#0b1220]/90 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-3 sm:mt-4 btn-primary py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-[#0c1322] font-semibold text-base sm:text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0c1322] mr-2"></div>
                  Searching...
                </span>
              ) : (
                "Search Doctors"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Background decoration - responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-[#02c39a]/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-[#05668d]/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-blur z-50">
          <div className="flex flex-col items-center bg-[#0B1220]/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-gray-700/50">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10 sm:h-12 sm:w-12 mb-4"></div>
            <div className="text-white text-lg sm:text-xl font-semibold">Searching...</div>
            <div className="text-gray-400 text-sm mt-2">Finding the best doctors for you</div>
          </div>
        </div>
      )}
    </section>
  )
}
