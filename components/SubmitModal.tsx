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
  const [wallet, setWallet] = useState('')
  const [social, setSocial] = useState('')
  const [telegram, setTelegram] = useState('')
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
    setWallet('')
    setSocial('')
    setTelegram('')
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

    if (!artistName.trim() || !youtubeUrl.trim() || !wallet.trim() || !email.trim() || !social.trim() || !acceptedCC0) {
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
        body: JSON.stringify({ artist_name: artistName, youtube_url: youtubeUrl, email, wallet, social, telegram, accepted_cc0: acceptedCC0, lang }),
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
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ zIndex: 99999 }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-lg" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md max-h-[95dvh] sm:max-h-[90dvh] flex flex-col rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden shadow-2xl"
        style={{ background: 'linear-gradient(160deg, #0F0A02 0%, #1A1208 40%, #0A0A0F 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>

        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(250,204,21,0.10) 0%, transparent 70%)' }} />

        {/* Header */}
        <div className="relative flex-shrink-0 px-6 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/10 rounded-full sm:hidden" />
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #FACC15, #F59E0B)', boxShadow: '0 0 16px rgba(250,204,21,0.3)' }}>
                🎵
              </div>
              <div>
                <h2 className="text-white font-black text-lg leading-none">{t.modal.title}</h2>
                <p className="text-white/35 text-xs mt-0.5">PizzaDAO × Música W3</p>
              </div>
            </div>
            <button onClick={handleClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all text-xl leading-none">
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center text-center py-16 px-8 gap-4">
              <div className="text-6xl">🎉</div>
              <h3 className="text-white font-black text-xl">{t.modal.success}</h3>
              <p className="text-white/40 text-sm">PizzaDAO × Música W3</p>
              <button
                onClick={handleClose}
                className="mt-4 font-black text-black px-8 py-3 rounded-2xl transition-all hover:scale-105"
                style={{ background: 'linear-gradient(90deg, #FACC15, #FDE68A, #FACC15)', boxShadow: '0 4px 20px rgba(250,204,21,0.3)' }}
              >
                {t.modal.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-5">

              {/* Artist name */}
              <div>
                <label className="block text-white/50 text-[10px] font-black uppercase tracking-widest mb-1.5">
                  {t.modal.artistLabel} <span className="text-yellow-400">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  placeholder={t.modal.artistPlaceholder}
                  className="w-full rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(250,204,21,0.5)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}
                />
              </div>

              {/* YouTube URL */}
              <div>
                <label className="block text-white/50 text-[10px] font-black uppercase tracking-widest mb-1.5">
                  {t.modal.youtubeLabel} <span className="text-yellow-400">*</span>
                </label>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder={t.modal.youtubePlaceholder}
                  className="w-full rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(250,204,21,0.5)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}
                />
              </div>

              {/* Wallet */}
              <div>
                <label className="block text-white/50 text-[10px] font-black uppercase tracking-widest mb-1.5">
                  {t.modal.walletLabel} <span className="text-yellow-400">*</span>
                </label>
                <input
                  type="text"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  placeholder={t.modal.walletPlaceholder}
                  className="w-full rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none transition-colors font-mono"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(250,204,21,0.5)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}
                />
                <p className="text-white/25 text-[10px] mt-1 px-1">{t.modal.walletHint}</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/50 text-[10px] font-black uppercase tracking-widest mb-1.5">
                  {t.modal.emailLabel} <span className="text-yellow-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.modal.emailPlaceholder}
                  className="w-full rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(250,204,21,0.5)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}
                />
              </div>

              {/* Divider — contacto */}
              <div className="flex items-center gap-2 -mb-1">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <span className="text-white/20 text-[9px] font-black uppercase tracking-widest">{t.modal.contactSection}</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>

              {/* Red social */}
              <div>
                <label className="block text-white/50 text-[10px] font-black uppercase tracking-widest mb-1.5">
                  {t.modal.socialLabel} <span className="text-yellow-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 text-sm select-none">🔗</span>
                  <input
                    type="text"
                    value={social}
                    onChange={(e) => setSocial(e.target.value)}
                    placeholder={t.modal.socialPlaceholder}
                    className="w-full rounded-xl pl-9 pr-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(250,204,21,0.5)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}
                  />
                </div>
              </div>

              {/* Telegram */}
              <div>
                <label className="block text-white/50 text-[10px] font-black uppercase tracking-widest mb-1.5">
                  {t.modal.telegramLabel}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 text-sm select-none font-black">✈</span>
                  <input
                    type="text"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    placeholder={t.modal.telegramPlaceholder}
                    className="w-full rounded-xl pl-9 pr-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(250,204,21,0.5)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}
                  />
                </div>
              </div>

              {/* CC0 checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group rounded-xl p-3 transition-colors"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="relative flex-shrink-0 mt-0.5">
                  <input type="checkbox" checked={acceptedCC0} onChange={(e) => setAcceptedCC0(e.target.checked)} className="sr-only" />
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${acceptedCC0 ? 'border-yellow-400' : 'border-white/20'}`}
                    style={{ background: acceptedCC0 ? '#FACC15' : 'transparent', boxShadow: acceptedCC0 ? '0 0 10px rgba(250,204,21,0.4)' : 'none' }}>
                    {acceptedCC0 && <span className="text-black text-xs font-black">✓</span>}
                  </div>
                </div>
                <span className="text-white/55 text-xs leading-relaxed">{t.modal.cc0Label}</span>
              </label>

              {/* Error */}
              {errorMsg && (
                <div className="rounded-xl px-4 py-3 text-red-400 text-sm"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
                  {errorMsg}
                </div>
              )}

              <div className="h-1" />
            </form>
          )}
        </div>

        {/* CTA fixed bottom */}
        {status !== 'success' && (
          <div className="flex-shrink-0 px-6 pb-6 pt-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="w-full font-black text-black text-base py-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              style={{ background: 'linear-gradient(90deg, #FACC15 0%, #FDE68A 50%, #FACC15 100%)', boxShadow: '0 4px 24px rgba(250,204,21,0.35)' }}
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  {t.modal.submitting}
                </span>
              ) : `🎵 ${t.modal.submit}`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
