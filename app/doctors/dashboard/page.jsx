"use client";

import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bell,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Menu,
  X,
  LayoutDashboard,
  User,
  CalendarCheck,
  Clock3,
  Wallet,
  Star,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ProfileEditor from "./components/ProfileEditor";
import NotificationsDrawer from "./components/NotificationsDrawer";
import PatientReviews from "./components/PatientReviews";
import AvailabilityManager from "./components/AvailabilityManager";

export default function DoctorDashboard() {
  const { data: session, status } = useSession();
  const [doctorData, setDoctorData] = useState(null);
  const [loadingDoctorData, setLoadingDoctorData] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [earningsData, setEarningsData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSaveProfile = (data) => {
    console.log("Profile saved:", data);
    setShowProfileEditor(false);
  };

  const handleCancelEdit = () => {
    setShowProfileEditor(false);
  };

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
    if (status === "authenticated" && session?.user?.id) {
      const fetchDoctorData = async () => {
        try {
          // Fetch doctor's profile data
          const profileRes = await fetch(`/api/doctors/${session.user.id}`);
          const profileData = await profileRes.json();
          console.log("Fetched Doctor Profile Data:", profileData);
          setDoctorData(profileData);

          // Fetch appointments (example)
          const apptsRes = await fetch(`/api/doctors/${session.user.id}/appointments`);
          const apptsData = await apptsRes.json();
          setAppointments(Array.isArray(apptsData) ? apptsData : []);

          // Fetch earnings (example)
          const earningsRes = await fetch(`/api/doctors/${session.user.id}/earnings`);
          const earningsData = await earningsRes.json();
          setEarningsData(Array.isArray(earningsData) ? earningsData : []);

        } catch (error) {
          console.error("Failed to fetch doctor data:", error);
        } finally {
          setLoadingDoctorData(false);
        }
      };
      fetchDoctorData();
    } else if (status === "unauthenticated") {
      setLoadingDoctorData(false);
      // Optionally redirect to login page
      // router.push('/auth/doctor-signin');
    }
  }, [session, status]);

  if (status === "loading" || loadingDoctorData) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>You need to be logged in to view this page.</p>
      </div>
    );
  }

  // Ensure doctorData is available before rendering the main dashboard
  if (!doctorData) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Doctor data not found or an error occurred.</p>
      </div>
    );
  }

  const filteredAppointments = appointments.filter((appt) => {
    if (filterStatus === "All") return true;
    return appt.status === filterStatus;
  });

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Left Sidebar Navigation */}
      <aside
        className={`flex flex-col ${isSidebarCollapsed ? "w-20" : "w-64"} bg-gray-800 p-6 border-r border-gray-600 transition-all duration-150 ease-in-out`}
      >
        <div className="flex items-center justify-between mb-8">
          {!isSidebarCollapsed && <h2 className="text-xl font-bold">Doctor Panel</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-gray-400 hover:text-white"
          >
            {isSidebarCollapsed ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
          </Button>
        </div>
        <nav className="space-y-4 flex-1">
          <Button variant="ghost" className="w-full justify-start text-lg text-gray-300 hover:text-white hover:bg-gray-700">
            <User className={`h-6 w-6 ${!isSidebarCollapsed ? "mr-3" : ""}`} />
            <span className={isSidebarCollapsed ? "hidden" : ""}>Profile</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-lg text-gray-300 hover:text-white hover:bg-gray-700">
            <LayoutDashboard className={`h-6 w-6 ${!isSidebarCollapsed ? "mr-3" : ""}`} />
            <span className={isSidebarCollapsed ? "hidden" : ""}>Dashboard</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-lg text-gray-300 hover:text-white hover:bg-gray-700">
            <CalendarCheck className={`h-6 w-6 ${!isSidebarCollapsed ? "mr-3" : ""}`} />
            <span className={isSidebarCollapsed ? "hidden" : ""}>Appointments</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-lg text-gray-300 hover:text-white hover:bg-gray-700">
            <Clock3 className={`h-6 w-6 ${!isSidebarCollapsed ? "mr-3" : ""}`} />
            <span className={isSidebarCollapsed ? "hidden" : ""}>Availability</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-lg text-gray-300 hover:text-white hover:bg-gray-700">
            <Wallet className={`h-6 w-6 ${!isSidebarCollapsed ? "mr-3" : ""}`} />
            <span className={isSidebarCollapsed ? "hidden" : ""}>Earnings</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-lg text-gray-300 hover:text-white hover:bg-gray-700">
            <Star className={`h-6 w-6 ${!isSidebarCollapsed ? "mr-3" : ""}`} />
            <span className={isSidebarCollapsed ? "hidden" : ""}>Reviews</span>
          </Button>
          <NotificationsDrawer isCollapsed={isSidebarCollapsed} />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 p-6 overflow-y-auto transition-all duration-300 ease-in-out`}>
        <h1 className="text-3xl font-bold mb-8">{`Welcome Dr. ${doctorData?.firstName || ''}`}</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-600 text-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-gray-400">+3 since last hour</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-600 text-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-gray-400">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-600 text-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
              <DollarSign className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345</div>
              <p className="text-xs text-gray-400">+5% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-600 text-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Available Slot</CardTitle>
              <Clock className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Tomorrow, 09:00 AM</div>
              <p className="text-xs text-gray-400">Online Consultation</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointments Table */}
          <Card className="lg:col-span-2 bg-gray-800 border-gray-600 text-gray-100 rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>Manage your upcoming and past appointments.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Search appointments..."
                    className="max-w-sm bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  />
                  <Button variant="outline" className="bg-gray-700 border-gray-600 text-gray-100">
                    <Search className="h-4 w-4 mr-2" /> Search
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto bg-gray-700 border-gray-600 text-gray-100">
                      <Filter className="h-4 w-4 mr-2" />
                      {filterStatus} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-800 text-gray-100 border-gray-700">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem onClick={() => setFilterStatus("All")}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("Confirmed")}>Confirmed</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("Pending")}>Pending</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("Cancelled")}>Cancelled</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-700">
                    <TableHead>Patient</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appt) => (
                    <TableRow key={appt.id} className="hover:bg-gray-700">
                      <TableCell className="font-medium">{appt.patient}</TableCell>
                      <TableCell>{appt.time}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${appt.status === "Confirmed"
                              ? "bg-green-500/20 text-green-400"
                              : appt.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-800 text-gray-100 border-gray-700">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Patient</DropdownMenuItem>
                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                            <DropdownMenuItem>Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="grid grid-cols-1 gap-6">
            {/* Availability Manager */}
            <AvailabilityManager />

            {/* Earnings Analytics */}
            <Card className="bg-gray-800 border-gray-600 text-gray-100 rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle>Earnings Analytics</CardTitle>
                <CardDescription>Overview of your earnings.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder for Recharts line chart */}
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={earningsData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 0,
                      }}
                    >
                      <XAxis dataKey="name" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563", borderRadius: "0.5rem" }}
                        itemStyle={{ color: "#e5e7eb" }}
                        labelStyle={{ color: "#e5e7eb" }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="earnings" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center text-sm">
                    <span>Consultation - John Doe</span>
                    <span className="font-medium text-green-400">+$50</span>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span>Consultation - Jane Smith</span>
                    <span className="font-medium text-green-400">+$75</span>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span>Refund - Peter Jones</span>
                    <span className="font-medium text-red-400">-$25</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Patient Reviews List */}
        <div className="mt-6">
          <PatientReviews />
        </div>
      </main>

      {/* Profile Editor Form */}
      {showProfileEditor && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <ProfileEditor onSave={handleSaveProfile} onCancel={handleCancelEdit} />
          </div>
        </div>
      )}
    </div>
  );
}
