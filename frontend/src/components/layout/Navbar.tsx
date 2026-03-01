'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import BrandIcon from '@/components/BrandIcon'
import { Language, languageNames } from '@/i18n'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const { lang, setLang, t } = useLanguage()
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navItems = [
    { label: t.nav.howItWorks, href: '#how-it-works' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.pricing, href: '#pricing' },
    { label: t.nav.faq, href: '#faq' },
  ]

  const initials = user
    ? `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase()
    : ''

  return (
    <nav className="fixed top-0 w-full bg-base-100/80 backdrop-blur-md z-50 border-b border-base-300">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <BrandIcon className="w-6 h-6 text-primary-content" />
            </div>
            <span className="gradient-text">CheckThatBoat</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base-content/70 hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right side controls */}
          <div className="hidden md:flex gap-3 items-center">
            {/* Language selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-base-content/70 hover:text-primary hover:bg-base-200 transition-colors"
              >
                {languageNames[lang]}
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-base-100 border border-base-300 rounded-xl shadow-xl z-50 overflow-hidden">
                  {(Object.keys(languageNames) as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false) }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-base-200 transition-colors ${lang === l ? 'text-primary font-bold' : 'text-base-content'}`}
                    >
                      {languageNames[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth buttons */}
            {isAuthenticated && user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {t.nav.dashboard}
                </Link>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-content font-bold text-xs">
                    {initials}
                  </div>
                  <span className="text-sm font-medium text-base-content">{user.firstName}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-sm text-error hover:text-error/80 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  {t.nav.signOut}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-base-content/70 hover:text-primary transition-colors font-medium"
                >
                  {t.nav.signIn}
                </Link>
                <Link href="/register" className="btn btn-primary btn-sm">
                  {t.nav.getStarted}
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-base-300">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-base-content/70 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            {/* Mobile language */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {(Object.keys(languageNames) as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 text-xs rounded-lg border ${lang === l ? 'border-primary text-primary font-bold' : 'border-base-300 text-base-content/60'}`}
                >
                  {languageNames[l]}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex-1 text-center py-2 border border-primary text-primary rounded-lg font-medium"
                  >
                    {t.nav.dashboard}
                  </Link>
                  <button
                    onClick={logout}
                    className="flex-1 text-center py-2 border border-error text-error rounded-lg font-medium"
                  >
                    {t.nav.signOut}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex-1 text-center py-2 border border-primary text-primary rounded-lg font-medium"
                  >
                    {t.nav.signIn}
                  </Link>
                  <Link href="/register" className="flex-1 btn btn-primary text-center">
                    {t.nav.getStarted}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
