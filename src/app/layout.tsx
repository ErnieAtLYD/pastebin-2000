import './globals.css'
import { Inter } from 'next/font/google'
import { NavBar } from '@/components/NavBar'
import { Providers } from '@/components/Providers'

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
    <html lang="en" data-lt-installed="true">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          <main className="min-h-screen bg-white">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}

