import React, { useState, useRef } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
import { FileText, Download, Printer } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import {
  mockTechnicians,
  mockInspections,
  mockPayments,
  mockClients,
} from '../lib/mockData';
import { exportToCSV, exportToPDF, formatCurrency } from '../utils/export';

// Report data
const revenueByMonth = [
  { month: 'Ene', revenue: 3200, target: 3500 },
  { month: 'Feb', revenue: 3800, target: 3500 },
  { month: 'Mar', revenue: 4100, target: 3500 },
  { month: 'Abr', revenue: 3900, target: 3500 },
  { month: 'May', revenue: 4500, target: 3500 },
  { month: 'Jun', revenue: 4200, target: 3500 },
];

const inspectionsByTechnician = mockTechnicians.map((tech) => ({
  name: tech.name,
  inspections: tech.totalInspections,
  rating: tech.rating,
}));

const clientActivity = [
  { name: 'Roberto Ferrari', inspections: 8 },
  { name: 'Isabella Rossi', inspections: 5 },
  { name: 'Carmen López', inspections: 6 },
  { name: 'Marco Rossi', inspections: 3 },
  { name: 'Giuseppe Pellegrino', inspections: 2 },
];

const paymentMethodBreakdown = [
  { name: 'Tarjeta de crédito', value: 38 },
  { name: 'Transferencia', value: 42 },
  { name: 'PayPal', value: 15 },
  { name: 'Otro', value: 5 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function ReportsPage() {
  const [reportType, setReportType] = useState('revenue');
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    if (reportType === 'revenue') {
      exportToCSV(revenueByMonth, 'reporte-ingresos');
    } else if (reportType === 'technicians') {
      exportToCSV(inspectionsByTechnician, 'reporte-tecnicos');
    } else if (reportType === 'clients') {
      exportToCSV(clientActivity, 'reporte-clientes');
    } else if (reportType === 'payments') {
      exportToCSV(mockPayments, 'reporte-pagos');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Reportes & Analytics</h1>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={18} />
            Exportar CSV
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Printer size={18} />
            Imprimir
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <Card>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { value: 'revenue', label: 'Ingresos' },
            { value: 'technicians', label: 'Técnicos' },
            { value: 'clients', label: 'Clientes' },
            { value: 'payments', label: 'Pagos' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setReportType(option.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                reportType === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Revenue Report */}
      {reportType === 'revenue' && (
        <div ref={reportRef} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ingresos por Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Ingresos Real" />
                  <Bar dataKey="target" fill="#d1d5db" name="Objetivo" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div>
                <p className="text-sm text-gray-600 mb-2">Ingresos Totales</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    revenueByMonth.reduce((sum, m) => sum + m.revenue, 0)
                  )}
                </h3>
              </div>
            </Card>
            <Card>
              <div>
                <p className="text-sm text-gray-600 mb-2">Promedio Mensual</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    revenueByMonth.reduce((sum, m) => sum + m.revenue, 0) /
                      revenueByMonth.length
                  )}
                </h3>
              </div>
            </Card>
            <Card>
              <div>
                <p className="text-sm text-gray-600 mb-2">Mes con Mayor Ingreso</p>
                <h3 className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    Math.max(...revenueByMonth.map((m) => m.revenue))
                  )}
                </h3>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Technicians Report */}
      {reportType === 'technicians' && (
        <div ref={reportRef} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inspecciones por Técnico</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={inspectionsByTechnician}
                  layout="vertical"
                  margin={{ left: 150 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={140} />
                  <Tooltip />
                  <Bar dataKey="inspections" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Technician Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de Técnicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inspectionsByTechnician.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{tech.name}</p>
                      <p className="text-xs text-gray-500">
                        Rating: ⭐ {tech.rating.toFixed(1)}/5
                      </p>
                    </div>
                    <p className="font-bold text-blue-600">
                      {tech.inspections} inspecciones
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Clients Report */}
      {reportType === 'clients' && (
        <div ref={reportRef} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actividad de Clientes Principales</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={clientActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="inspections" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Client Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Clientes Principales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {clientActivity.slice(0, 3).map((client, idx) => (
                    <div
                      key={client.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                          {idx + 1}
                        </div>
                        <p className="font-medium text-gray-900">
                          {client.name}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {client.inspections} insp.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumen de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Clientes</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockClients.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Clientes Activos</p>
                    <p className="text-2xl font-bold text-green-600">
                      {mockClients.filter((c) => c.status === 'active').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Gastado</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(
                        mockClients.reduce((sum, c) => sum + c.totalSpent, 0)
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Payments Report */}
      {reportType === 'payments' && (
        <div ref={reportRef} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div>
                <p className="text-sm text-gray-600 mb-2">Pagos Completados</p>
                <h3 className="text-2xl font-bold text-green-600">
                  {mockPayments.filter((p) => p.status === 'completed').length}
                </h3>
              </div>
            </Card>
            <Card>
              <div>
                <p className="text-sm text-gray-600 mb-2">Total Recaudado</p>
                <h3 className="text-2xl font-bold text-blue-600">
                  {formatCurrency(
                    mockPayments
                      .filter((p) => p.status === 'completed')
                      .reduce((sum, p) => sum + p.amount, 0)
                  )}
                </h3>
              </div>
            </Card>
            <Card>
              <div>
                <p className="text-sm text-gray-600 mb-2">Monto Pendiente</p>
                <h3 className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(
                    mockPayments
                      .filter((p) => p.status === 'pending')
                      .reduce((sum, p) => sum + p.amount, 0)
                  )}
                </h3>
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pago</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentMethodBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentMethodBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
