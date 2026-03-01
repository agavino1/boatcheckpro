'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { setToken } from '@/lib/api'

export default function OAuthSuccessPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (status === 'authenticated' && session) {
      const appToken = (session as any).appToken
      const appUser = (session as any).appUser

      if (appToken && appUser) {
        setToken(appToken)
        localStorage.setItem('bcp_user', JSON.stringify(appUser))
      }
      router.replace('/dashboard')
    } else {
      router.replace('/login?error=oauth')
    }
  }, [session, status, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  )
}
