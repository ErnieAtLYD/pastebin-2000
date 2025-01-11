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
        setPastes(data)
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
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Pastes</h2>
        <div className="animate-pulse space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="block p-3 border rounded">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Pastes</h2>
        <div className="p-4 text-red-500 bg-red-50 rounded-md border border-red-200">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Pastes</h2>
      <div className="space-y-2">
        {pastes.length === 0 ? (
          <div className="p-4 text-gray-500 bg-gray-50 rounded-md border">
            No recent pastes found
          </div>
        ) : (
          pastes.map((paste) => (
            <Link
              key={paste.id}
              href={`/paste/${paste.id}`}
              className="block p-3 border rounded hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium truncate">
                {paste.preview || 'Untitled'}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(paste.created_at).toLocaleDateString()}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

