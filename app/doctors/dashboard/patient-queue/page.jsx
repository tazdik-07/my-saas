"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Clock, 
  Play, 
  SkipForward, 
  CheckCircle, 
  AlertCircle,
  Filter,
  Search,
  Plus,
  UserPlus
} from "lucide-react";
import { PatientQueue } from "../components/PatientQueue";

export default function PatientQueuePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      reason: "Regular Checkup",
      waitTime: "12 min",
      priority: "normal",
      avatar: "RK",
      arrivalTime: "9:15 AM",
      phone: "+91 98765 43210",
      age: 45
    },
    {
      id: 2,
      name: "Priya Sharma",
      reason: "Follow-up Visit",
      waitTime: "8 min",
      priority: "high",
      avatar: "PS",
      arrivalTime: "9:30 AM",
      phone: "+91 98765 43211",
      age: 32
    },
    {
      id: 3,
      name: "Amit Patel",
      reason: "Blood Pressure Check",
      waitTime: "5 min",
      priority: "normal",
      avatar: "AP",
      arrivalTime: "9:45 AM",
      phone: "+91 98765 43212",
      age: 58
    },
    {
      id: 4,
      name: "Sneha Reddy",
      reason: "Consultation",
      waitTime: "15 min",
      priority: "urgent",
      avatar: "SR",
      arrivalTime: "9:00 AM",
      phone: "+91 98765 43213",
      age: 28
    },
    {
      id: 5,
      name: "Vikram Singh",
      reason: "Diabetes Follow-up",
      waitTime: "3 min",
      priority: "high",
      avatar: "VS",
      arrivalTime: "10:00 AM",
      phone: "+91 98765 43214",
      age: 52
    },
    {
      id: 6,
      name: "Meera Gupta",
      reason: "Routine Check",
      waitTime: "20 min",
      priority: "normal",
      avatar: "MG",
      arrivalTime: "8:45 AM",
      phone: "+91 98765 43215",
      age: 37
    }
  ]);

  const handleAction = (patientId, action) => {
    if (action === 'start') {
      setPatients(patients.filter(p => p.id !== patientId));
    } else if (action === 'skip') {
      const patient = patients.find(p => p.id === patientId);
      const otherPatients = patients.filter(p => p.id !== patientId);
      setPatients([...otherPatients, patient]);
    } else if (action === 'done') {
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

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || patient.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const priorityStats = {
    urgent: patients.filter(p => p.priority === 'urgent').length,
    high: patients.filter(p => p.priority === 'high').length,
    normal: patients.filter(p => p.priority === 'normal').length,
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <Users className="w-8 h-8 mr-3 text-emerald-400" />
              Patient Queue Management
            </h1>
            <p className="text-gray-400">
              Manage and prioritize your patient queue efficiently
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center">
            <UserPlus className="w-5 h-5 mr-2" />
            Add Walk-in
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients by name or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0A0F1C] border border-gray-800/50 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-[#0A0F1C] border border-gray-800/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
          </select>
        </div>
      </motion.div>

      {/* Priority Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Waiting</p>
              <p className="text-3xl font-bold text-white">{patients.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Urgent</p>
              <p className="text-3xl font-bold text-red-400">{priorityStats.urgent}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">High Priority</p>
              <p className="text-3xl font-bold text-amber-400">{priorityStats.high}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Normal</p>
              <p className="text-3xl font-bold text-emerald-400">{priorityStats.normal}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detailed Patient Queue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-[#0A0F1C] rounded-2xl border border-gray-800/50 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Detailed Queue View</h3>
          <div className="flex items-center text-sm text-gray-400">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
            Live Updates
          </div>
        </div>

        <div className="space-y-4">
          {filteredPatients.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No patients match your criteria</p>
            </div>
          ) : (
            filteredPatients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-900/50 rounded-xl border border-gray-800/30 p-6 hover:bg-gray-900/70 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    {/* Queue Position */}
                    <div className="text-center mr-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center text-black font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Position</div>
                    </div>

                    {/* Patient Avatar */}
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center text-black font-bold text-lg mr-6">
                      {patient.avatar}
                    </div>

                    {/* Patient Details */}
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-semibold text-white text-lg mr-3">{patient.name}</h4>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium border flex items-center ${getPriorityColor(patient.priority)}`}>
                          {getPriorityIcon(patient.priority)}
                          <span className="ml-1 capitalize">{patient.priority}</span>
                        </span>
                      </div>
                      
                      <p className="text-gray-300 mb-2">{patient.reason}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Wait: {patient.waitTime}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Arrived: {patient.arrivalTime}
                        </div>
                        <div>Age: {patient.age}</div>
                        <div>{patient.phone}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 ml-6">
                    <button
                      onClick={() => handleAction(patient.id, 'start')}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center"
                      title="Start consultation"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </button>
                    <button
                      onClick={() => handleAction(patient.id, 'skip')}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors flex items-center"
                      title="Skip for now"
                    >
                      <SkipForward className="w-4 h-4 mr-2" />
                      Skip
                    </button>
                    <button
                      onClick={() => handleAction(patient.id, 'done')}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center"
                      title="Mark as done"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Done
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
