import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? 'change-me-in-production',
  callbacks: {
    async signIn({ user, account }) {
      if (!account || !user.email) return false
      try {
        // Exchange OAuth token for our own JWT
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
        // Store our JWT in the session token
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
