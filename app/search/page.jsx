"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  LoaderCircle,
  MapPin,
  Stethoscope,
  Building2,
  Award,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

/* ─────────────────────────────── Doctor card ────────────────────────────── */
function DoctorCard({ doctor }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-[#1E2741] border border-gray-700 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
        <CardContent className="p-4 grid grid-cols-[140px_1fr] items-center gap-4">
          {/* avatar */}
          <div className="relative w-full aspect-square overflow-hidden rounded-lg">
            <img
              src={doctor.photoUrl || "/img/doctor-placeholder.png"}
              alt={doctor.name}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>

          {/* details */}
          <div className="flex flex-col justify-between self-stretch">
            <div>
              <h3 className="font-semibold text-lg text-white">{doctor.name}</h3>
              <p className="text-sm text-indigo-400 flex items-center gap-1">
                <Stethoscope className="w-4 h-4" /> {doctor.speciality}
              </p>
              {doctor.clinicName && (
                <p className="text-sm text-gray-300 flex items-center gap-1">
                  <Building2 className="w-4 h-4" /> {doctor.clinicName}
                </p>
              )}
              <p className="text-sm text-gray-300 flex items-center gap-1">
                <Award className="w-4 h-4" /> {doctor.yearsOfExperience} yrs experience
              </p>
              <p className="text-sm text-gray-300 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {doctor.city}
              </p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-medium text-green-400">
                ₹{doctor.consultationFee ?? "--"}
              </span>
              <Link href={`/doctors/${doctor.id}/book`}>
                <Button size="sm" className="border border-gray-600 bg-[#2b5ca4] hover:bg-[#3E8BFF]/80 text-white cursor-pointer">
                  Book
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ──────────────────────────── Main search page ─────────────────────────── */
export default function DoctorSearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [speciality, setSpeciality] = useState("");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  /* map "ALL" → empty string */
  const handleSpecChange = (val) => setSpeciality(val === "ALL" ? "" : val);

  /* fetch */
  useEffect(() => {
    const controller = new AbortController();
    const fetchDocs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ query, speciality, city });
        const res = await fetch(`/api/search/doctors?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setDoctors(data.doctors);
      } catch (e) {
        if (e.name !== "AbortError") console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
    return () => controller.abort();
  }, [query, speciality, city]);

  return (
    <div className="relative bg-gradient-to-br from-[#0B1220] via-[#0F1629] to-[#0B1220] min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pb-20 pt-24">
      {/* ───────── Hero search bar ───────── */}
      <div className="w-full animate-slide-up mb-8">
        <div className="bg-[#1e2741] backdrop-blur-sm rounded-2xl p-6 border border-gray-700 glow">
          <div className="flex flex-col md:flex-row gap-4 items-center w-full">
            {/* term */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors, specialties…"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E8BFF] focus:border-transparent"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {/* city */}
            <div className="relative w-full md:w-64">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E8BFF] focus:border-transparent"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            {/* button */}
            <Button className="w-full md:w-auto btn-primary py-4 px-8 rounded-xl text-white font-semibold text-lg">
              Search Doctors
            </Button>
          </div>
        </div>
      </div>

      {/* ───────── Speciality dropdown filter ───────── */}
      <div className="sticky top-4 z-10 bg-background/70 backdrop-blur mb-6 rounded-2xl shadow-sm p-4 w-full md:w-72 mx-auto md:mx-0">
        <Select value={speciality || "ALL"} onValueChange={handleSpecChange}>
          <SelectTrigger className="w-full bg-[#1e2741]">
            <SelectValue placeholder="All specialities" />
          </SelectTrigger>
          <SelectContent className="bg-[#1e2741]">
            <SelectItem value="ALL">All</SelectItem>
            {["Cardiology", "Dermatology", "Endocrinology", "Gastroenterology", "General Surgery", "Gynecology", "Neurology", "Oncology", "Ophthalmology", "Orthopedics", "Pediatrics", "Psychiatry", "Pulmonology", "Radiology", "Urology", "Allergology", "Anesthesiology", "Audiology", "Bariatrics", "Chiropractic", "Dentistry", "Dietetics", "Emergency Medicine", "Family Medicine", "Forensic Medicine", "Geriatrics", "Hematology", "Hepatology", "Immunology", "Infectious Disease", "Internal Medicine", "Neonatology", "Nephrology", "Obstetrics", "Occupational Medicine", "Osteopathy", "Otolaryngology", "Pain Management", "Palliative Medicine", "Pathology", "Physical Medicine and Rehabilitation", "Plastic Surgery", "Podiatry", "Preventive Medicine", "Rheumatology", "Sleep Medicine", "Sports Medicine", "Toxicology", "Transplant Surgery", "Vascular Surgery"].map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ───────── Results ───────── */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoaderCircle className="animate-spin w-8 h-8" />
        </div>
      ) : doctors.length === 0 ? (
        <p className="text-center text-muted-foreground mt-20">No doctors found.</p>
      ) : (
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((d) => (
            <DoctorCard key={d.id} doctor={d} />
          ))}
        </motion.div>
      )}
      </div> {/* end .container */}

      {/* Background decoration (outside container) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3E8BFF]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#4DAAFB]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </div>  /* end .relative wrapper */
  );
}
