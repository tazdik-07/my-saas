"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Bell, Home, Menu, Plus, X, Users, Calendar, Clock, DollarSign, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, parseISO } from "date-fns";
import { Loader2 } from "lucide-react";

export default function DoctorAppointmentsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isSidebarCollapsed") === "true";
    }
    return false;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: session, status } = useSession();

  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isSidebarCollapsed", isSidebarCollapsed.toString());
    }
  }, [isSidebarCollapsed]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/doctors/appointments");
        if (!res.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        setAppointmentsError(err.message);
      } finally {
        setLoadingAppointments(false);
      }
    };
    fetchAppointments();
  }, []);

  const navItems = [
    { name: "Dashboard", icon: Home, href: "/doctors/dashboard", active: false },
    { name: "Profile", icon: Users, href: "/doctors/profile" },
    { name: "Appointments", icon: Calendar, href: "/doctors/appointments", active: true },
    { name: "Availability", icon: Clock, href: "/doctors/availability" },
    { name: "Earnings", icon: DollarSign, href: "/doctors/earnings" },
    { name: "Reviews", icon: MessageSquare, href: "/doctors/reviews" },
  ];

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
                        className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                          item.active ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300"
                        }`}
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
      <aside
        className={`hidden md:flex flex-col ${isSidebarCollapsed ? "w-20" : "w-64"} bg-gray-800 text-gray-100 border-r border-gray-700 p-4 transition-all duration-300`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className={`text-2xl font-bold text-blue-400 ${isSidebarCollapsed ? "hidden" : "block"}`}>DocConnect</div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-gray-300 hover:bg-gray-700"
          >
            {isSidebarCollapsed ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
          </Button>
        </div>
        <nav className="flex-grow">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <a
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    item.active ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300"
                  } ${isSidebarCollapsed ? "justify-center" : "justify-start"}`}
                >
                  <item.icon className={`h-5 w-5 ${!isSidebarCollapsed ? "mr-3" : ""}`} />
                  <span className={`${isSidebarCollapsed ? "hidden" : "block"}`}>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-700">
          <Button
            variant="ghost"
            className={`w-full justify-start text-gray-300 hover:bg-gray-700 ${isSidebarCollapsed ? "justify-center" : ""}`}
          >
            <Bell className="h-5 w-5 mr-3" />
            <span className={`${isSidebarCollapsed ? "hidden" : "block"}`}>Notifications</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-auto transition-all duration-300">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg mb-8 border border-gray-600">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10 border-2 border-blue-400">
              <AvatarImage src="/img/doctor-placeholder.png" alt="Dr. Avatar" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl heading text-gray-50">
                {status === "loading" ? "Loading..." : `Dr. ${session?.user?.name || "Doctor"}`}
              </h1>
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
            <Button className="bg-blue-600 hover:bg-blue-700 text-white heading py-2 px-4 rounded-lg flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              New Appointment
            </Button>
          </div>
        </header>
        <h1 className="text-3xl font-bold text-gray-50 mb-8">Appointments</h1>
        <Card className="p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="text-2xl heading heading text-gray-50 mb-4">All Appointments</h2>
          {loadingAppointments ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="ml-2 text-gray-400">Loading appointments...</p>
            </div>
          ) : appointmentsError ? (
            <div className="text-red-500 text-center p-4">
              Error: {appointmentsError}. Please try again.
            </div>
          ) : appointments.length === 0 ? (
            <p className="text-gray-400">No appointments found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-700 hover:bg-gray-700">
                    <TableHead className="text-gray-300">Date</TableHead>
                    <TableHead className="text-gray-300">Time</TableHead>
                    <TableHead className="text-gray-300">Patient</TableHead>
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">Phone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appt) => (
                    <TableRow key={appt.id} className="border-gray-700 hover:bg-gray-700">
                      <TableCell className="font-medium">{format(parseISO(appt.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{appt.time}</TableCell>
                      <TableCell>{appt.user.firstName} {appt.user.lastName}</TableCell>
                      <TableCell>{appt.user.email}</TableCell>
                      <TableCell>{appt.user.phoneNumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
