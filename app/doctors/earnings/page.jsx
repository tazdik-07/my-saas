"use client";

import { useState } from 'react';
import {
  DollarSign,
  CreditCard,
  RefreshCw,
  BarChart2,
  Calendar,
  User,
  Tag,
  Percent,
  Download,
  FileText,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Home,
  Menu,
  X,
  Clock,
  MessageSquare,
  Bell
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function DoctorEarningsDashboard() {
  const [activeChartTab, setActiveChartTab] = useState('weekly'); // State for chart time range
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: Home, href: '/doctors/dashboard', active: false },
    { name: 'Profile', icon: User, href: '/doctors/profile' },
    { name: 'Appointments', icon: Calendar, href: '/doctors/appointments' },
    { name: 'Availability', icon: Clock, href: '/doctors/availability' },
    { name: 'Earnings', icon: DollarSign, href: '/doctors/earnings', active: true },
    { name: 'Reviews', icon: MessageSquare, href: '/doctors/reviews' },
  ];

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$15,230',
      icon: DollarSign,
      change: 12.5,
      changeType: 'increase',
      bgColor: 'from-green-700 to-green-800'
    },
    {
      title: 'Pending Payouts',
      value: '$2,100',
      icon: CreditCard,
      change: 5.2,
      changeType: 'increase',
      bgColor: 'from-yellow-700 to-yellow-800'
    },
    {
      title: 'Refunds',
      value: '$150',
      icon: RefreshCw,
      change: 1.8,
      changeType: 'decrease',
      bgColor: 'from-red-700 to-red-800'
    },
    {
      title: 'Avg. Consultation Fee',
      value: '$50',
      icon: BarChart2,
      change: 0.5,
      changeType: 'increase',
      bgColor: 'from-blue-700 to-blue-800'
    },
  ];

  const transactions = [
    { date: '2025-07-03', patient: 'Alice Smith', service: 'General Check-up', grossFee: 60, platformCut: 6, netEarnings: 54 },
    { date: '2025-07-02', patient: 'Bob Johnson', service: 'Follow-up', grossFee: 40, platformCut: 4, netEarnings: 36 },
    { date: '2025-07-01', patient: 'Charlie Brown', service: 'Specialist Consultation', grossFee: 100, platformCut: 10, netEarnings: 90 },
    { date: '2025-06-30', patient: 'Diana Prince', service: 'General Check-up', grossFee: 60, platformCut: 6, netEarnings: 54 },
    { date: '2025-06-29', patient: 'Eve Adams', service: 'Follow-up', grossFee: 40, platformCut: 4, netEarnings: 36 },
  ];

  const payoutHistory = [
    { date: '2025-06-25', amount: '$5,000', status: 'Completed', invoiceId: 'INV001' },
    { date: '2025-05-25', amount: '$4,800', status: 'Completed', invoiceId: 'INV002' },
    { date: '2025-04-25', amount: '$5,430', status: 'Completed', invoiceId: 'INV003' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Fixed Left Sidebar for Desktop */}
      <aside className={`hidden md:flex flex-col ${isSidebarCollapsed ? 'w-16' : 'w-48'} bg-gray-800 text-gray-100 border-r border-gray-700 p-4 transition-all duration-300`}>
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
                    ${isSidebarCollapsed ? 'justify-center' : ''} ${item.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
                >
                  <item.icon className={`${isSidebarCollapsed ? 'h-5 w-5' : 'h-5 w-5 mr-3'}`} />
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
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-auto transition-all duration-300">
        <h1 className="text-3xl font-bold text-gray-50 mb-8">Earnings Dashboard</h1>

      {/* Top Cards */}
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
                {kpi.change}%
              </div>
            </div>
          </Card>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Area Chart for Earnings Over Time */}
        <Card className="lg:col-span-2 p-6 rounded-xl shadow-lg bg-gray-800 text-gray-100 border border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-50">Earnings Over Time</h2>
            <div className="flex space-x-2">
              {['weekly', 'monthly', 'yearly'].map((tab) => (
                <Button
                  key={tab}
                  variant="outline"
                  size="sm"
                  className={`px-4 py-2 rounded-full text-sm font-medium ${activeChartTab === tab ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => setActiveChartTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
            Area Chart Placeholder for {activeChartTab} earnings
          </div>
        </Card>

        {/* Tax Summary Panel */}
        <Card className="p-6 rounded-xl shadow-lg bg-gray-800 text-gray-100 border border-gray-600">
          <h2 className="text-2xl font-semibold text-gray-50 mb-4">Tax Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 flex items-center"><Info className="h-5 w-5 mr-2 text-indigo-400" />GST ID:</span>
              <span className="font-medium text-gray-50">GSTIN123456789</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 flex items-center"><FileText className="h-5 w-5 mr-2 text-indigo-400" />Total Taxable Income:</span>
              <span className="font-medium text-gray-50">$14,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 flex items-center"><Percent className="h-5 w-5 mr-2 text-indigo-400" />Tax Rate:</span>
              <span className="font-medium text-gray-50">18%</span>
            </div>
            <div className="flex items-center justify-between font-bold text-lg">
              <span className="text-gray-50 flex items-center"><DollarSign className="h-5 w-5 mr-2 text-indigo-400" />Estimated Tax Due:</span>
              <span className="text-red-400">$2,520</span>
            </div>
          </div>
          <Button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center">
            <Download className="h-5 w-5 mr-2" />
            Download Tax Report
          </Button>
        </Card>
      </div>

      {/* Table of Transactions */}
      <Card className="p-6 rounded-xl shadow-lg bg-gray-800 text-gray-100 border border-gray-600 mb-8">
        <h2 className="text-2xl font-semibold text-gray-50 mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-700 hover:bg-gray-700">
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Patient</TableHead>
                <TableHead className="text-gray-300">Service</TableHead>
                <TableHead className="text-gray-300 text-right">Gross Fee</TableHead>
                <TableHead className="text-gray-300 text-right">Platform Cut</TableHead>
                <TableHead className="text-gray-300 text-right">Net Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index} className="border-gray-700 hover:bg-gray-700">
                  <TableCell className="font-medium">{transaction.date}</TableCell>
                  <TableCell>{transaction.patient}</TableCell>
                  <TableCell>{transaction.service}</TableCell>
                  <TableCell className="text-right">${transaction.grossFee}</TableCell>
                  <TableCell className="text-right text-red-400">-${transaction.platformCut}</TableCell>
                  <TableCell className="text-right text-green-400">${transaction.netEarnings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Payout History and Invoices */}
      <Card className="p-6 rounded-xl shadow-lg bg-gray-800 text-gray-100 border border-gray-600">
        <h2 className="text-2xl font-semibold text-gray-50 mb-4">Payout History</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-700 hover:bg-gray-700">
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Amount</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payoutHistory.map((payout, index) => (
                <TableRow key={index} className="border-gray-700 hover:bg-gray-700">
                  <TableCell className="font-medium">{payout.date}</TableCell>
                  <TableCell className="text-green-400">{payout.amount}</TableCell>
                  <TableCell>{payout.status}</TableCell>
                  <TableCell>
                    <Button variant="link" className="text-indigo-400 hover:text-indigo-300 p-0 h-auto">
                      <Download className="h-4 w-4 mr-1" /> {payout.invoiceId}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </main>
    </div>
  );
}
