"use client";

import { useState, useEffect } from "react";
import { Bell, Search } from 'lucide-react';
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const [doctorProfile, setDoctorProfile] = useState(null);

  console.log("Header - Initial Session status:", status);
  console.log("Header - Initial Session user:", session?.user);

  useEffect(() => {
    console.log("Header - useEffect triggered. Session status:", status);
    console.log("Header - useEffect triggered. Session user:", session?.user);

    if (status === "authenticated" && session?.user?.id) {
      const fetchDoctorProfile = async () => {
        try {
          const res = await fetch(`/api/doctors/${session.user.id}`);
          if (res.ok) {
            const data = await res.json();
            console.log("Header - Raw API response data:", data);
            setDoctorProfile(data.doctor);
            console.log("Header - Fetched doctor profile (inside useEffect):", data.doctor);
          } else {
            console.error("Header - Failed to fetch doctor profile, status:", res.status);
          }
        } catch (error) {
          console.error("Header - Error fetching doctor profile:", error);
        }
      };
      fetchDoctorProfile();
    } else if (status === "unauthenticated") {
      console.log("Header - User is unauthenticated.");
    }
  }, [session, status]);

  const doctorName = doctorProfile?.firstName && doctorProfile?.lastName 
    ? `Dr. ${doctorProfile.firstName} ${doctorProfile.lastName}` 
    : "Dr. Doctor";
  const doctorSpecialty = doctorProfile?.specialty || "Specialty";

  

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center">
        <div className="relative mr-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search patients, appointments..." 
            className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <Bell className="w-6 h-6 mr-6 text-gray-400 cursor-pointer" />
        <Link href="/doctors/profile">
          <div className="flex items-center cursor-pointer">
            <img 
              src="/img/doctor-placeholder.png" 
              alt={doctorName} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">{doctorName}</p>
              <p className="text-sm text-gray-400">{doctorSpecialty}</p>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}