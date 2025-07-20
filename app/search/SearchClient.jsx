'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SearchNavbar from '@/app/components/SearchNavbar';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, SlidersHorizontal, ArrowUp, MapPin, Search as SearchIcon, Clock } from 'lucide-react';


const specialties = [
  "Cardiology", "Dermatology", "Endocrinology", "Gastroenterology", "General Surgery", 
  "Gynecology", "Neurology", "Oncology", "Ophthalmology", "Orthopedics", "Pediatrics", 
  "Psychiatry", "Pulmonology", "Radiology", "Urology", "Allergology", "Anesthesiology", 
  "Audiology", "Bariatrics", "Chiropractic", "Dentistry", "Dietetics", "Emergency Medicine", 
  "Family Medicine", "Forensic Medicine", "Geriatrics", "Hematology", "Hepatology", "Immunology", 
  "Infectious Disease", "Internal Medicine", "Neonatology", "Nephrology", "Obstetrics", 
  "Occupational Medicine", "Osteopathy", "Otolaryngology", "Pain Management", "Palliative Medicine", 
  "Pathology", "Physical Medicine and Rehabilitation", "Plastic Surgery", "Podiatry", 
  "Preventive Medicine", "Rheumatology", "Sleep Medicine", "Sports Medicine", "Toxicology", 
  "Transplant Surgery", "Vascular Surgery"
];

function DoctorCard({ doctor }) {
  const getSpecialtyColor = (specialty) => {
    const colors = {
        Cardiologist: 'bg-red-500/20 text-red-400 border border-red-500/30',
        Pediatrician: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
        Dermatologist: 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
        default: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
    };
    return colors[specialty] || colors.default;
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-[#1c2434] border border-gray-700/50 rounded-2xl shadow-lg hover:border-teal-500/50 transition-all duration-300 relative"
    >
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-white/10 z-10">
            
        </Button>
      <div className="p-6">
        <div className="flex items-start gap-5">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                {doctor.firstName.charAt(0)}
            </div>
            <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-green-400 border-4 border-[#1c2434]"></span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{`Dr. ${doctor.firstName} ${doctor.lastName}`}</h3>
            <div className="flex items-center gap-2 mt-1">
                <span className={`px-3 py-1 text-xs rounded-full ${getSpecialtyColor(doctor.specialty)}`}>{doctor.specialty}</span>
                <span className="text-gray-400 text-sm">at {doctor.clinicName}</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400 mt-3">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> {doctor.yearsOfExperience} yrs exp</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {doctor.city}</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0 pl-4">
            <div className="text-2xl font-bold text-white">₹{doctor.consultationFee}</div>
            <div className="text-sm text-gray-400">consultation</div>
            <div className="flex items-center justify-end gap-1 text-yellow-400 mt-2">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold text-white">4.9</span>
                <span className="text-gray-400 text-sm">(156)</span>
            </div>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-gray-700/50 flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
                <span className="py-1 px-3 text-xs rounded-full bg-green-500/20 text-green-300 border border-green-500/30">Available Today</span>
                <span className="py-1 px-3 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">Video Consult</span>
            </div>
            <div className="flex gap-3">
                <Button asChild variant="outline" className="border-gray-600 hover:bg-gray-700/50 hover:text-white">
                    <Link href={`/doctors/${doctor.id}/book`}>View Profile</Link>
                </Button>
                <Button asChild className="btn-primary font-bold shadow-lg hover:scale-105 transition-transform duration-300">
                    <Link href={`/doctors/${doctor.id}/book`}>Book Appointment</Link>
                </Button>
            </div>
        </div>
      </div>
    </motion.div>
  );
}

function SearchSkeleton() {
    return (
        <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-[#1c2434] border border-gray-700/50 rounded-2xl p-6 animate-pulse">
                    <div className="flex items-start gap-5">
                        <div className="w-24 h-24 rounded-full bg-gray-700"></div>
                        <div className="flex-1 space-y-3">
                            <div className="h-6 w-1/2 rounded bg-gray-700"></div>
                            <div className="h-4 w-1/3 rounded bg-gray-700"></div>
                            <div className="h-4 w-1/4 rounded bg-gray-700"></div>
                        </div>
                        <div className="w-1/4 space-y-2">
                            <div className="h-8 w-full rounded bg-gray-700"></div>
                            <div className="h-4 w-3/4 ml-auto rounded bg-gray-700"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function SearchClient({ doctors, searchParams }) {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const firstName = session?.user?.name?.split(' ')[0] || '';
  const lastName = session?.user?.name?.split(' ')[1] || '';
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [filters, setFilters] = useState({
    query: searchParams.query || '',
    city: searchParams.city || '',
    speciality: searchParams.speciality || 'ALL',
    gender: searchParams.gender || 'any',
    mode: searchParams.mode ? searchParams.mode.split(',') : [],
    availability: searchParams.availability ? searchParams.availability.split(',') : [],
    priceRange: searchParams.priceRange ? searchParams.priceRange.split(',').map(Number) : [0, 5000],
    sortBy: searchParams.sortBy || 'relevance'
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [doctors]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleMultiCheckboxChange = (key, value) => {
    const currentValues = filters[key];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    handleFilterChange(key, newValues);
  };

  const applyFilters = () => {
    setIsLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.length > 0 && value !== 'ALL' && value !== 'any') {
        if (Array.isArray(value)) {
            if(value.length > 0) params.set(key, value.join(','));
        } else {
            params.set(key, value);
        }
      }
    });
    router.push(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    setIsLoading(true);
    router.push('/search');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0b1220] text-gray-300 font-sans min-h-screen">
      <SearchNavbar/>
      <main className="container mx-auto px-4 py-8 pt-10">
        {/* Search Bar Section */}
        <div className="bg-[#1c2434] p-4 rounded-2xl border border-gray-700/50 mb-8">
            <div className="flex flex-col md:flex-row gap-2 bg-[#0b1220] p-2 rounded-xl">
                <div className="relative flex-1">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search doctors, specialties..."
                        className="w-full h-12 pl-12 bg-transparent border-0 focus:ring-0"
                        value={filters.query}
                        onChange={(e) => handleFilterChange('query', e.target.value)}
                    />
                </div>
                <div className="relative flex-1 md:border-l md:border-gray-700">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Location"
                        className="w-full h-12 pl-12 bg-transparent border-0 focus:ring-0"
                        value={filters.city}
                        onChange={(e) => handleFilterChange('city', e.target.value)}
                    />
                </div>
                <Button onClick={applyFilters} className="h-12 text-base font-bold btn-primary transition-all duration-300 rounded-lg shadow-lg px-8">
                    Search Doctors
                </Button>
            </div>
        </div>

        <div className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-teal-400">Home</Link> &gt; 
          <span> Search</span>
          {filters.city && <> &gt; <span className="text-white">{filters.city}</span></>}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4 lg:sticky lg:top-24 self-start w-full">
            <div className="bg-[#1c2434] border border-gray-700/50 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-teal-400 hover:text-teal-300 text-sm">Clear All</Button>
              </div>
              
              <div className="space-y-6">
                <div>
                    <label className="text-gray-300 font-semibold mb-2 block text-sm">Specialty</label>
                    <Select value={filters.speciality} onValueChange={(v) => handleFilterChange('speciality', v)}>
                      <SelectTrigger className="bg-[#0b1220] border-gray-700 h-12"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-[#1c2434] border-gray-700 text-white">
                        <SelectItem value="ALL">All Specialties</SelectItem>
                        {specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-gray-300 font-semibold mb-2 block text-sm">Sort By</label>
                    <Select value={filters.sortBy} onValueChange={(v) => handleFilterChange('sortBy', v)}>
                      <SelectTrigger className="bg-[#0b1220] border-gray-700 h-12"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-[#1c2434] border-gray-700 text-white">
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="fee">Fee: Low to High</SelectItem>
                        <SelectItem value="experience">Experience: High to Low</SelectItem>
                        <SelectItem value="ratings">Ratings</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2"><SlidersHorizontal className="w-4 h-4"/> Advanced Filters</h4>
                    <div className="space-y-6 pl-2 border-l-2 border-gray-700/50 ml-2">
                        <div>
                            <label className="text-gray-300 font-semibold mb-2 block text-sm">Gender</label>
                            <div className="flex gap-2">
                              {['any', 'male', 'female'].map(gender => (
                                <Button key={gender} onClick={() => handleFilterChange('gender', gender)} variant={filters.gender === gender ? 'default' : 'outline'} className={`capitalize flex-1 h-10 text-sm ${filters.gender === gender ? 'bg-teal-600 border-teal-600 text-white' : 'border-gray-600 bg-transparent hover:bg-gray-700/50 hover:text-white'}`}>{gender}</Button>
                              ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-gray-300 font-semibold mb-2 block text-sm">Price Range</label>
                            <Slider 
                              min={0} max={5000} step={100} 
                              value={filters.priceRange} 
                              onValueChange={(v) => handleFilterChange('priceRange', v)}
                              className="[&>span:first-child]:h-1 [&>span:first-child>span]:bg-teal-500 [&>a]:bg-white [&>a]:border-teal-500"
                            />
                            <div className="flex justify-between text-sm text-gray-400 mt-2">
                              <span>₹{filters.priceRange[0]}</span>
                              <span>₹{filters.priceRange[1]}</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-gray-300 font-semibold mb-2 block text-sm">Availability</label>
                            <div className="space-y-2">
                              {['today', 'tomorrow', 'weekends'].map(avail => (
                                <div key={avail} className="flex items-center">
                                  <Checkbox id={`avail-${avail}`} checked={filters.availability.includes(avail)} onCheckedChange={() => handleMultiCheckboxChange('availability', avail)} className="border-gray-500 data-[state=checked]:bg-teal-600" />
                                  <label htmlFor={`avail-${avail}`} className="ml-2 capitalize text-sm font-medium text-gray-300">{avail}</label>
                                </div>
                              ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-gray-300 font-semibold mb-2 block text-sm">Mode of Consultation</label>
                            <div className="space-y-2">
                              {['in-clinic', 'teleconsultation'].map(mode => (
                                <div key={mode} className="flex items-center">
                                  <Checkbox id={`mode-${mode}`} checked={filters.mode.includes(mode)} onCheckedChange={() => handleMultiCheckboxChange('mode', mode)} className="border-gray-500 data-[state=checked]:bg-teal-600" />
                                  <label htmlFor={`mode-${mode}`} className="ml-2 capitalize text-sm font-medium text-gray-300">{mode}</label>
                                </div>
                              ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Button onClick={applyFilters} className="w-full mt-4 h-12 text-lg font-bold btn-primary transition-all duration-300 rounded-lg shadow-lg">Apply Filters</Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 w-full">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-white">{doctors.length} Doctors found</h2>
                <p className="text-gray-400">All specialities in {filters.city || 'your area'}</p>
            </div>

            {isLoading ? (
              <SearchSkeleton />
            ) : doctors.length === 0 ? (
              <div className="text-center py-20 bg-[#1c2434] rounded-2xl">
                <h2 className="text-2xl font-bold mb-2 text-white">No doctors found</h2>
                <p className="text-gray-400">Try adjusting your search filters.</p>
              </div>
            ) : (
              <motion.div layout className="space-y-6">
                <AnimatePresence>
                  {doctors.map((d) => (
                    <DoctorCard key={d.id} doctor={d} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </main>
        </div>
      </main>

      {showBackToTop && (
        <Button onClick={scrollToTop} className="fixed bottom-8 right-8 rounded-full w-14 h-14 shadow-lg z-30 btn-primary">
          <ArrowUp className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}