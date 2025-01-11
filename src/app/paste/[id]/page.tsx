import { getPaste } from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function PastePage({ params }: { params: { id: string } }) {
  const paste = await getPaste(params.id)

  if (!paste) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Paste {params.id}</h1>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{paste.content}</pre>
    </div>
  )
}

