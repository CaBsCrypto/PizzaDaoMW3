import { NextRequest, NextResponse } from 'next/server'

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export async function GET(req: NextRequest) {
  const password = req.nextUrl.searchParams.get('password')

  if (!password || password.trim() !== (ADMIN_PASSWORD || '').trim()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/submissions?key=${API_KEY}&pageSize=200&orderBy=created_at desc`
    const res = await fetch(url)
    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: 'firestore_error', detail: data }, { status: 500 })
    }

    const submissions = (data.documents || []).map((doc: { name: string; fields?: Record<string, { stringValue?: string; booleanValue?: boolean; timestampValue?: string }> }) => {
      const f = doc.fields || {}
      return {
        id: doc.name.split('/').pop(),
        artist_name: f.artist_name?.stringValue || '',
        youtube_url: f.youtube_url?.stringValue || '',
        wallet: f.wallet?.stringValue || '',
        email: f.email?.stringValue || '',
        social: f.social?.stringValue || '',
        telegram: f.telegram?.stringValue || '',
        lang: f.lang?.stringValue || 'es',
        accepted_cc0: f.accepted_cc0?.booleanValue || false,
        created_at: f.created_at?.timestampValue || f.created_at?.stringValue || '',
      }
    })

    return NextResponse.json({ submissions }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
