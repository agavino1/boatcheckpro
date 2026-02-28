'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import {
  auth,
  users,
  getToken,
  setToken,
  removeToken,
  type User,
  type LoginPayload,
  type RegisterPayload,
} from '@/lib/api'

// ── Types ────────────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthContextValue extends AuthState {
  login: (data: LoginPayload) => Promise<void>
  register: (data: RegisterPayload) => Promise<void>
  logout: () => void
}

// ── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // Load stored user on mount
  useEffect(() => {
    const token = getToken()
    if (!token) {
      setState({ user: null, isLoading: false, isAuthenticated: false })
      return
    }

    const stored = localStorage.getItem('bcp_user')
    if (stored) {
      try {
        const user: User = JSON.parse(stored)
        setState({ user, isLoading: false, isAuthenticated: true })
        return
      } catch {
        // invalid stored data — fall through to fetch
      }
    }

    // Token exists but no cached user — fetch from API
    users
      .me()
      .then((user) => {
        localStorage.setItem('bcp_user', JSON.stringify(user))
        setState({ user, isLoading: false, isAuthenticated: true })
      })
      .catch(() => {
        removeToken()
        setState({ user: null, isLoading: false, isAuthenticated: false })
      })
  }, [])

  const login = useCallback(async (data: LoginPayload) => {
    const res = await auth.login(data)
    setToken(res.token)
    localStorage.setItem('bcp_user', JSON.stringify(res.user))
    setState({ user: res.user, isLoading: false, isAuthenticated: true })
  }, [])

  const register = useCallback(async (data: RegisterPayload) => {
    const res = await auth.register(data)
    setToken(res.token)
    localStorage.setItem('bcp_user', JSON.stringify(res.user))
    setState({ user: res.user, isLoading: false, isAuthenticated: true })
  }, [])

  const logout = useCallback(() => {
    auth.logout().catch(() => {})
    removeToken()
    setState({ user: null, isLoading: false, isAuthenticated: false })
    router.push('/')
  }, [router])

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

// ── Guard ─────────────────────────────────────────────────────────────────────

export function useRequireAuth(redirectTo = '/login'): AuthContextValue {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      router.replace(redirectTo)
    }
  }, [auth.isLoading, auth.isAuthenticated, redirectTo, router])

  return auth
}
