import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  DollarSign,
  CheckCircle,
  Users,
  TrendingUp,
} from 'lucide-react';
import KPICard from '../components/KPICard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { mockDashboardStats, mockInspections, mockPayments } from '../lib/mockData';
import { formatCurrency, formatDate } from '../utils/export';

// Monthly revenue data
const monthlyRevenueData = [
  { month: 'Ene', revenue: 3200 },
  { month: 'Feb', revenue: 3800 },
  { month: 'Mar', revenue: 4100 },
  { month: 'Abr', revenue: 3900 },
  { month: 'May', revenue: 4500 },
  { month: 'Jun', revenue: 4200 },
  { month: 'Jul', revenue: 3800 },
  { month: 'Ago', revenue: 4300 },
  { month: 'Sep', revenue: 4600 },
  { month: 'Oct', revenue: 4800 },
  { month: 'Nov', revenue: 4900 },
  { month: 'Dic', revenue: 5000 },
];

// Inspections by status
const inspectionStatusData = [
  { name: 'Completadas', value: 287, color: '#10b981' },
  { name: 'En progreso', value: 45, color: '#f59e0b' },
  { name: 'Pendientes', value: 52, color: '#3b82f6' },
  { name: 'Canceladas', value: 28, color: '#ef4444' },
];

export default function Dashboard() {
  const totalRevenue = mockDashboardStats.totalRevenue;
  const totalInspections = mockDashboardStats.totalInspections;
  const activeTechnicians = mockDashboardStats.activeTechnicians;
  const completionRate = mockDashboardStats.completionRate;

  // Recent inspections
  const recentInspections = mockInspections.slice(0, 5);

  // Recent payments
  const recentPayments = mockPayments.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Ingresos Totales"
            value={formatCurrency(totalRevenue)}
            icon={DollarSign}
            trend={{ value: 12, direction: 'up' }}
            color="blue"
          />
          <KPICard
            title="Total Inspecciones"
            value={totalInspections}
            icon={CheckCircle}
            trend={{ value: 8, direction: 'up' }}
            color="green"
          />
          <KPICard
            title="Técnicos Activos"
            value={activeTechnicians}
            icon={Users}
            color="orange"
          />
          <KPICard
            title="Tasa de Finalización"
            value={`${completionRate}%`}
            icon={TrendingUp}
            trend={{ value: 3, direction: 'up' }}
            color="green"
          />
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ingresos (Últimos 12 meses)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => formatCurrency(value as number)}
                  contentStyle={{ backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0066CC"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Ingresos"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Inspections by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de Inspecciones</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={inspectionStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {inspectionStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Inspections & Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inspections */}
        <Card>
          <CardHeader>
            <CardTitle>Últimas Inspecciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInspections.map((inspection) => (
                <div
                  key={inspection.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">
                      {inspection.boatName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {inspection.clientName} • {formatDate(inspection.scheduledDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        inspection.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : inspection.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {inspection.status === 'completed'
                        ? 'Completada'
                        : inspection.status === 'in-progress'
                        ? 'En progreso'
                        : 'Pendiente'}
                    </span>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {formatCurrency(inspection.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Últimos Pagos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">
                      {payment.clientName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {payment.invoiceNumber} • {formatDate(payment.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {payment.status === 'completed'
                        ? 'Completado'
                        : payment.status === 'pending'
                        ? 'Pendiente'
                        : 'Reembolsado'}
                    </span>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {formatCurrency(payment.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
