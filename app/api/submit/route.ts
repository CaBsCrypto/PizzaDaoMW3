import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const YOUTUBE_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  try {
    const body = await req.json()
    const { artist_name, youtube_url, email, accepted_cc0, lang } = body

    if (!artist_name || !youtube_url || !accepted_cc0) {
      return NextResponse.json({ error: 'missing_required' }, { status: 400 })
    }

    if (!YOUTUBE_REGEX.test(youtube_url)) {
      return NextResponse.json({ error: 'invalid_youtube' }, { status: 400 })
    }

    const { error } = await supabase.from('submissions').insert({
      artist_name: artist_name.trim(),
      youtube_url: youtube_url.trim(),
      email: email?.trim() || null,
      accepted_cc0: true,
      lang: lang || 'es',
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'db_error' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
