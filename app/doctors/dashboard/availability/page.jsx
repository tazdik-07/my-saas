"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { 
  Clock, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Check,
  AlertCircle,
  Users,
  MapPin
} from "lucide-react";

export default function AvailabilityPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddSlot, setShowAddSlot] = useState(false);
  
  const [weeklySchedule, setWeeklySchedule] = useState({
    monday: {
      enabled: true,
      slots: [
        { id: 1, start: "09:00", end: "12:00", type: "consultation", maxPatients: 8 },
        { id: 2, start: "14:00", end: "17:00", type: "consultation", maxPatients: 6 }
      ]
    },
    tuesday: {
      enabled: true,
      slots: [
        { id: 3, start: "09:00", end: "12:00", type: "consultation", maxPatients: 8 },
        { id: 4, start: "14:00", end: "17:00", type: "consultation", maxPatients: 6 }
      ]
    },
    wednesday: {
      enabled: true,
      slots: [
        { id: 5, start: "09:00", end: "12:00", type: "consultation", maxPatients: 8 },
        { id: 6, start: "14:00", end: "16:00", type: "emergency", maxPatients: 4 }
      ]
    },
    thursday: {
      enabled: true,
      slots: [
        { id: 7, start: "09:00", end: "12:00", type: "consultation", maxPatients: 8 },
        { id: 8, start: "14:00", end: "17:00", type: "consultation", maxPatients: 6 }
      ]
    },
    friday: {
      enabled: true,
      slots: [
        { id: 9, start: "09:00", end: "12:00", type: "consultation", maxPatients: 8 },
        { id: 10, start: "14:00", end: "17:00", type: "consultation", maxPatients: 6 }
      ]
    },
    saturday: {
      enabled: true,
      slots: [
        { id: 11, start: "09:00", end: "14:00", type: "consultation", maxPatients: 10 }
      ]
    },
    sunday: {
      enabled: false,
      slots: []
    }
  });

  const [specialDates, setSpecialDates] = useState([
    {
      id: 1,
      date: "2025-01-25",
      type: "holiday",
      reason: "Republic Day",
      available: false
    },
    {
      id: 2,
      date: "2025-01-30",
      type: "extended",
      reason: "Extra clinic hours",
      available: true,
      slots: [
        { start: "18:00", end: "20:00", type: "consultation", maxPatients: 4 }
      ]
    }
  ]);

  const [newSlot, setNewSlot] = useState({
    day: 'monday',
    start: '09:00',
    end: '17:00',
    type: 'consultation',
    maxPatients: 8
  });

  const getSlotTypeColor = (type) => {
    switch (type) {
      case 'consultation': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'emergency': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'followup': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const totalWeeklyHours = Object.values(weeklySchedule)
    .filter(day => day.enabled)
    .reduce((total, day) => {
      return total + day.slots.reduce((dayTotal, slot) => {
        const start = new Date(`2000-01-01T${slot.start}`);
        const end = new Date(`2000-01-01T${slot.end}`);
        return dayTotal + (end - start) / (1000 * 60 * 60);
      }, 0);
    }, 0);

  const totalWeeklySlots = Object.values(weeklySchedule)
    .filter(day => day.enabled)
    .reduce((total, day) => total + day.slots.length, 0);

  const averagePatientsPerDay = Object.values(weeklySchedule)
    .filter(day => day.enabled)
    .reduce((total, day) => {
      return total + day.slots.reduce((dayTotal, slot) => dayTotal + slot.maxPatients, 0);
    }, 0) / Object.values(weeklySchedule).filter(day => day.enabled).length;

  const handleDayToggle = (day) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled
      }
    }));
  };

  const handleAddSlot = () => {
    const newSlotWithId = {
      ...newSlot,
      id: Date.now(),
      start: newSlot.start,
      end: newSlot.end,
      maxPatients: parseInt(newSlot.maxPatients)
    };

    setWeeklySchedule(prev => ({
      ...prev,
      [newSlot.day]: {
        ...prev[newSlot.day],
        slots: [...prev[newSlot.day].slots, newSlotWithId]
      }
    }));

    setNewSlot({
      day: 'monday',
      start: '09:00',
      end: '17:00',
      type: 'consultation',
      maxPatients: 8
    });
    setShowAddSlot(false);
  };

  const handleDeleteSlot = (day, slotId) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter(slot => slot.id !== slotId)
      }
    }));
  };

  return (
        <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <Clock className="w-8 h-8 mr-3 text-emerald-400" />
              Availability Management
            </h1>
            <p className="text-gray-400">
              Configure your consultation hours and manage your schedule
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddSlot(true)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Time Slot
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors flex items-center"
            >
              {isEditing ? <Save className="w-5 h-5 mr-2" /> : <Edit className="w-5 h-5 mr-2" />}
              {isEditing ? 'Save Changes' : 'Edit Schedule'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Weekly Hours</p>
              <p className="text-3xl font-bold text-white">{totalWeeklyHours}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Slots</p>
              <p className="text-3xl font-bold text-white">{totalWeeklySlots}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Avg Patients/Day</p>
              <p className="text-3xl font-bold text-white">{Math.round(averagePatientsPerDay)}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Active Days</p>
              <p className="text-3xl font-bold text-white">
                {Object.values(weeklySchedule).filter(day => day.enabled).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Weekly Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6 mb-8"
      >
        <h3 className="text-xl font-bold text-white mb-6">Weekly Schedule</h3>
        <div className="space-y-6">
          {Object.entries(weeklySchedule).map(([day, schedule]) => (
            <div key={day} className="border-b border-gray-800/50 last:border-b-0 pb-6 last:pb-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={schedule.enabled}
                    onChange={() => handleDayToggle(day)}
                    disabled={!isEditing}
                    className="w-5 h-5 text-emerald-500 bg-gray-800 border-gray-600 rounded focus:ring-emerald-500 mr-4"
                  />
                  <h4 className="text-lg font-semibold text-white capitalize">{day}</h4>
                </div>
                <div className="text-sm text-gray-400">
                  {schedule.enabled ? `${schedule.slots.length} slots` : 'Closed'}
                </div>
              </div>

              {schedule.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-9">
                  {schedule.slots.map((slot) => (
                    <div key={slot.id} className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/30">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getSlotTypeColor(slot.type)}`}>
                          {slot.type}
                        </span>
                        {isEditing && (
                          <button
                            onClick={() => handleDeleteSlot(day, slot.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="text-white font-medium mb-2">
                        {slot.start} - {slot.end}
                      </div>
                      <div className="text-gray-400 text-sm flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        Max {slot.maxPatients} patients
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Special Dates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Special Dates & Exceptions</h3>
        <div className="space-y-4">
          {specialDates.map((date) => (
            <div key={date.id} className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <h4 className="text-white font-medium">{date.date}</h4>
                    <p className="text-gray-400 text-sm">{date.reason}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    date.available 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {date.available ? 'Available' : 'Closed'}
                  </span>
                  {isEditing && (
                    <button className="ml-3 text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Add Slot Modal */}
      {showAddSlot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6 w-full max-w-md mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Add New Time Slot</h3>
              <button
                onClick={() => setShowAddSlot(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Day</label>
                <select
                  value={newSlot.day}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, day: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {Object.keys(weeklySchedule).map(day => (
                    <option key={day} value={day} className="capitalize">{day}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Start Time</label>
                  <input
                    type="time"
                    value={newSlot.start}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">End Time</label>
                  <input
                    type="time"
                    value={newSlot.end}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Slot Type</label>
                <select
                  value={newSlot.type}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="consultation">Consultation</option>
                  <option value="emergency">Emergency</option>
                  <option value="followup">Follow-up</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Max Patients</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newSlot.maxPatients}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, maxPatients: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddSlot(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSlot}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
              >
                Add Slot
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
