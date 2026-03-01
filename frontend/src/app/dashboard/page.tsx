'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Download, Calendar, DollarSign, Clock, CheckCircle, Loader2, MoreVertical } from 'lucide-react'
import { useRequireAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { users, type Inspection, type UserStats } from '@/lib/api'

function statusBadge(status: string) {
  const map: Record<string, string> = {
    completada: 'badge-success',
    confirmada: 'badge-info',
    'en-progreso': 'badge-warning',
    pendiente: 'badge-ghost',
    cancelada: 'badge-error',
  }
  return `badge badge-sm ${map[status] ?? 'badge-ghost'}`
}

export default function DashboardPage() {
  const { user, logout } = useRequireAuth()
  const { t } = useLanguage()
  const [inspections, setInspections] = useState<Inspection[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    Promise.all([users.myInspections(), users.myStats()])
      .then(([ins, st]) => { setInspections(ins); setStats(st) })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [user])

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || '?'
    : '?'

  const kpis = [
    { label: t.dashboard.kpi1, value: stats?.totalInspections ?? inspections.length, icon: Calendar },
    { label: t.dashboard.kpi2, value: stats?.completedInspections ?? inspections.filter((i) => i.status === 'completada').length, icon: CheckCircle },
    { label: t.dashboard.kpi3, value: stats ? `€${stats.totalSpent.toLocaleString()}` : '—', icon: DollarSign },
    { label: t.dashboard.kpi4, value: stats ? `${stats.averageDuration}h` : '—', icon: Clock },
  ]

  return (
    <div className="min-h-screen bg-base-200 pt-20">
      <div className="container-custom py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="w-12 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content">
                <span className="text-lg font-bold">{initials}</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-base-content">{t.dashboard.title}</h1>
              {user && <p className="text-base-content/60 text-sm">{user.email}</p>}
            </div>
          </div>
          <Link href="/request-inspection" className="btn btn-primary btn-sm gap-2">
            <Plus className="w-4 h-4" />
            {t.dashboard.newInspection}
          </Link>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20 text-base-content/50">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            {t.dashboard.loading}
          </div>
        )}

        {error && (
          <div className="alert alert-error mb-6">
            <span>{error}</span>
          </div>
        )}

        {!loading && (
          <>
            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {kpis.map((kpi) => {
                const Icon = kpi.icon
                return (
                  <div key={kpi.label} className="card bg-base-100 shadow-sm border border-base-300">
                    <div className="card-body p-5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-base-content/60 text-xs font-medium uppercase tracking-wide">{kpi.label}</p>
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-3xl font-bold text-base-content">{kpi.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Inspections table */}
            <div className="card bg-base-100 shadow-sm border border-base-300 mb-6">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="card-title text-lg">{t.dashboard.myInspections}</h2>
                  <Link href="/request-inspection" className="btn btn-primary btn-xs gap-1">
                    <Plus className="w-3 h-3" />
                    {t.dashboard.newInspection}
                  </Link>
                </div>

                {inspections.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-base-content/20" />
                    <p className="font-medium text-base-content/60">{t.dashboard.noInspections}</p>
                    <p className="text-sm mt-1 text-base-content/40">{t.dashboard.noInspectionsDesc}</p>
                    <Link href="/request-inspection" className="btn btn-primary btn-sm mt-4">
                      {t.dashboard.requestInspection}
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>{t.dashboard.colBoat}</th>
                          <th>{t.dashboard.colType}</th>
                          <th>{t.dashboard.colStatus}</th>
                          <th>{t.dashboard.colDate}</th>
                          <th>{t.dashboard.colTechnician}</th>
                          <th className="text-right">{t.dashboard.colPrice}</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {inspections.map((inspection) => (
                          <tr key={inspection.id} className="hover">
                            <td>
                              <p className="font-semibold">{inspection.boatName}</p>
                              {inspection.boatYear && <p className="text-xs text-base-content/50">{inspection.boatYear}</p>}
                            </td>
                            <td className="capitalize text-sm">{inspection.inspectionType}</td>
                            <td>
                              <span className={statusBadge(inspection.status)}>{inspection.status}</span>
                            </td>
                            <td className="text-sm">{inspection.date ?? '—'}</td>
                            <td className="text-sm">
                              {inspection.technician
                                ? `${inspection.technician.firstName} ${inspection.technician.lastName}`
                                : t.dashboard.pendingAssignment}
                            </td>
                            <td className="text-right font-semibold text-sm">
                              {inspection.price ? `€${inspection.price}` : '—'}
                            </td>
                            <td>
                              <button className="btn btn-ghost btn-xs">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card bg-primary text-primary-content shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-base">{t.dashboard.quickTitle}</h3>
                  <p className="text-primary-content/80 text-sm">{t.dashboard.quickDesc}</p>
                  <div className="card-actions mt-2">
                    <Link href="/request-inspection" className="btn btn-sm bg-white/20 hover:bg-white/30 border-0 text-white">
                      {t.dashboard.book}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-base">{t.dashboard.downloadTitle}</h3>
                  <p className="text-base-content/60 text-sm">{t.dashboard.downloadDesc}</p>
                  <div className="card-actions mt-2">
                    <button className="btn btn-outline btn-sm gap-2">
                      <Download className="w-4 h-4" />
                      {t.dashboard.downloadAll}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
