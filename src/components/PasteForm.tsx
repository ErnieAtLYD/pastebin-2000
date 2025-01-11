'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function PasteForm() {
  const [content, setContent] = useState('')
  const [expiresIn, setExpiresIn] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/pastes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, expiresIn, isPrivate }),
    })
    const data = await response.json()
    if (data.id) {
      router.push(`/paste/${data.id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-64 p-2 border border-gray-300 rounded"
        placeholder="Paste your content here..."
        required
      />
      <div className="flex space-x-4">
        <select
          value={expiresIn}
          onChange={(e) => setExpiresIn(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Never expires</option>
          <option value="3600">1 hour</option>
          <option value="86400">1 day</option>
          <option value="604800">1 week</option>
        </select>
        {session && (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="form-checkbox"
            />
            <span>Private</span>
          </label>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Paste
      </button>
    </form>
  )
}

