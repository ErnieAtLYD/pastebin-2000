'use client'

import { useEffect, useState } from 'react'
import { Paste } from '@/types/paste'
import Link from 'next/link'

export const RecentPastes = () => {
  const [pastes, setPastes] = useState<Paste[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPastes = async () => {
      try {
        const response = await fetch('/api/pastes?limit=5')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setPastes(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Error fetching pastes:', err)
        setError('Failed to load recent pastes')
      } finally {
        setLoading(false)
      }
    }

    fetchPastes()
  }, [])

  if (loading) {
    return <div className="p-4">Loading recent pastes...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>
  }

  if (pastes.length === 0) {
    return <div className="p-4">No recent pastes found</div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Pastes</h2>
      <div className="space-y-2">
        {pastes.map((paste) => (
          <Link
            key={paste.id}
            href={`/paste/${paste.id}`}
            className="block p-3 border rounded hover:bg-gray-50"
          >
            <div className="font-medium">{paste.preview || 'Untitled'}</div>
            <div className="text-sm text-gray-500">
              {new Date(paste.created_at).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

