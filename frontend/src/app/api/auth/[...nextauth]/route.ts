import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import FacebookProvider from 'next-auth/providers/facebook'
import AzureADProvider from 'next-auth/providers/azure-ad'
import AppleProvider from 'next-auth/providers/apple'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

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
      if (!account || !user.email) return false
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
        if (!res.ok) return false
        const data = await res.json()
        ;(user as any).appToken = data.token
        ;(user as any).appUser = data.user
        return true
      } catch {
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
