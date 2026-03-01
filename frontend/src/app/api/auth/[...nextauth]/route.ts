import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import FacebookProvider from 'next-auth/providers/facebook'
import AzureADProvider from 'next-auth/providers/azure-ad'
import AppleProvider from 'next-auth/providers/apple'

// Use BACKEND_API_URL (server-only) or fall back to NEXT_PUBLIC_API_URL, then hardcoded production URL
const API_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'https://boatcheckpro-api-63992085028.europe-west1.run.app'

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID ?? '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
  }),
  ...(process.env.FACEBOOK_CLIENT_ID ? [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
    }),
  ] : []),
  ...(process.env.AZURE_AD_CLIENT_ID ? [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? '',
      tenantId: process.env.AZURE_AD_TENANT_ID ?? 'common',
    }),
  ] : []),
  ...(process.env.APPLE_ID ? [
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET ?? '',
    }),
  ] : []),
]

const handler = NextAuth({
  providers,
  secret: process.env.NEXTAUTH_SECRET ?? 'change-me-in-production',
  callbacks: {
    async signIn({ user, account }) {
      if (!account || !user.email) {
        console.error('[NextAuth] signIn: missing account or email', { account: !!account, email: user.email })
        return false
      }
      console.log('[NextAuth] signIn: calling backend', `${API_URL}/api/auth/oauth`, { provider: account.provider, email: user.email })
      try {
        const res = await fetch(`${API_URL}/api/auth/oauth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: account.provider,
            email: user.email,
            name: user.name ?? '',
            providerId: account.providerAccountId,
          }),
        })
        if (!res.ok) {
          const body = await res.text().catch(() => '(no body)')
          console.error('[NextAuth] Backend OAuth error:', res.status, body)
          return false
        }
        const data = await res.json()
        ;(user as any).appToken = data.token
        ;(user as any).appUser = data.user
        console.log('[NextAuth] signIn: success for', user.email)
        return true
      } catch (err) {
        console.error('[NextAuth] signIn fetch error:', err)
        return false
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.appToken = (user as any).appToken
        token.appUser = (user as any).appUser
      }
      return token
    },
    async session({ session, token }) {
      ;(session as any).appToken = token.appToken
      ;(session as any).appUser = token.appUser
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
})

export { handler as GET, handler as POST }
