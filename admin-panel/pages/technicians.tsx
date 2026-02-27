import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { mockTechnicians } from '../lib/mockData';
import { Technician } from '../lib/types';
import { formatDate } from '../utils/export';

export default function TechniciansPage() {
  const [technicians, setTechnicians] = useState<Technician[]>(mockTechnicians);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Technician>>({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    status: 'active',
  });

  const filteredTechnicians = technicians.filter(
    (tech) =>
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (tech?: Technician) => {
    if (tech) {
      setEditingId(tech.id);
      setFormData(tech);
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        status: 'active',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Edit
      setTechnicians(
        technicians.map((t) =>
          t.id === editingId ? { ...t, ...formData } : t
        )
      );
    } else {
      // Create
      const newTech: Technician = {
        id: `TECH${String(technicians.length + 1).padStart(3, '0')}`,
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        specialization: formData.specialization || '',
        rating: 4.5,
        reviewCount: 0,
        totalInspections: 0,
        status: (formData.status as 'active' | 'inactive' | 'on-leave') || 'active',
        joinDate: new Date().toISOString().split('T')[0],
      };
      setTechnicians([...technicians, newTech]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este técnico?')) {
      setTechnicians(technicians.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Técnicos</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Nuevo Técnico
        </button>
      </div>

      {/* Search Bar */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar técnico por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Card>

      {/* Technicians Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Técnicos ({filteredTechnicians.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Nombre</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Email</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Especialización</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Rating</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Inspecciones</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Estado</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTechnicians.map((tech) => (
                  <tr
                    key={tech.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{tech.name}</div>
                      <div className="text-xs text-gray-500">ID: {tech.id}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{tech.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{tech.specialization}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Star className="text-yellow-500" size={16} />
                        <span className="font-medium text-gray-900">
                          {tech.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-gray-500">({tech.reviewCount})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {tech.totalInspections}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          tech.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : tech.status === 'on-leave'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {tech.status === 'active'
                          ? 'Activo'
                          : tech.status === 'on-leave'
                          ? 'De permiso'
                          : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(tech)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(tech.id)}
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
                {editingId ? 'Editar Técnico' : 'Nuevo Técnico'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Especialización
                  </label>
                  <select
                    value={formData.specialization || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona una especialización</option>
                    <option value="Hull Inspection">Hull Inspection</option>
                    <option value="Engine & Systems">Engine & Systems</option>
                    <option value="Electrical Systems">
                      Electrical Systems
                    </option>
                    <option value="Safety Equipment">Safety Equipment</option>
                    <option value="Navigation Systems">
                      Navigation Systems
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as 'active' | 'inactive' | 'on-leave',
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Activo</option>
                    <option value="on-leave">De permiso</option>
                    <option value="inactive">Inactivo</option>
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
