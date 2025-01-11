import NextAuth, { NextAuthOptions, DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUser } from '@/lib/db'
import bcrypt from 'bcrypt'
import type { User } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"username" | "password", string> | undefined) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = await getUser(credentials.username)

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return {
            id: user.username,
            name: user.username,
            email: user.username
          } as User
        }

        return null
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

