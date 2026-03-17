'use client'

import { useState, useEffect, useRef } from 'react'
import { useLang } from '@/context/LangContext'

interface SubmitModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SubmitModal({ isOpen, onClose }: SubmitModalProps) {
  const { t, lang } = useLang()
  const [artistName, setArtistName] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [email, setEmail] = useState('')
  const [acceptedCC0, setAcceptedCC0] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const reset = () => {
    setArtistName('')
    setYoutubeUrl('')
    setEmail('')
    setAcceptedCC0(false)
    setStatus('idle')
    setErrorMsg('')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!artistName.trim() || !youtubeUrl.trim() || !acceptedCC0) {
      setErrorMsg(t.modal.errorRequired)
      return
    }

    const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/
    if (!ytRegex.test(youtubeUrl)) {
      setErrorMsg(t.modal.errorYoutube)
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artist_name: artistName, youtube_url: youtubeUrl, email, accepted_cc0: acceptedCC0, lang }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json()
        if (data.error === 'invalid_youtube') setErrorMsg(t.modal.errorYoutube)
        else setErrorMsg(t.modal.errorGeneral)
        setStatus('error')
      }
    } catch {
      setErrorMsg(t.modal.errorGeneral)
      setStatus('error')
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/60">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors text-2xl leading-none"
          aria-label={t.modal.close}
        >
          ×
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black text-lg">
            🎵
          </div>
          <h2 className="text-white font-black text-xl">{t.modal.title}</h2>
        </div>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-white font-bold text-lg">{t.modal.success}</p>
            <button
              onClick={handleClose}
              className="mt-6 bg-yellow-400 text-black font-bold px-6 py-2 rounded-full hover:bg-yellow-300 transition-colors"
            >
              {t.modal.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Artist name */}
            <div>
              <label className="block text-white/70 text-xs font-bold uppercase tracking-wider mb-2">
                {t.modal.artistLabel} <span className="text-yellow-400">*</span>
              </label>
              <input
                ref={firstInputRef}
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder={t.modal.artistPlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-yellow-400/60 transition-colors"
              />
            </div>

            {/* YouTube URL */}
            <div>
              <label className="block text-white/70 text-xs font-bold uppercase tracking-wider mb-2">
                {t.modal.youtubeLabel} <span className="text-yellow-400">*</span>
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder={t.modal.youtubePlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-yellow-400/60 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/70 text-xs font-bold uppercase tracking-wider mb-2">
                {t.modal.emailLabel}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.modal.emailPlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-yellow-400/60 transition-colors"
              />
            </div>

            {/* CC0 checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={acceptedCC0}
                  onChange={(e) => setAcceptedCC0(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${acceptedCC0 ? 'bg-yellow-400 border-yellow-400' : 'border-white/30 group-hover:border-yellow-400/50'}`}>
                  {acceptedCC0 && <span className="text-black text-xs font-black">✓</span>}
                </div>
              </div>
              <span className="text-white/60 text-sm leading-relaxed">{t.modal.cc0Label}</span>
            </label>

            {/* Error message */}
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                {errorMsg}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-yellow-400 text-black font-black py-3 rounded-xl hover:bg-yellow-300 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 text-sm"
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  {t.modal.submitting}
                </span>
              ) : t.modal.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
