'use client';

import { motion } from 'motion/react';
import { 
  UserPlus, 
  Calendar, 
  Star, 
  AlertCircle, 
  CheckCircle,
  Clock,
  MessageCircle,
  IndianRupee,
  Video,
  FileText
} from 'lucide-react';

export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: "new_patient",
      title: "New Patient Registration",
      description: "Sarah Connor registered as a new patient",
      time: "2 minutes ago",
      icon: UserPlus,
      color: "from-emerald-500 to-green-500"
    },
    {
      id: 2,
      type: "appointment_change",
      title: "Appointment Rescheduled",
      description: "John Doe moved his appointment from 2 PM to 4 PM",
      time: "15 minutes ago",
      icon: Calendar,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      type: "new_review",
      title: "New 5-Star Review",
      description: "Priya Sharma left an excellent review",
      time: "1 hour ago",
      icon: Star,
      color: "from-amber-500 to-orange-500"
    },
    {
      id: 4,
      type: "payment_received",
      title: "Payment Received",
      description: "₹2,500 consultation fee from Amit Patel",
      time: "2 hours ago",
      icon: IndianRupee,
      color: "from-violet-500 to-purple-500"
    },
    {
      id: 5,
      type: "video_call",
      title: "Video Consultation Completed",
      description: "Completed 30-min video call with Rajesh Kumar",
      time: "3 hours ago",
      icon: Video,
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 6,
      type: "emergency",
      title: "Emergency Appointment",
      description: "Urgent consultation scheduled for 6 PM",
      time: "4 hours ago",
      icon: AlertCircle,
      color: "from-red-500 to-pink-500"
    },
    {
      id: 7,
      type: "prescription",
      title: "Prescription Sent",
      description: "Digital prescription sent to Sneha Reddy",
      time: "5 hours ago",
      icon: FileText,
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: 8,
      type: "consultation_completed",
      title: "Consultation Completed",
      description: "Follow-up with Vikram Singh completed successfully",
      time: "6 hours ago",
      icon: CheckCircle,
      color: "from-emerald-500 to-green-500"
    }
  ];

  const getActivityTypeColor = (type) => {
    switch (type) {
      case 'new_patient': return 'text-emerald-400';
      case 'appointment_change': return 'text-blue-400';
      case 'new_review': return 'text-amber-400';
      case 'payment_received': return 'text-violet-400';
      case 'video_call': return 'text-pink-400';
      case 'emergency': return 'text-red-400';
      case 'prescription': return 'text-teal-400';
      case 'consultation_completed': return 'text-emerald-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Clock className="w-6 h-6 mr-3 text-emerald-400" />
          Recent Activity
        </h3>
        
        <button className="text-sm text-gray-400 hover:text-white transition-colors">
          View All
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-900/30 transition-colors group"
          >
            {/* Icon */}
            <div className={`p-2 rounded-lg bg-gradient-to-r ${activity.color} flex-shrink-0`}>
              <activity.icon className="w-4 h-4 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-white text-sm truncate group-hover:text-emerald-400 transition-colors">
                  {activity.title}
                </h4>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                  {activity.time}
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {activity.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Summary */}
      <div className="mt-6 pt-4 border-t border-gray-800/50">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-emerald-400">
              {activities.filter(a => a.type === 'new_patient').length}
            </div>
            <div className="text-xs text-gray-400">New Patients</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-400">
              {activities.filter(a => a.type === 'appointment_change').length}
            </div>
            <div className="text-xs text-gray-400">Reschedules</div>
          </div>
          <div>
            <div className="text-lg font-bold text-amber-400">
              {activities.filter(a => a.type === 'new_review').length}
            </div>
            <div className="text-xs text-gray-400">New Reviews</div>
          </div>
          <div>
            <div className="text-lg font-bold text-violet-400">
              {activities.filter(a => a.type === 'payment_received').length}
            </div>
            <div className="text-xs text-gray-400">Payments</div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.8);
        }
      `}</style>
    </div>
  );
}
