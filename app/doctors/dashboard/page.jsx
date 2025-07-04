"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import {
  Bell,
  Calendar,
  DollarSign,
  Home,
  Menu,
  MessageSquare,
  PieChart,
  Plus,
  Settings,
  Users,
  X,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  FileText,
  FlaskConical,
  Mail,
  LineChart,
  User,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';

export default function DoctorDashboard() {
  const { data: session, status } = useSession();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recentReviews, setRecentReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchReviews = async () => {
      setIsLoadingReviews(true);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      setRecentReviews([
        {
          patientName: 'Alice Wonderland',
          rating: 5,
          comment: 'Dr. White was incredibly thorough and empathetic. Highly recommend!',
          date: '2025-07-01',
        },
        {
          patientName: 'Bob The Builder',
          rating: 4,
          comment: 'Good experience overall. Wait time was a bit long, but the consultation was helpful.',
          date: '2025-06-28',
        },
        {
          patientName: 'Charlie Chaplin',
          rating: 5,
          comment: 'Excellent doctor! Very knowledgeable and made me feel at ease.',
          date: '2025-06-25',
        },
        {
          patientName: 'Diana Ross',
          rating: 3,
          comment: 'The diagnosis was accurate, but I felt a bit rushed during the appointment.',
          date: '2025-06-20',
        },
        {
          patientName: 'Eve Harrington',
          rating: 5,
          comment: 'Professional and caring. All my questions were answered clearly.',
          date: '2025-06-18',
        },
      ]);
      setIsLoadingReviews(false);
    };

    fetchReviews();
  }, []);

  const kpiData = [
    {
      title: 'Patients Waiting',
      value: 12,
      icon: Users,
      change: 5,
      changeType: 'increase',
      bgColor: 'from-blue-700 to-blue-800'
    },
    {
      title: 'Appointments Today',
      value: 25,
      icon: Calendar,
      change: 2,
      changeType: 'increase',
      bgColor: 'from-green-700 to-green-800'
    },
    {
      title: 'Cancellations',
      value: 3,
      icon: AlertTriangle,
      change: 1,
      changeType: 'increase',
      bgColor: 'from-red-700 to-red-800'
    },
    {
      title: 'Earnings Today',
      value: '$1,200',
      icon: DollarSign,
      change: 150,
      changeType: 'increase',
      bgColor: 'from-purple-700 to-purple-800'
    },
  ];

  const navItems = [
    { name: 'Dashboard', icon: Home, href: '/doctors/dashboard', active: true },
    { name: 'Profile', icon: Users, href: '/doctors/profile' },
    { name: 'Appointments', icon: Calendar, href: '/doctors/appointments' },
    { name: 'Availability', icon: Clock, href: '/doctors/availability' },
    { name: 'Earnings', icon: DollarSign, href: '/doctors/earnings' },
    { name: 'Reviews', icon: MessageSquare, href: '/doctors/reviews' },
  ];

  const nextPatient = {
    name: 'John Doe',
    initials: 'JD',
    age: 35,
    id: 'P12345',
    reason: 'Follow-up on medication',
    visitType: 'Virtual',
    waitTime: '15 min',
    avatarSrc: '/public/img/doctor-placeholder.png' // Using doctor placeholder for now
  };

  const quickTasks = [
    { id: 'prescriptions', label: 'Unsigned Prescriptions', count: 3, icon: FileText },
    { id: 'lab_reviews', label: 'Lab Reviews', count: 5, icon: FlaskConical },
    { id: 'messages', label: 'Unread Messages', count: 2, icon: Mail },
  ];

  const appointmentsToday = [
    { time: '08:00 AM', patient: 'Alice Smith', status: 'completed', type: 'In-person' },
    { time: '09:00 AM', patient: 'Bob Johnson', status: 'upcoming', type: 'Virtual' },
    { time: '10:00 AM', patient: 'Charlie Brown', status: 'cancelled', type: 'In-person' },
    { time: '11:00 AM', patient: 'Diana Prince', status: 'upcoming', type: 'Virtual' },
    { time: '12:00 PM', patient: 'Eve Adams', status: 'completed', type: 'In-person' },
    { time: '01:00 PM', patient: 'Frank White', status: 'upcoming', type: 'Virtual' },
    { time: '02:00 PM', patient: 'Grace Lee', status: 'upcoming', type: 'In-person' },
    { time: '03:00 PM', patient: 'Harry Potter', status: 'upcoming', type: 'Virtual' },
    { time: '04:00 PM', patient: 'Ivy Green', status: 'upcoming', type: 'In-person' },
    { time: '05:00 PM', patient: 'Jack Black', status: 'upcoming', type: 'Virtual' },
  ].sort((a, b) => {
    const timeA = new Date(`2000/01/01 ${a.time}`);
    const timeB = new Date(`2000/01/01 ${b.time}`);
    return timeB - timeA;
  });

  const [performanceMetric, setPerformanceMetric] = useState('revenue');

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-900/20';
      case 'upcoming': return 'bg-blue-900/20';
      case 'cancelled': return 'bg-red-900/20';
      default: return 'bg-gray-900/20';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-gray-800 text-gray-100 border-r border-gray-700">
            <div className="p-4 flex flex-col h-full">
              <div className="text-2xl font-bold text-blue-400 mb-8">DocConnect</div>
              <nav className="flex-grow">
                <ul>
                  {navItems.map((item) => (
                    <li key={item.name} className="mb-2">
                      <a
                        href={item.href}
                        className={`flex items-center p-3 rounded-lg transition-colors duration-200
                          ${item.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto pt-4 border-t border-gray-700">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
                  <Bell className="h-5 w-5 mr-3" />
                  Notifications
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Fixed Left Sidebar for Desktop */}
      <aside className={`hidden md:flex flex-col ${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-gray-800 text-gray-100 border-r border-gray-700 p-4 transition-all duration-300`}>
        <div className="flex items-center justify-between mb-8">
          <div className={`text-2xl font-bold text-blue-400 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>DocConnect</div>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="text-gray-300 hover:bg-gray-700">
            {isSidebarCollapsed ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
          </Button>
        </div>
        <nav className="flex-grow">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <a
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors duration-200
                    ${item.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-700">
          <Button variant="ghost" className={`w-full justify-start text-gray-300 hover:bg-gray-700 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <Bell className="h-5 w-5 mr-3" />
            <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>Notifications</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col p-4 md:p-8 overflow-auto ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} transition-all duration-300`}>
        {/* Top Header Bar */}
        <header className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg mb-8 border border-gray-600">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10 border-2 border-blue-400">
              <AvatarImage src="/public/img/doctor-placeholder.png" alt="Dr. Avatar" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold text-gray-50">{status === 'loading' ? 'Loading...' : `Dr. ${session?.user?.name || 'Doctor'}`}</h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm text-gray-400 hover:text-gray-50 p-0 h-auto">
                    Clinic A <span className="ml-1">&#9660;</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-700 border border-gray-600 text-gray-100">
                  <DropdownMenuItem className="hover:bg-gray-600 cursor-pointer">Clinic A</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-600 cursor-pointer">Clinic B</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-600 cursor-pointer">Clinic C</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-gray-50">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-800"></span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              New Appointment
            </Button>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi) => (
            <Card key={kpi.title} className={`p-6 rounded-xl shadow-lg bg-gradient-to-br ${kpi.bgColor} text-white border border-gray-600 hover:shadow-xl transition-all duration-300`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium opacity-90">{kpi.title}</h3>
                <kpi.icon className="h-8 w-8 opacity-70" />
              </div>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-bold">{kpi.value}</span>
                <div className={`flex items-center text-sm font-semibold ${kpi.changeType === 'increase' ? 'text-green-200' : 'text-red-200'}`}>
                  {kpi.changeType === 'increase' ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                  {kpi.change}
                </div>
              </div>
            </Card>
          ))}
        </section>

        {/* Two-column grid: Next Patient/Quick Tasks & Appointments Timeline/Sparkline */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
          {/* Left Column: Next Patient & Quick Tasks */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Next Patient Card */}
            <Card className="p-6 rounded-xl shadow-lg bg-gray-800 text-gray-100 border border-gray-600">
              <h2 className="text-2xl font-semibold text-gray-50 mb-4">Next Patient</h2>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-16 w-16 border-2 border-blue-400">
                  <AvatarImage src={nextPatient.avatarSrc} alt={nextPatient.name} />
                  <AvatarFallback className="text-xl font-bold">{nextPatient.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-gray-50">{nextPatient.name}</h3>
                  <p className="text-gray-400 text-sm">ID: {nextPatient.id} | Age: {nextPatient.age}</p>
                  <p className="text-gray-400">{nextPatient.reason}</p>
                  <div className="flex items-center mt-1">
                    <span className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2">{nextPatient.visitType}</span>
                    <span className="bg-yellow-500 text-gray-900 text-xs font-semibold px-2.5 py-0.5 rounded-full">Wait: {nextPatient.waitTime}</span>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Start Consultation
              </Button>
            </Card>

            {/* Quick Tasks Checklist */}
            <Card className="p-6 rounded-xl shadow-lg bg-gray-800 text-gray-100 flex-grow border border-gray-600">
              <h2 className="text-2xl font-semibold text-gray-50 mb-4">Quick Tasks</h2>
              {quickTasks.length > 0 ? (
                <div className="space-y-4">
                  {quickTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <Checkbox id={task.id} className="mr-3 border-gray-500 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                        <task.icon className="h-5 w-5 mr-2 text-indigo-400" />
                        <label htmlFor={task.id} className="text-lg font-medium text-gray-50 cursor-pointer">
                          {task.label}
                        </label>
                      </div>
                      <span className="text-blue-400 font-semibold">{task.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                  <p className="text-lg">All caught up! No quick tasks for today.</p>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column: Appointments Timeline & Mini Analytics */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Appointments Timeline */}
            <Card className="p-6 rounded-xl shadow-lg bg-gray-800 text-gray-100 flex-grow border border-gray-600">
              <h2 className="text-2xl font-semibold text-gray-50 mb-4">Appointments Timeline</h2>
              <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {/* Custom Scrollbar Style */}
                <style jsx>{`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: #374151; /* gray-700 */
                    border-radius: 10px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #4b5563; /* gray-600 */
                    border-radius: 10px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #6b7280; /* gray-500 */
                  }
                `}</style>
                <div className="relative border-l-2 border-gray-700 pl-4">
                  {appointmentsToday.map((appt, index) => (
                    <div key={index} className={`mb-6 last:mb-0 relative p-3 rounded-lg ${getStatusColor(appt.status)}`}>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-lg font-medium text-gray-50">{appt.patient}</h3>
                        <span className="font-bold text-indigo-400">{appointmentsToday.length - index}.</span>
                      </div>
                      <p className="text-sm text-gray-400">{appt.type} - <span className={`font-semibold ${appt.status === 'completed' ? 'text-green-400' : appt.status === 'upcoming' ? 'text-blue-400' : 'text-red-400'}`}>{appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}</span></p>
                      {/* Drag to reschedule, double click to create - conceptual */}
                      {index === 0 && <p className="text-xs text-gray-500 mt-1">Drag to reschedule, double-click empty slot to create</p>}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Mini Analytics Card (Sparkline) */}
            <Card className="p-6 rounded-xl shadow-lg bg-gray-800 text-gray-100 border border-gray-600">
              <h2 className="text-2xl font-semibold text-gray-50 mb-4">7-Day Performance</h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">7-Day Performance</span>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`px-4 py-2 rounded-full text-sm font-medium ${performanceMetric === 'revenue' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    onClick={() => setPerformanceMetric('revenue')}
                  >
                    Revenue
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`px-4 py-2 rounded-full text-sm font-medium ${performanceMetric === 'volume' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    onClick={() => setPerformanceMetric('volume')}
                  >
                    Volume
                  </Button>
                </div>
              </div>
              <div className="h-32 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                <LineChart className="h-16 w-16 text-gray-500" />
                Sparkline Chart Placeholder
              </div>
            </Card>
          </div>
        </section>

        {/* Full-width Recent Reviews Section */}
        <section className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-600">
          <h2 className="text-2xl font-semibold text-gray-50 mb-4">Recent Reviews</h2>
          {isLoadingReviews ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="p-4 rounded-xl bg-gray-700 animate-pulse">
                  <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-600 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-600 rounded w-5/6"></div>
                </Card>
              ))}
            </div>
          ) : (
            recentReviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {recentReviews.map((review, index) => (
                  <Card key={index} className="p-4 rounded-xl bg-gray-700 text-gray-100 border border-indigo-700">
                    <div className="flex items-center mb-2">
                      <User className="h-5 w-5 text-indigo-400 mr-2" />
                      <h3 className="font-semibold text-lg">{review.patientName}</h3>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
                        />
                      ))}
                      <span className="text-sm text-gray-400 ml-2">({review.rating}.0)</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2 line-clamp-3">{review.comment}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                <p className="text-lg">No recent reviews. Keep up the great work!</p>
              </div>
            )
          )}
        </section>
      </main>
    </div>
  );
}
