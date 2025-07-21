'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Filter, ChevronLeft, ChevronRight, Video, MapPin } from 'lucide-react';

export function AppointmentsSection() {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [filterType, setFilterType] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date());

  const appointments = [
    {
      id: 1,
      patientName: "Rajesh Kumar",
      time: "09:00 AM",
      duration: "30 min",
      type: "Consultation",
      status: "confirmed",
      mode: "in-person",
      avatar: "RK"
    },
    {
      id: 2,
      patientName: "Priya Sharma",
      time: "10:30 AM",
      duration: "45 min",
      type: "Follow-up",
      status: "confirmed",
      mode: "video",
      avatar: "PS"
    },
    {
      id: 3,
      patientName: "Amit Patel",
      time: "11:15 AM",
      duration: "30 min",
      type: "Check-up",
      status: "pending",
      mode: "in-person",
      avatar: "AP"
    },
    {
      id: 4,
      patientName: "Sneha Reddy",
      time: "02:00 PM",
      duration: "60 min",
      type: "Consultation",
      status: "confirmed",
      mode: "in-person",
      avatar: "SR"
    },
    {
      id: 5,
      patientName: "Vikram Singh",
      time: "03:30 PM",
      duration: "30 min",
      type: "Follow-up",
      status: "rescheduled",
      mode: "video",
      avatar: "VS"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'pending': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'rescheduled': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'cancelled': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Consultation': return 'text-purple-400 bg-purple-500/10';
      case 'Follow-up': return 'text-blue-400 bg-blue-500/10';
      case 'Check-up': return 'text-emerald-400 bg-emerald-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filterType === 'all') return true;
    return apt.type.toLowerCase() === filterType.toLowerCase();
  });

  return (
    <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Calendar className="w-6 h-6 mr-3 text-emerald-400" />
          Today's Appointments
        </h3>
        
        <div className="flex items-center space-x-3">
          {/* Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Types</option>
            <option value="consultation">Consultation</option>
            <option value="follow-up">Follow-up</option>
            <option value="check-up">Check-up</option>
          </select>

          {/* View Toggle */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-emerald-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-emerald-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No appointments found</p>
          </div>
        ) : (
          filteredAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-gray-900/50 rounded-xl border border-gray-800/30 p-4 hover:bg-gray-900/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  {/* Time */}
                  <div className="text-center mr-4">
                    <div className="text-lg font-bold text-white">{appointment.time}</div>
                    <div className="text-xs text-gray-400">{appointment.duration}</div>
                  </div>

                  {/* Patient Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center text-black font-bold mr-4">
                    {appointment.avatar}
                  </div>

                  {/* Appointment Details */}
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h4 className="font-semibold text-white mr-3">{appointment.patientName}</h4>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(appointment.type)}`}>
                        {appointment.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-sm">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      
                      <div className="flex items-center text-gray-400">
                        {appointment.mode === 'video' ? (
                          <>
                            <Video className="w-3 h-3 mr-1" />
                            Video Call
                          </>
                        ) : (
                          <>
                            <MapPin className="w-3 h-3 mr-1" />
                            In-Person
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {appointment.mode === 'video' && (
                    <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                      <Video className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                    <User className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                    <Clock className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-800/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald-400">{appointments.filter(a => a.status === 'confirmed').length}</div>
            <div className="text-xs text-gray-400">Confirmed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400">{appointments.filter(a => a.status === 'pending').length}</div>
            <div className="text-xs text-gray-400">Pending</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">{appointments.filter(a => a.mode === 'video').length}</div>
            <div className="text-xs text-gray-400">Video Calls</div>
          </div>
        </div>
      </div>
    </div>
  );
}
