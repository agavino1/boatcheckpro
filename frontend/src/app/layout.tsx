import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextAuthProvider from '@/components/NextAuthProvider'
import { AuthProvider } from '@/context/AuthContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CheckThatBoat - Professional Boat Inspection Platform',
  description:
    'Streamline your boat inspection process with our professional SaaS platform. Fast, reliable, and transparent inspection reports.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <AuthProvider>
                <Navbar />
                {children}
                <Footer />
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
