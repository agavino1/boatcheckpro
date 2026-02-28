'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Anchor, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const navItems = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  const initials = user
    ? `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase()
    : ''

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <Anchor className="w-6 h-6 text-white" />
            </div>
            <span className="gradient-text">BoatCheckPro</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex gap-4 items-center">
            {isAuthenticated && user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {initials}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.firstName}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary text-sm">
                  Get Started
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
          <div className="md:hidden pb-4 border-t border-gray-200">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-2 mt-4">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex-1 text-center py-2 border border-primary-600 text-primary-600 rounded-lg font-medium"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="flex-1 text-center py-2 border border-red-400 text-red-500 rounded-lg font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex-1 text-center py-2 border border-primary-600 text-primary-600 rounded-lg font-medium"
                  >
                    Sign In
                  </Link>
                  <Link href="/register" className="flex-1 btn-primary text-center">
                    Get Started
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
