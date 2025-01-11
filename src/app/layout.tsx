import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pastebin Clone',
  description: 'A simple pastebin clone built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <nav className="bg-gray-100 p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">Pastebin Clone</Link>
              <div className="space-x-4">
                <Link href="/login" className="hover:underline">Login</Link>
                <Link href="/register" className="hover:underline">Register</Link>
                {/* Add logout functionality */}
              </div>
            </div>
          </nav>
          <main className="min-h-screen bg-white">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}

