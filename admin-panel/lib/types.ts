// Types for BoatCheckPro Admin Dashboard

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  totalInspections: number;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  avatar?: string;
}

export interface Inspection {
  id: string;
  boatName: string;
  clientId: string;
  clientName: string;
  techniciansId?: string;
  technicianName?: string;
  inspectionType: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  completedDate?: string;
  price: number;
  notes?: string;
  photos?: string[];
}

export interface Payment {
  id: string;
  inspectionId: string;
  clientId: string;
  clientName: string;
  amount: number;
  status: 'pending' | 'completed' | 'refunded' | 'failed';
  paymentMethod: string;
  date: string;
  invoiceNumber: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalInspections: number;
  totalSpent: number;
  status: 'active' | 'blocked' | 'inactive';
  joinDate: string;
  lastInspectionDate?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalInspections: number;
  activeTechnicians: number;
  completionRate: number;
  monthlyRevenue: number[];
  inspectionsByStatus: Record<string, number>;
}

export interface Report {
  id: string;
  name: string;
  type: 'revenue' | 'inspections' | 'technicians' | 'clients';
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  createdAt: string;
}
