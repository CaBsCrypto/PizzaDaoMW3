'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/context/LangContext'

interface BasesModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitClick: () => void
}

const RULES_META = [
  { icon: '🎤', color: '#A855F7', glow: 'rgba(168,85,247,0.25)' },
  { icon: '🍕', color: '#EF4444', glow: 'rgba(239,68,68,0.25)'  },
  { icon: '🔗', color: '#3B82F6', glow: 'rgba(59,130,246,0.25)' },
  { icon: '©️', color: '#22C55E', glow: 'rgba(34,197,94,0.25)'  },
  { icon: '👥', color: '#F59E0B', glow: 'rgba(245,158,11,0.25)' },
  { icon: '🏆', color: '#FACC15', glow: 'rgba(250,204,21,0.25)' },
  { icon: '💰', color: '#34D399', glow: 'rgba(52,211,153,0.25)' },
  { icon: '📅', color: '#60A5FA', glow: 'rgba(96,165,250,0.25)' },
  { icon: '⚖️', color: '#EC4899', glow: 'rgba(236,72,153,0.25)' },
]

export default function BasesModal({ isOpen, onClose, onSubmitClick }: BasesModalProps) {
  const { t } = useLang()
  const [activeRule, setActiveRule] = useState<number | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setActiveRule(null)
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = () => {
    onClose()
    setTimeout(() => onSubmitClick(), 220)
  }

  return (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center" style={{ zIndex: 99998 }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-lg"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-lg max-h-[95dvh] sm:max-h-[90dvh] flex flex-col rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden shadow-2xl"
        style={{ background: 'linear-gradient(160deg, #0F0A02 0%, #1A1208 40%, #0A0A0F 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>

        {/* Glow top-right */}
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(250,204,21,0.12) 0%, transparent 70%)' }} />

        {/* ── HEADER ── */}
        <div className="relative flex-shrink-0 px-6 pt-5 pb-4">
          {/* handle bar móvil */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/10 rounded-full sm:hidden" />

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-3">
              {/* Vinyl giratorio */}
              <div className="relative w-11 h-11 flex-shrink-0">
                <div className="w-full h-full rounded-full vinyl-hdr"
                  style={{ background: 'conic-gradient(from 0deg, #18181b, #3f3f46, #18181b, #3f3f46)', border: '2px solid rgba(255,255,255,0.08)' }}>
                  {[85,68,52,38].map(s => (
                    <div key={s} className="absolute inset-0 m-auto rounded-full" style={{ width:`${s}%`, height:`${s}%`, border:'1px solid rgba(255,255,255,0.04)' }} />
                  ))}
                  <div className="absolute inset-0 m-auto w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #dc2626, #f59e0b)' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-white font-black text-lg leading-none">{t.rules.title}</h2>
                <p className="text-white/35 text-xs mt-0.5 font-medium">PizzaDAO × Música Web3</p>
              </div>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all text-xl leading-none">
              ×
            </button>
          </div>
        </div>

        {/* ── SCROLL ── */}
        <div className="flex-1 overflow-y-auto px-5 pb-2 space-y-5">

          {/* PREMIOS */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="px-4 py-2.5 flex items-center justify-between"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <span className="text-yellow-400 text-[10px] font-black uppercase tracking-widest">{t.prizes.subtitle}</span>
              <span className="text-yellow-400 font-black text-sm">{t.prizes.total}</span>
            </div>

            <div className="p-3 grid grid-cols-3 gap-2">
              {[
                { emoji:'🥇', label: t.prizes.first,  amount: t.prizes.amount1, accent:'#FACC15', shadow:'rgba(250,204,21,0.3)',  scale: true  },
                { emoji:'🥈', label: t.prizes.second, amount: t.prizes.amount2, accent:'#94A3B8', shadow:'rgba(148,163,184,0.2)', scale: false },
                { emoji:'🥉', label: t.prizes.third,  amount: t.prizes.amount3, accent:'#FB923C', shadow:'rgba(251,146,60,0.2)',  scale: false },
              ].map((p) => (
                <div key={p.label}
                  className={`relative flex flex-col items-center gap-1 rounded-xl p-3 text-center transition-transform duration-200 ${p.scale ? 'scale-105' : ''}`}
                  style={{ background: `linear-gradient(160deg, ${p.accent}18 0%, transparent 70%)`, border: `1px solid ${p.accent}30`, boxShadow: p.scale ? `0 0 20px ${p.shadow}` : 'none' }}>
                  {p.scale && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[8px] font-black text-black"
                      style={{ background: p.accent }}>TOP</div>
                  )}
                  <div className="text-2xl">{p.emoji}</div>
                  <div className="font-black text-lg leading-none" style={{ color: p.accent }}>{p.amount}</div>
                  <div className="text-white/35 text-[8px] uppercase tracking-wider">USDC</div>
                  <div className="text-white/50 text-[9px] font-medium">{p.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* REGLAS */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-1.5 h-4 rounded-full bg-green-400" />
              <span className="text-green-400 text-[10px] font-black uppercase tracking-widest">Bases del concurso</span>
            </div>

            <div className="flex flex-col gap-2">
              {t.rules.items.map((item: string, i: number) => {
                const meta = RULES_META[i]
                const isActive = activeRule === i
                return (
                  <button
                    key={i}
                    onClick={() => setActiveRule(isActive ? null : i)}
                    className="w-full text-left flex items-start gap-3 rounded-2xl p-3.5 transition-all duration-200"
                    style={{
                      background: isActive ? `${meta.color}15` : 'rgba(255,255,255,0.025)',
                      border: `1px solid ${isActive ? meta.color + '50' : 'rgba(255,255,255,0.06)'}`,
                      boxShadow: isActive ? `0 0 18px ${meta.glow}` : 'none',
                    }}
                  >
                    {/* Número + icono */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
                        style={{ background: `${meta.color}22`, border: `1px solid ${meta.color}40` }}>
                        {meta.icon}
                      </div>
                      <span className="text-[9px] font-black font-mono" style={{ color: meta.color + 'AA' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    {/* Texto */}
                    <p className="text-sm leading-relaxed pt-1 transition-colors duration-200"
                      style={{ color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.6)' }}>
                      {item}
                    </p>
                    {/* Chevron */}
                    <div className="flex-shrink-0 ml-auto pt-1 text-white/20 text-xs transition-transform duration-200"
                      style={{ transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)', color: isActive ? meta.color : undefined }}>
                      ›
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* CC0 badge */}
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.18)' }}>
            <span className="text-xl">🌐</span>
            <p className="text-green-400/60 text-xs leading-relaxed">{t.footer.cc0} — {t.footer.rights}</p>
          </div>

          <div className="h-1" />
        </div>

        {/* ── CTA ── */}
        <div className="flex-shrink-0 px-5 pb-6 pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
          {/* Deadline badge */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 bg-red-500/15 border border-red-500/30 rounded-full px-3 py-1">
              <span className="text-red-400 text-xs font-black">{t.deadline.badge}</span>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full font-black text-black text-base py-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'linear-gradient(90deg, #FACC15 0%, #FDE68A 50%, #FACC15 100%)', backgroundSize: '200% 100%', boxShadow: '0 4px 24px rgba(250,204,21,0.35)' }}
          >
            🎵 {t.nav.submit} →
          </button>
          <p className="text-white/20 text-[10px] text-center mt-2 tracking-wide">{t.vinyl.subtitle}</p>
        </div>
      </div>

      <style jsx>{`
        .vinyl-hdr {
          animation: vinylHdr 6s linear infinite;
        }
        @keyframes vinylHdr {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
