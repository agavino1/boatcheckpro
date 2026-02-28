const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// ── Token helpers ────────────────────────────────────────────────────────────

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('admin_token')
}

export function setAdminToken(token: string): void {
  localStorage.setItem('admin_token', token)
}

export function removeAdminToken(): void {
  localStorage.removeItem('admin_token')
}

// ── Base fetch wrapper ───────────────────────────────────────────────────────

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || err.message || `Request failed: ${res.status}`)
  }

  if (res.status === 204) return undefined as T
  return res.json()
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export interface LoginResponse {
  token: string
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
  }
}

export async function adminLogin(email: string, password: string): Promise<LoginResponse> {
  return request<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalUsers?: number
  totalInspections?: number
  totalRevenue?: number
  completionRate?: number
  activeTechnicians?: number
}

export async function fetchDashboard(): Promise<DashboardStats> {
  return request<DashboardStats>('/api/admin/dashboard')
}

export async function fetchRevenueStats(): Promise<unknown> {
  return request('/api/admin/revenue-analytics')
}

// ── Users ─────────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  emailVerified?: boolean
  createdAt?: string
}

export async function fetchUsers(): Promise<AdminUser[]> {
  return request<AdminUser[]>('/api/admin/users')
}

export async function deactivateUser(id: string): Promise<void> {
  return request<void>(`/api/admin/users/${id}/deactivate`, { method: 'POST' })
}

export async function activateUser(id: string): Promise<void> {
  return request<void>(`/api/admin/users/${id}/activate`, { method: 'POST' })
}

// ── Technicians ───────────────────────────────────────────────────────────────

export interface AdminTechnician {
  id: string
  userId: string
  licenseNumber?: string
  specialization?: string
  rating?: number
  reviews?: number
  user?: AdminUser
}

export async function fetchTechnicians(): Promise<AdminTechnician[]> {
  return request<AdminTechnician[]>('/api/admin/technicians')
}

// ── Inspections ───────────────────────────────────────────────────────────────

export interface AdminInspection {
  id: string
  boatName: string
  inspectionType: string
  status: string
  date?: string
  price?: number
  client?: AdminUser
  technician?: AdminUser
  createdAt: string
}

export async function fetchInspections(): Promise<AdminInspection[]> {
  return request<AdminInspection[]>('/api/admin/inspection-reports')
}
