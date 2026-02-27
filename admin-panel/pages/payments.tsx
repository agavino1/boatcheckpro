import React, { useState } from 'react';
import { Plus, Search, Filter, DollarSign, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { mockPayments } from '../lib/mockData';
import { Payment } from '../lib/types';
import { formatDate, formatCurrency, exportToCSV } from '../utils/export';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Payment>>({
    clientName: '',
    amount: 0,
    status: 'pending',
    paymentMethod: 'Credit Card',
  });

  const filteredPayments = payments.filter((pay) => {
    const matchesSearch =
      pay.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || pay.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const completedAmount = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleOpenModal = (pay?: Payment) => {
    if (pay) {
      setEditingId(pay.id);
      setFormData(pay);
    } else {
      setEditingId(null);
      setFormData({
        clientName: '',
        amount: 0,
        status: 'pending',
        paymentMethod: 'Credit Card',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setPayments(
        payments.map((p) =>
          p.id === editingId ? { ...p, ...formData } : p
        )
      );
    } else {
      const newPayment: Payment = {
        id: `PAY${String(payments.length + 1).padStart(3, '0')}`,
        inspectionId: `INS${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        clientId: `CL${String(Math.floor(Math.random() * 100)).padStart(3, '0')}`,
        clientName: formData.clientName || '',
        amount: formData.amount || 0,
        status: (formData.status as any) || 'pending',
        paymentMethod: formData.paymentMethod || 'Credit Card',
        date: new Date().toISOString().split('T')[0],
        invoiceNumber: `INV-${new Date().getFullYear()}-${String(payments.length + 1).padStart(3, '0')}`,
      };
      setPayments([...payments, newPayment]);
    }
    setShowModal(false);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setPayments(
      payments.map((p) =>
        p.id === id ? { ...p, status: newStatus as any } : p
      )
    );
  };

  const handleExport = () => {
    exportToCSV(filteredPayments, 'pagos-boatcheckpro');
  };

  const statusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'pending':
        return 'Pendiente';
      case 'refunded':
        return 'Reembolsado';
      case 'failed':
        return 'Fallido';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Pagos</h1>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <RefreshCw size={18} />
            Exportar CSV
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Nuevo Pago
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Ingresos</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalAmount)}
              </h3>
            </div>
            <DollarSign className="text-blue-600" size={24} />
          </div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Pagos Completados</p>
              <h3 className="text-2xl font-bold text-green-600">
                {formatCurrency(completedAmount)}
              </h3>
            </div>
            <DollarSign className="text-green-600" size={24} />
          </div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Pagos Pendientes</p>
              <h3 className="text-2xl font-bold text-yellow-600">
                {formatCurrency(pendingAmount)}
              </h3>
            </div>
            <DollarSign className="text-yellow-600" size={24} />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por cliente o invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </Card>
        <Card>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="completed">Completado</option>
              <option value="refunded">Reembolsado</option>
              <option value="failed">Fallido</option>
            </select>
          </div>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos ({filteredPayments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">
                    Invoice
                  </th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">
                    Cliente
                  </th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">
                    Monto
                  </th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">
                    Método
                  </th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">
                    Fecha
                  </th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">
                    Estado
                  </th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((pay) => (
                  <tr
                    key={pay.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-blue-600">
                        {pay.invoiceNumber}
                      </div>
                      <div className="text-xs text-gray-500">ID: {pay.id}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {pay.clientName}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {formatCurrency(pay.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {pay.paymentMethod}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(pay.date)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={pay.status}
                        onChange={(e) =>
                          handleStatusChange(pay.id, e.target.value)
                        }
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusBadgeClass(
                          pay.status
                        )}`}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="completed">Completado</option>
                        <option value="refunded">Reembolsado</option>
                        <option value="failed">Fallido</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleOpenModal(pay)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>
                {editingId ? 'Editar Pago' : 'Nuevo Pago'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cliente
                  </label>
                  <input
                    type="text"
                    value={formData.clientName || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, clientName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monto
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Método de Pago
                  </label>
                  <select
                    value={formData.paymentMethod || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Credit Card">Tarjeta de crédito</option>
                    <option value="Bank Transfer">Transferencia bancaria</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Other">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    value={formData.status || 'pending'}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as any })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pendiente</option>
                    <option value="completed">Completado</option>
                    <option value="refunded">Reembolsado</option>
                    <option value="failed">Fallido</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingId ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
