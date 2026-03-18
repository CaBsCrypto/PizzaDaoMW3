import { NextRequest, NextResponse } from 'next/server'

const YOUTUBE_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/submissions?key=${API_KEY}`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { artist_name, youtube_url, wallet, email, social, telegram, accepted_cc0, lang } = body

    if (!artist_name || !youtube_url || !wallet || !accepted_cc0) {
      return NextResponse.json({ error: 'missing_required' }, { status: 400 })
    }

    if (!YOUTUBE_REGEX.test(youtube_url)) {
      return NextResponse.json({ error: 'invalid_youtube' }, { status: 400 })
    }

    const firestoreDoc = {
      fields: {
        artist_name: { stringValue: artist_name.trim() },
        youtube_url: { stringValue: youtube_url.trim() },
        wallet: { stringValue: wallet.trim() },
        email: { stringValue: email?.trim() || '' },
        social: { stringValue: social?.trim() || '' },
        telegram: { stringValue: telegram?.trim() || '' },
        accepted_cc0: { booleanValue: true },
        lang: { stringValue: lang || 'es' },
        created_at: { timestampValue: new Date().toISOString() },
      },
    }

    const res = await fetch(FIRESTORE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(firestoreDoc),
    })

    if (!res.ok) {
      const err = await res.json()
      console.error('Firestore REST error:', err)
      return NextResponse.json({ error: 'server_error' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
