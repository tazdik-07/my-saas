"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { LoaderCircle, Stethoscope, Building2, Award, MapPin, IndianRupee } from "lucide-react";
import Navbar from "@/app/components/Navbar";

export default function BookingPage() {
  const { id: doctorId } = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const fullName = doctor ? `${doctor.firstName} ${doctor.lastName}` : "";



  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`/api/doctors/${doctorId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch doctor");
        }
        const data = await res.json();
        setDoctor(data.doctor);
        setAvailability(data.availability || {});
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleBooking = async () => {
    setBooking(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId,
          date: selectedDate.toISOString(),
          time: selectedTime,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create booking");
      }

      alert("Booking successful!");
      router.push("/profile");
    } catch (error) {
      console.error(error);
      alert("Booking failed. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  const availableTimes = selectedDate
    ? availability[format(selectedDate, "EEEE")] || []
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!doctor) {
    return <div className="text-center py-20">Doctor not found.</div>;
  }

  return (
    <div className="relative bg-gradient-to-br from-[#0B1220] via-[#0F1629] to-[#0B1220] min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-16 pb-10">
        <h1 className="text-3xl font-bold mb-8 mt-5 ml-5">Book Appointment with <span className="gradient-text">{fullName}</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="bg-[#1E2741] border border-gray-700 rounded-lg shadow-xl p-6 ml-5">
            <div className="flex items-center mb-4">
              <img
                src={doctor.profilePhoto || "/img/doctor-placeholder.png"}
                alt={doctor.name}
                className="w-16 h-16 rounded-lg object-cover mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-white">{fullName}</h3>
                <p className="text-sm text-gray-400">{doctor.specialty}</p>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">Doctor Details</h3>
            <div className="space-y-2">
              
              {doctor.clinicName && (
                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> {doctor.clinicName}
                </p>
              )}
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <Award className="w-4 h-4" /> {doctor.yearsOfExperience} yrs experience
              </p>
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {doctor.city}
              </p>
              <p className="text-sm text-green-400 flex items-center gap-2">
                <IndianRupee className="w-4 h-4" /> {doctor.consultationFee}
              </p>
            </div>
          </div>
          {/* calendar + slots wrapper */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* calendar */}
            <div className="flex-none inline-block w-fit bg-white/5 border border-gray-600 rounded-xl text-white p-4">
              <h3 className="text-xl font-semibold mb-4 gradient-text">Select Date</h3>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
              />
            </div>

            {/* time slots */}
            <div className="flex-none w-fit">
              <h3 className="text-xl font-semibold mb-4 gradient-text">Select Time</h3>

              <div className="grid grid-cols-3 gap-4 w-fit">
                {availableTimes.length > 0 ? (
                  availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-4 rounded-lg text-center ${selectedTime === time
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-700 text-white'
                        }`}
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-400">No available slots for this date.</p>
                )}
              </div>
            </div>
          </div>

        </div>
        <div className="mt-8 text-center">
          <button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime || booking}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg disabled:bg-gray-400"
          >
            {booking ? (
              <LoaderCircle className="animate-spin w-6 h-6" />
            ) : (
              "Confirm Booking"
            )}
          </button>
        </div>
      </div>
      {/* Background decoration (outside container) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3E8BFF]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#4DAAFB]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}