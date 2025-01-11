import { NextResponse } from 'next/server'
import { createPaste, getRecentPastes } from '@/lib/db'
import crypto from 'crypto'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(request: Request) {
  const { content, expiresIn, isPrivate } = await request.json()
  
  if (!content) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 })
  }

  const id = crypto.randomBytes(4).toString('hex')

  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  let expiresAt = null
  if (expiresIn) {
    expiresAt = new Date(Date.now() + parseInt(expiresIn) * 1000).toISOString()
  }

  await createPaste(id, content, expiresAt, userId, isPrivate)

  return NextResponse.json({ id })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '10')

  const pastes = await getRecentPastes(limit)

  return NextResponse.json(pastes)
}

