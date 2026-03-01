const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// ── Token helpers ────────────────────────────────────────────────────────────

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('bcp_token')
}

export function setToken(token: string): void {
  localStorage.setItem('bcp_token', token)
}

export function removeToken(): void {
  localStorage.removeItem('bcp_token')
  localStorage.removeItem('bcp_user')
}

// ── Base fetch wrapper ───────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || err.message || 'Request failed')
  }

  // 204 No Content
  if (res.status === 204) return undefined as T
  return res.json()
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  role?: string
}

export interface AuthResponse {
  token: string
  refreshToken?: string
  user: User
}

export const auth = {
  login: (data: LoginPayload) =>
    request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  register: (data: RegisterPayload) =>
    request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    request<void>('/api/auth/logout', { method: 'POST' }),

  refreshToken: (refreshToken: string) =>
    request<{ token: string }>('/api/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }),
}

// ── Users ────────────────────────────────────────────────────────────────────

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'cliente' | 'tecnico' | 'admin'
  emailVerified?: boolean
  phone?: string
  profileImageUrl?: string
}

export interface UserStats {
  totalInspections: number
  completedInspections: number
  totalSpent: number
  averageDuration: number
}

export const users = {
  me: () => request<User>('/api/users/profile/me'),
  updateProfile: (data: Partial<User>) =>
    request<User>('/api/users/profile/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  myInspections: () => request<Inspection[]>('/api/users/me/inspections'),
  myStats: () => request<UserStats>('/api/users/me/statistics'),
}

// ── Inspections ──────────────────────────────────────────────────────────────

export interface Inspection {
  id: string
  boatName: string
  boatModel?: string
  boatYear?: number
  inspectionType: string
  status: 'pendiente' | 'confirmada' | 'en-progreso' | 'completada' | 'cancelada'
  location?: string
  date?: string
  time?: string
  price?: number
  notes?: string
  rating?: number
  technician?: {
    id: string
    firstName: string
    lastName: string
  }
  createdAt: string
}

export interface CreateInspectionPayload {
  boatName: string
  boatType?: string
  boatModel?: string
  boatYear?: number
  inspectionType: string
  location: string
  preferredDate: string
  notes?: string
  listingUrl?: string
}

export const inspections = {
  list: () => request<Inspection[]>('/api/inspections'),
  get: (id: string) => request<Inspection>(`/api/inspections/${id}`),
  create: (data: CreateInspectionPayload) =>
    request<Inspection>('/api/inspections', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  cancel: (id: string) =>
    request<Inspection>(`/api/inspections/${id}/cancel`, { method: 'POST' }),
  rate: (id: string, rating: number, comment?: string) =>
    request<Inspection>(`/api/inspections/${id}/rate`, {
      method: 'POST',
      body: JSON.stringify({ rating, comment }),
    }),
}

// ── Technicians ──────────────────────────────────────────────────────────────

export interface Technician {
  id: string
  userId: string
  firstName?: string
  lastName?: string
  licenseNumber?: string
  specialization?: string
  certifications?: string[]
  rating?: number
  reviews?: number
  availability?: boolean
  serviceArea?: string
  user?: User
}

export const technicians = {
  list: () => request<Technician[]>('/api/technicians'),
  get: (id: string) => request<Technician>(`/api/technicians/${id}`),
  myInspections: () => request<Inspection[]>('/api/technicians/me/inspections'),
  myStats: () => request<UserStats>('/api/technicians/me/statistics'),
}

// ── Admin ────────────────────────────────────────────────────────────────────

export interface AdminDashboard {
  totalUsers: number
  totalInspections: number
  totalRevenue: number
  completionRate: number
  recentInspections: Inspection[]
}

export const admin = {
  dashboard: () => request<AdminDashboard>('/api/admin/dashboard'),
  users: () => request<User[]>('/api/admin/users'),
  technicians: () => request<Technician[]>('/api/admin/technicians'),
  inspections: () => request<Inspection[]>('/api/admin/inspection-reports'),
  revenueStats: () => request<unknown>('/api/admin/revenue-analytics'),
  deactivateUser: (id: string) =>
    request<void>(`/api/admin/users/${id}/deactivate`, { method: 'POST' }),
  activateUser: (id: string) =>
    request<void>(`/api/admin/users/${id}/activate`, { method: 'POST' }),
}
