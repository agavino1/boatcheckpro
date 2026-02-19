'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, LogOut, Menu, X, Plus, MoreVertical, Download, Eye, Calendar, DollarSign, Clock } from 'lucide-react'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const inspections = [
    {
      id: 1,
      boatName: 'Sea Breeze',
      boatType: 'Sailboat',
      length: '35ft',
      status: 'Completed',
      date: '2026-02-15',
      price: 499,
      technician: 'Captain James Mitchell',
    },
    {
      id: 2,
      boatName: 'Ocean Spirit',
      boatType: 'Motor Yacht',
      length: '45ft',
      status: 'Scheduled',
      date: '2026-02-25',
      price: 749,
      technician: 'Dr. Patricia Watson',
    },
    {
      id: 3,
      boatName: 'Wave Rider',
      boatType: 'Speedboat',
      length: '25ft',
      status: 'In Progress',
      date: '2026-02-20',
      price: 299,
      technician: 'Michael Rodriguez',
    },
  ]

  const stats = [
    { label: 'Total Inspections', value: '3', icon: Calendar },
    { label: 'Completed', value: '1', icon: Eye },
    { label: 'Total Spent', value: '$1,547', icon: DollarSign },
    { label: 'Average Time', value: '4.5h', icon: Clock },
  ]

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="flex h-full">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transition-transform md:relative md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } mt-20`}
        >
          <div className="p-6 space-y-6">
            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary-600 text-white font-medium">
                <Home className="w-5 h-5" />
                Dashboard
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                <Plus className="w-5 h-5" />
                New Inspection
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                <Calendar className="w-5 h-5" />
                Schedule
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                <DollarSign className="w-5 h-5" />
                Billing
              </a>
            </nav>

            <div className="border-t border-gray-800 pt-6">
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-red-400">
                <LogOut className="w-5 h-5" />
                Sign Out
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <div className="fixed top-20 right-0 left-0 md:left-64 bg-white border-b border-gray-200 z-30">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  {sidebarOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 mt-20">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                )
              })}
            </div>

            {/* Inspections Section */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Inspections</h2>
                <Link href="/request-inspection" className="btn-primary text-sm">
                  + New Inspection
                </Link>
              </div>

              {/* Inspections Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Boat</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Type</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Technician</th>
                      <th className="text-right py-4 px-4 font-semibold text-gray-700">Price</th>
                      <th className="text-right py-4 px-4 font-semibold text-gray-700"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspections.map((inspection) => (
                      <tr key={inspection.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-semibold text-gray-900">{inspection.boatName}</p>
                            <p className="text-sm text-gray-500">{inspection.length}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{inspection.boatType}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            inspection.status === 'Completed'
                              ? 'bg-green-100 text-green-700'
                              : inspection.status === 'Scheduled'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {inspection.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{inspection.date}</td>
                        <td className="py-4 px-4 text-gray-700">{inspection.technician}</td>
                        <td className="py-4 px-4 text-right font-semibold text-gray-900">${inspection.price}</td>
                        <td className="py-4 px-4 text-right">
                          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="card p-6 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                <h3 className="font-bold text-gray-900 mb-4">Need a Quick Inspection?</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Book an express inspection and get your report in 24 hours.
                </p>
                <button className="btn-primary text-sm">Book Express Inspection</button>
              </div>

              <div className="card p-6 bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200">
                <h3 className="font-bold text-gray-900 mb-4">Download Your Reports</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Access all your inspection reports in PDF format.
                </p>
                <button className="btn-secondary text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download All
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
