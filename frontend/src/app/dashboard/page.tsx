'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Home,
  LogOut,
  Menu,
  X,
  Plus,
  MoreVertical,
  Download,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  Loader2,
} from 'lucide-react'
import { useRequireAuth } from '@/context/AuthContext'
import { users, type Inspection, type UserStats } from '@/lib/api'

function statusStyle(status: string) {
  const map: Record<string, string> = {
    completada: 'bg-green-100 text-green-700',
    confirmada: 'bg-blue-100 text-blue-700',
    'en-progreso': 'bg-yellow-100 text-yellow-700',
    pendiente: 'bg-gray-100 text-gray-700',
    cancelada: 'bg-red-100 text-red-700',
  }
  return map[status] ?? 'bg-gray-100 text-gray-600'
}

export default function DashboardPage() {
  const { user, logout } = useRequireAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [inspections, setInspections] = useState<Inspection[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    Promise.all([users.myInspections(), users.myStats()])
      .then(([ins, st]) => {
        setInspections(ins)
        setStats(st)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [user])

  const displayName = user ? `${user.firstName} ${user.lastName}` : ''
  const initials = user
    ? `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase()
    : '?'

  const kpis = [
    {
      label: 'Total Inspections',
      value: stats?.totalInspections ?? inspections.length,
      icon: Calendar,
    },
    {
      label: 'Completed',
      value: stats?.completedInspections ?? inspections.filter((i) => i.status === 'completada').length,
      icon: CheckCircle,
    },
    {
      label: 'Total Spent',
      value: stats ? `$${stats.totalSpent.toLocaleString()}` : '—',
      icon: DollarSign,
    },
    {
      label: 'Avg. Duration',
      value: stats ? `${stats.averageDuration}h` : '—',
      icon: Clock,
    },
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
            {user && (
              <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{displayName}</p>
                  <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                </div>
              </div>
            )}

            <nav className="space-y-2">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary-600 text-white font-medium"
              >
                <Home className="w-5 h-5" />
                Dashboard
              </a>
              <Link
                href="/request-inspection"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-5 h-5" />
                New Inspection
              </Link>
              <Link
                href="/calendar"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Schedule
              </Link>
            </nav>

            <div className="border-t border-gray-800 pt-6">
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-red-400 w-full"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Top bar */}
          <div className="fixed top-20 right-0 left-0 md:left-64 bg-white border-b border-gray-200 z-30">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {initials}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 mt-20">
            {loading && (
              <div className="flex items-center justify-center py-20 text-gray-500">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Loading your data…
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {!loading && (
              <>
                {/* KPI cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {kpis.map((kpi) => {
                    const Icon = kpi.icon
                    return (
                      <div key={kpi.label} className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-gray-600 text-sm font-medium">{kpi.label}</p>
                          <Icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Inspections table */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">My Inspections</h2>
                    <Link href="/request-inspection" className="btn-primary text-sm">
                      + New Inspection
                    </Link>
                  </div>

                  {inspections.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="font-medium">No inspections yet</p>
                      <p className="text-sm mt-1">Request your first inspection to get started.</p>
                      <Link href="/request-inspection" className="btn-primary mt-4 inline-block text-sm">
                        Request Inspection
                      </Link>
                    </div>
                  ) : (
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
                            <th className="text-right py-4 px-4 font-semibold text-gray-700" />
                          </tr>
                        </thead>
                        <tbody>
                          {inspections.map((inspection) => (
                            <tr
                              key={inspection.id}
                              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                              <td className="py-4 px-4">
                                <p className="font-semibold text-gray-900">{inspection.boatName}</p>
                                {inspection.boatYear && (
                                  <p className="text-sm text-gray-500">{inspection.boatYear}</p>
                                )}
                              </td>
                              <td className="py-4 px-4 text-gray-700 capitalize">
                                {inspection.inspectionType}
                              </td>
                              <td className="py-4 px-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyle(
                                    inspection.status
                                  )}`}
                                >
                                  {inspection.status}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-gray-700">
                                {inspection.date ?? '—'}
                              </td>
                              <td className="py-4 px-4 text-gray-700">
                                {inspection.technician
                                  ? `${inspection.technician.firstName} ${inspection.technician.lastName}`
                                  : 'Pending assignment'}
                              </td>
                              <td className="py-4 px-4 text-right font-semibold text-gray-900">
                                {inspection.price ? `$${inspection.price}` : '—'}
                              </td>
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
                  )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="card p-6 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                    <h3 className="font-bold text-gray-900 mb-4">Need a Quick Inspection?</h3>
                    <p className="text-gray-700 text-sm mb-4">
                      Book an express inspection and get your report in 24 hours.
                    </p>
                    <Link href="/request-inspection" className="btn-primary text-sm">
                      Book Inspection
                    </Link>
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
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
