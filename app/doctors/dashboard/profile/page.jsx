"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { 
  User, 
  Edit, 
  Save, 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Award,
  Clock,
  DollarSign,
  Globe,
  Shield,
  Key,
  Bell,
  Settings,
  Eye,
  EyeOff
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+91 98765 43210",
    specialization: "Cardiologist",
    experience: "15 years",
    location: "Mumbai, Maharashtra",
    consultationFee: "2500",
    about: "Dr. Sarah Johnson is a highly experienced cardiologist with over 15 years of practice. She specializes in interventional cardiology and has performed over 2000 successful procedures. She is passionate about providing comprehensive cardiac care and patient education.",
    education: [
      { degree: "MBBS", institution: "All India Institute of Medical Sciences", year: "2008" },
      { degree: "MD Cardiology", institution: "Post Graduate Institute", year: "2012" },
      { degree: "Fellowship in Interventional Cardiology", institution: "Cleveland Clinic", year: "2014" }
    ],
    certifications: [
      "Board Certified Cardiologist",
      "Fellow of American College of Cardiology",
      "Certified in Advanced Cardiac Life Support"
    ],
    languages: ["English", "Hindi", "Marathi"],
    awards: [
      "Best Doctor Award 2023 - Mumbai Medical Association",
      "Excellence in Cardiology - Indian Medical Council 2022"
    ]
  });

  const [availability, setAvailability] = useState({
    monday: { enabled: true, start: "09:00", end: "17:00" },
    tuesday: { enabled: true, start: "09:00", end: "17:00" },
    wednesday: { enabled: true, start: "09:00", end: "17:00" },
    thursday: { enabled: true, start: "09:00", end: "17:00" },
    friday: { enabled: true, start: "09:00", end: "17:00" },
    saturday: { enabled: true, start: "09:00", end: "14:00" },
    sunday: { enabled: false, start: "09:00", end: "17:00" }
  });

  const [notifications, setNotifications] = useState({
    emailAppointments: true,
    smsReminders: true,
    pushNotifications: true,
    weeklyReports: true,
    marketingEmails: false
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Saving profile data:', profileData);
  };

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'settings', label: 'Account Settings', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

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
              <User className="w-8 h-8 mr-3 text-emerald-400" />
              Doctor Profile
            </h1>
            <p className="text-gray-400">
              Manage your professional profile and account settings
            </p>
          </div>
          {activeTab === 'profile' && (
            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
            >
              {isEditing ? <Save className="w-5 h-5 mr-2" /> : <Edit className="w-5 h-5 mr-2" />}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          )}
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex space-x-2 bg-[#0A0F1C] rounded-2xl p-2 border border-gray-800/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 flex-1 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Photo and Basic Info */}
            <div className="lg:col-span-1">
              <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-4xl">
                      SJ
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-colors">
                        <Camera className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    Dr. {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-emerald-400 mb-4">{profileData.specialization}</p>
                  <div className="flex items-center justify-center text-gray-400 mb-2">
                    <Award className="w-4 h-4 mr-2" />
                    {profileData.experience} experience
                  </div>
                  <div className="flex items-center justify-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {profileData.location}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6 mt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Practice Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Consultation Fee</span>
                    <span className="text-white font-medium">₹{profileData.consultationFee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total Patients</span>
                    <span className="text-white font-medium">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Success Rate</span>
                    <span className="text-emerald-400 font-medium">98.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Average Rating</span>
                    <span className="text-amber-400 font-medium">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Specialization</label>
                    <input
                      type="text"
                      value={profileData.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                      disabled={!isEditing}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Consultation Fee (₹)</label>
                    <input
                      type="number"
                      value={profileData.consultationFee}
                      onChange={(e) => handleInputChange('consultationFee', e.target.value)}
                      disabled={!isEditing}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">About</h3>
                <textarea
                  value={profileData.about}
                  onChange={(e) => handleInputChange('about', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 resize-none"
                  placeholder="Tell patients about your experience and approach to medicine..."
                />
              </div>

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Education</h3>
                  <div className="space-y-3">
                    {profileData.education.map((edu, index) => (
                      <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                        <h4 className="font-medium text-white">{edu.degree}</h4>
                        <p className="text-gray-400 text-sm">{edu.institution}</p>
                        <p className="text-gray-500 text-xs">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Certifications</h3>
                  <div className="space-y-2">
                    {profileData.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <Award className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'availability' && (
          <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Weekly Availability</h3>
            <div className="space-y-4">
              {Object.entries(availability).map(([day, schedule]) => (
                <div key={day} className="flex items-center justify-between py-4 border-b border-gray-800/50 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={schedule.enabled}
                      onChange={(e) => setAvailability(prev => ({
                        ...prev,
                        [day]: { ...prev[day], enabled: e.target.checked }
                      }))}
                      className="w-5 h-5 text-emerald-500 bg-gray-800 border-gray-600 rounded focus:ring-emerald-500"
                    />
                    <span className="text-white font-medium w-20 capitalize">{day}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="time"
                      value={schedule.start}
                      onChange={(e) => setAvailability(prev => ({
                        ...prev,
                        [day]: { ...prev[day], start: e.target.value }
                      }))}
                      disabled={!schedule.enabled}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                    />
                    <span className="text-gray-400">to</span>
                    <input
                      type="time"
                      value={schedule.end}
                      onChange={(e) => setAvailability(prev => ({
                        ...prev,
                        [day]: { ...prev[day], end: e.target.value }
                      }))}
                      disabled={!schedule.enabled}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-12"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-white font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {key === 'emailAppointments' && 'Receive email notifications for new appointments'}
                      {key === 'smsReminders' && 'Send SMS reminders to patients'}
                      {key === 'pushNotifications' && 'Browser push notifications'}
                      {key === 'weeklyReports' && 'Weekly performance and earnings reports'}
                      {key === 'marketingEmails' && 'Product updates and marketing emails'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setNotifications(prev => ({
                      ...prev,
                      [key]: e.target.checked
                    }))}
                    className="w-5 h-5 text-emerald-500 bg-gray-800 border-gray-600 rounded focus:ring-emerald-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
