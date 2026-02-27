import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { mockInspections, mockTechnicians } from '../lib/mockData';
import { Inspection } from '../lib/types';
import { formatDate, formatCurrency } from '../utils/export';

export default function InspectionsPage() {
  const [inspections, setInspections] = useState<Inspection[]>(mockInspections);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Inspection>>({
    boatName: '',
    clientName: '',
    inspectionType: '',
    status: 'pending',
    price: 0,
  });

  const filteredInspections = inspections.filter((ins) => {
    const matchesSearch =
      ins.boatName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ins.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || ins.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenModal = (ins?: Inspection) => {
    if (ins) {
      setEditingId(ins.id);
      setFormData(ins);
    } else {
      setEditingId(null);
      setFormData({
        boatName: '',
        clientName: '',
        inspectionType: '',
        status: 'pending',
        price: 0,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setInspections(
        inspections.map((i) =>
          i.id === editingId ? { ...i, ...formData } : i
        )
      );
    } else {
      const newIns: Inspection = {
        id: `INS${String(inspections.length + 1).padStart(3, '0')}`,
        boatName: formData.boatName || '',
        clientId: `CL${String(Math.floor(Math.random() * 100)).padStart(3, '0')}`,
        clientName: formData.clientName || '',
        inspectionType: formData.inspectionType || '',
        status: (formData.status as any) || 'pending',
        scheduledDate: new Date().toISOString().split('T')[0],
        price: formData.price || 0,
      };
      setInspections([...inspections, newIns]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta inspección?')) {
      setInspections(inspections.filter((i) => i.id !== id));
    }
  };

  const statusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'in-progress':
        return 'En progreso';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Inspecciones</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Nueva Inspección
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por barco o cliente..."
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
              <option value="in-progress">En progreso</option>
              <option value="completed">Completada</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>
        </Card>
      </div>

      {/* Inspections Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Inspecciones ({filteredInspections.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Barco</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Cliente</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Tipo</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Técnico</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Fecha</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Precio</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Estado</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredInspections.map((ins) => (
                  <tr
                    key={ins.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{ins.boatName}</div>
                      <div className="text-xs text-gray-500">ID: {ins.id}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {ins.clientName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {ins.inspectionType}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {ins.technicianName || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(ins.scheduledDate)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatCurrency(ins.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusBadgeClass(
                          ins.status
                        )}`}
                      >
                        {getStatusLabel(ins.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(ins)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(ins.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
                {editingId ? 'Editar Inspección' : 'Nueva Inspección'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Barco
                  </label>
                  <input
                    type="text"
                    value={formData.boatName || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, boatName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
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
                    Tipo de Inspección
                  </label>
                  <select
                    value={formData.inspectionType || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        inspectionType: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="Annual">Anual</option>
                    <option value="Pre-purchase">Pre-compra</option>
                    <option value="Insurance">Seguro</option>
                    <option value="Seasonal">Estacional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio
                  </label>
                  <input
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
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
                    <option value="in-progress">En progreso</option>
                    <option value="completed">Completada</option>
                    <option value="cancelled">Cancelada</option>
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
