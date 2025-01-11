'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export const NavBar = () => {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Pastebin Clone
        </Link>
        <div className="space-x-4">
          {session ? (
            <>
              <span className="text-gray-600">
                {session.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
} 