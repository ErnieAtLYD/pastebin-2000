'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Paste {
  id: string
  preview: string
  created_at: string
}

export default function RecentPastes() {
  const [pastes, setPastes] = useState<Paste[]>([])

  useEffect(() => {
    fetch('/api/pastes?limit=5')
      .then(res => res.json())
      .then(data => setPastes(data))
  }, [])

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Recent Public Pastes</h2>
      <ul className="space-y-2">
        {pastes.map(paste => (
          <li key={paste.id} className="border p-2 rounded">
            <Link href={`/paste/${paste.id}`} className="hover:underline">
              <span className="font-medium">{paste.id}</span>: {paste.preview}...
            </Link>
            <span className="text-sm text-gray-500 ml-2">
              {new Date(paste.created_at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

