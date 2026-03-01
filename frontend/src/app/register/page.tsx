'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Anchor, Check } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function MicrosoftIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#F25022" d="M1 1h10v10H1z"/>
      <path fill="#00A4EF" d="M13 1h10v10H13z"/>
      <path fill="#7FBA00" d="M1 13h10v10H1z"/>
      <path fill="#FFB900" d="M13 13h10v10H13z"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'cliente',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(formData)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const pw = formData.password
  const pwChecks = {
    length: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    number: /[0-9]/.test(pw),
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 pt-20 pb-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg mb-4">
            <Anchor className="w-6 h-6 text-primary-content" />
          </div>
          <h1 className="text-3xl font-bold text-base-content">{t.auth.register.title}</h1>
          <p className="text-base-content/60 mt-2">{t.auth.register.subtitle}</p>
        </div>

        <div className="card bg-base-100 border border-base-300 shadow-lg">
          <div className="card-body">
            {error && (
              <div className="alert alert-error text-sm mb-2">
                <span>{error}</span>
              </div>
            )}

            {/* OAuth buttons */}
            <div className="space-y-2 mb-4">
              <p className="text-center text-sm text-base-content/50">{t.auth.register.orWith}</p>
              <div className="grid grid-cols-3 gap-2">
                <button type="button" onClick={() => window.location.href = '/api/auth/signin/google'} className="btn btn-outline gap-2 text-sm">
                  <GoogleIcon />Google
                </button>
                <button type="button" onClick={() => window.location.href = '/api/auth/signin/facebook'} className="btn btn-outline gap-2 text-sm">
                  <FacebookIcon />Facebook
                </button>
                <button type="button" onClick={() => window.location.href = '/api/auth/signin/azure-ad'} className="btn btn-outline gap-2 text-sm">
                  <MicrosoftIcon />Microsoft
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => window.location.href = '/api/auth/signin/github'} className="btn btn-outline gap-2 text-sm">
                  <GithubIcon />GitHub
                </button>
                <button type="button" onClick={() => window.location.href = '/api/auth/signin/apple'} className="btn btn-outline gap-2 text-sm">
                  <AppleIcon />Apple
                </button>
              </div>
            </div>

            <div className="divider text-xs text-base-content/40">Email</div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">{t.auth.register.firstName}</span></label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                    placeholder={t.auth.register.firstPlaceholder} required className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">{t.auth.register.lastName}</span></label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                    placeholder={t.auth.register.lastPlaceholder} required className="input input-bordered w-full" />
                </div>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">{t.auth.register.email}</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder={t.auth.register.emailPlaceholder} required className="input input-bordered w-full" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">{t.auth.register.password}</span></label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password}
                    onChange={handleChange} placeholder="••••••••" required className="input input-bordered w-full pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="bg-info/10 rounded-lg p-4 space-y-1">
                {[{ok: pwChecks.length, label: t.auth.register.check1},{ok: pwChecks.upper, label: t.auth.register.check2},{ok: pwChecks.number, label: t.auth.register.check3}].map(({ ok, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <Check className={`w-4 h-4 ${ok ? 'text-success' : 'text-base-content/30'}`} />
                    <span className={ok ? 'text-base-content' : 'text-base-content/40'}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">{t.auth.register.roleLabel}</span></label>
                <select name="role" value={formData.role} onChange={handleChange} className="select select-bordered w-full">
                  <option value="cliente">{t.auth.register.roleClient}</option>
                  <option value="tecnico">{t.auth.register.roleTech}</option>
                </select>
              </div>
              <button type="submit" disabled={loading || !Object.values(pwChecks).every(Boolean)} className="btn btn-primary w-full">
                {loading ? t.auth.register.submitting : t.auth.register.submit}
              </button>
            </form>

            <p className="text-center text-base-content/60 mt-6">
              {t.auth.register.hasAccount}{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                {t.auth.register.signIn}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
