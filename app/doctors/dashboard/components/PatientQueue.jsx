'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Play, SkipForward, CheckCircle, User, AlertCircle } from 'lucide-react';

export function PatientQueue() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      reason: "Regular Checkup",
      waitTime: "12 min",
      priority: "normal",
      avatar: "RK"
    },
    {
      id: 2,
      name: "Priya Sharma",
      reason: "Follow-up Visit",
      waitTime: "8 min",
      priority: "high",
      avatar: "PS"
    },
    {
      id: 3,
      name: "Amit Patel",
      reason: "Blood Pressure Check",
      waitTime: "5 min",
      priority: "normal",
      avatar: "AP"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      reason: "Consultation",
      waitTime: "15 min",
      priority: "urgent",
      avatar: "SR"
    }
  ]);

  const handleAction = (patientId, action) => {
    if (action === 'start') {
      // Move to consultation
      setPatients(patients.filter(p => p.id !== patientId));
    } else if (action === 'skip') {
      // Move to end of queue
      const patient = patients.find(p => p.id === patientId);
      const otherPatients = patients.filter(p => p.id !== patientId);
      setPatients([...otherPatients, patient]);
    } else if (action === 'done') {
      // Remove from queue
      setPatients(patients.filter(p => p.id !== patientId));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'high': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default: return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'urgent') return <AlertCircle className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  return (
    <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <User className="w-6 h-6 mr-3 text-emerald-400" />
          Live Patient Queue
        </h3>
        <div className="flex items-center text-sm text-gray-400">
          <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
          {patients.length} waiting
        </div>
      </div>

      <div className="space-y-4">
        {patients.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No patients in queue</p>
          </div>
        ) : (
          patients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-900/50 rounded-xl border border-gray-800/30 p-4 hover:bg-gray-900/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center text-black font-bold mr-4">
                    {patient.avatar}
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h4 className="font-semibold text-white mr-3">{patient.name}</h4>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium border flex items-center ${getPriorityColor(patient.priority)}`}>
                        {getPriorityIcon(patient.priority)}
                        <span className="ml-1 capitalize">{patient.priority}</span>
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{patient.reason}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      Waiting: {patient.waitTime}
                    </div>
                  </div>

                  {/* Queue Position */}
                  <div className="text-right mr-4">
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-sm font-bold text-gray-300">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAction(patient.id, 'start')}
                    className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                    title="Start consultation"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction(patient.id, 'skip')}
                    className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
                    title="Skip for now"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction(patient.id, 'done')}
                    className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    title="Mark as done"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-800/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Quick Actions:</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
              Add Walk-in
            </button>
            <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
              Emergency
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
