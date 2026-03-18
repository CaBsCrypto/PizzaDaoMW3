'use client'

import { useState } from 'react'

interface Submission {
  id: string
  artist_name: string
  youtube_url: string
  wallet: string
  email: string
  social: string
  telegram: string
  lang: string
  accepted_cc0: boolean
  created_at: string
}

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/)
  return match?.[1] || null
}

function formatDate(ts: string) {
  if (!ts) return '—'
  try { return new Date(ts).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }
  catch { return ts }
}

function truncateWallet(w: string) {
  if (!w || w.length <= 12) return w || '—'
  return `${w.slice(0, 6)}...${w.slice(-4)}`
}

function SubmissionCard({ sub }: { sub: Submission }) {
  const ytId = getYouTubeId(sub.youtube_url)
  const thumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null
  const [copied, setCopied] = useState(false)

  const copyWallet = () => {
    navigator.clipboard.writeText(sub.wallet)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const shareText = `🎵 "${sub.artist_name}" postula al concurso PizzaDAO × Música Web3\n🍕 $350 en premios · Canción en español · CC0\n`
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(sub.youtube_url)}`

  return (
    <div className="rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
      style={{ background: 'linear-gradient(160deg, #0F0A02 0%, #1A1208 60%, #0A0A0F 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>

      <div className="relative w-full aspect-video bg-black/60 overflow-hidden">
        {thumbnail
          ? <img src={thumbnail} alt={sub.artist_name} className="w-full h-full object-cover opacity-80" />
          : <div className="w-full h-full flex items-center justify-center text-5xl bg-black/40">🎵</div>
        }
        <a href={sub.youtube_url} target="_blank" rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center group">
          <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
            style={{ background: 'rgba(250,204,21,0.92)', boxShadow: '0 0 30px rgba(250,204,21,0.5)' }}>
            <span className="text-black text-xl ml-1">▶</span>
          </div>
        </a>
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-black text-black" style={{ background: '#FACC15' }}>
          {sub.lang.toUpperCase()}
        </div>
        <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-black ${sub.accepted_cc0 ? 'text-green-900' : 'text-red-900'}`}
          style={{ background: sub.accepted_cc0 ? '#86efac' : '#fca5a5' }}>
          CC0 {sub.accepted_cc0 ? '✓' : '✗'}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-white font-black text-base leading-tight">{sub.artist_name || '—'}</h3>
          <p className="text-white/30 text-xs mt-0.5">{formatDate(sub.created_at)}</p>
        </div>

        <button onClick={copyWallet}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all hover:bg-white/5 w-full"
          style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          <span className="text-white/40 text-xs font-mono flex-1 truncate">{truncateWallet(sub.wallet)}</span>
          <span className="text-[10px] font-black flex-shrink-0" style={{ color: copied ? '#86efac' : '#FACC15' }}>
            {copied ? '✓ OK' : 'COPIAR'}
          </span>
        </button>

        {sub.email && <p className="text-white/25 text-xs px-1 truncate">📧 {sub.email}</p>}
        {sub.telegram && (
          <a href={`https://t.me/${sub.telegram.replace(/^@/, '')}`} target="_blank" rel="noopener noreferrer"
            className="text-blue-400/60 hover:text-blue-400 text-xs px-1 truncate flex items-center gap-1 transition-colors">
            ✈ {sub.telegram.startsWith('@') ? sub.telegram : `@${sub.telegram}`}
          </a>
        )}
        {sub.social && (
          <p className="text-white/25 text-xs px-1 truncate">🔗 {sub.social}</p>
        )}

        <div className="flex gap-2 mt-auto pt-1">
          <a href={sub.youtube_url} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black text-black transition-all hover:scale-105"
            style={{ background: 'linear-gradient(90deg, #FACC15, #FDE68A)' }}>
            ▶ Ver video
          </a>
          <a href={twitterLink} target="_blank" rel="noopener noreferrer" title="Compartir en X"
            className="flex items-center justify-center w-10 h-10 rounded-xl text-white text-sm font-black transition-all hover:scale-105"
            style={{ background: 'rgba(29,161,242,0.12)', border: '1px solid rgba(29,161,242,0.25)' }}>
            𝕏
          </a>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [submissions, setSubmissions] = useState<Submission[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/admin?password=${encodeURIComponent(password)}`)
      const data = await res.json()
      if (res.ok) {
        setSubmissions(data.submissions)
      } else {
        setError('Contraseña incorrecta')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  const refresh = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin?password=${encodeURIComponent(password)}`)
      const data = await res.json()
      if (res.ok) setSubmissions(data.submissions)
    } finally {
      setLoading(false)
    }
  }

  if (submissions === null) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
        style={{ background: 'linear-gradient(135deg, #08060F 0%, #0F0A02 50%, #08060F 100%)' }}>
        <div className="w-full max-w-sm rounded-2xl p-8 flex flex-col gap-6"
          style={{ background: 'linear-gradient(160deg, #0F0A02, #1A1208)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="text-center">
            <div className="text-5xl mb-3">🍕</div>
            <h1 className="text-white font-black text-xl">Admin Panel</h1>
            <p className="text-white/30 text-sm mt-1">PizzaDAO × Música Web3</p>
          </div>
          <form onSubmit={login} className="flex flex-col gap-3">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              autoFocus
            />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-black text-black text-sm transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(90deg, #FACC15, #FDE68A)' }}>
              {loading ? 'Cargando...' : 'Entrar →'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 md:p-10"
      style={{ background: 'linear-gradient(135deg, #08060F 0%, #0F0A02 50%, #08060F 100%)' }}>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-white font-black text-2xl">🍕 Admin Panel</h1>
          <p className="text-white/30 text-xs mt-0.5">PizzaDAO × Música Web3</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl font-black text-sm"
            style={{ background: 'rgba(250,204,21,0.12)', border: '1px solid rgba(250,204,21,0.25)', color: '#FACC15' }}>
            {submissions.length} postulación{submissions.length !== 1 ? 'es' : ''}
          </div>
          <button onClick={refresh} disabled={loading}
            className="px-4 py-2 rounded-xl text-white/40 text-sm hover:text-white transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            {loading ? '...' : '↻ Actualizar'}
          </button>
          <button onClick={() => setSubmissions(null)}
            className="px-4 py-2 rounded-xl text-white/25 text-sm hover:text-red-400 transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            salir
          </button>
        </div>
      </div>

      {submissions.length === 0
        ? <div className="text-center py-24 text-white/20 text-lg">No hay postulaciones aún 🎵</div>
        : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {submissions.map(sub => <SubmissionCard key={sub.id} sub={sub} />)}
          </div>
      }
    </div>
  )
}
