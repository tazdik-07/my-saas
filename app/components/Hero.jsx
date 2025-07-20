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
    <section className="relative min-h-screen flex items-center py-20 px-6 lg:px-8 bg-gradient-to-br from-[#0B1220] via-[#0F1629] to-[#0B1220]">      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-7xl text-center animate-fade-in">
          <h1 className="heading text-4xl font-bold text-white shadow-sm sm:text-7xl tracking-tight bg-clip-text">
            Book Trusted Doctors <span className="gradient-text">Near You</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto sm:text-base">
            Get instant consultations with verified reviews, real-time availability, and a smooth, no-wait experience from start to finish.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-12 mx-auto max-w-4xl animate-slide-up">
          <form
            onSubmit={handleSearch}
            className="bg-[#1e2741] backdrop-blur-sm rounded-2xl p-6 border border-gray-700 glow"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctors, specialties..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-[#0b1220] border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a] focus:border-transparent"
                />
              </div>
              <div className="relative">
                <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-[#0b1220] border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02c39a] focus:border-transparent"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 btn-primary py-4 px-8 rounded-xl text-[#0c1322] font-semibold text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search Doctors"}
            </button>
          </form>
        </div>

        
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#02c39a]/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#05668d]/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-blur z-50">
          <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <div className="text-white text-xl font-semibold">Searching...</div>
          </div>
        </div>
      )}
    </section>
  )
}
