'use client'

import { useEffect } from 'react'
import { useLang } from '@/context/LangContext'

interface VotingRulesModalProps {
  isOpen: boolean
  onClose: () => void
}

const VOTING_RULES_META = [
  { icon: '👥', color: '#A855F7', glow: 'rgba(168,85,247,0.25)' },
  { icon: '🏆', color: '#FACC15', glow: 'rgba(250,204,21,0.25)' },
  { icon: '📢', color: '#3B82F6', glow: 'rgba(59,130,246,0.25)' },
  { icon: '💰', color: '#22C55E', glow: 'rgba(34,197,94,0.25)'  },
]

export default function VotingRulesModal({ isOpen, onClose }: VotingRulesModalProps) {
  const { t } = useLang()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

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
          style={{ background: 'radial-gradient(circle at top right, rgba(168,85,247,0.12) 0%, transparent 70%)' }} />

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
                    style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-white font-black text-lg leading-none">{t.votingRules.title}</h2>
                <p className="text-white/35 text-xs mt-0.5 font-medium">PizzaDAO × Música W3</p>
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
          {/* REGLAS */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-1.5 h-4 rounded-full bg-purple-400" />
              <span className="text-purple-400 text-[10px] font-black uppercase tracking-widest">{t.votingRules.subtitle}</span>
            </div>

            <div className="flex flex-col gap-2">
              {t.votingRules.items.map((item: string, i: number) => {
                const meta = VOTING_RULES_META[i % VOTING_RULES_META.length]
                return (
                  <div
                    key={i}
                    className="w-full text-left flex items-start gap-3 rounded-2xl p-3.5 transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}
                  >
                    {/* Ícono */}
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
                    <p className="text-sm leading-relaxed pt-1 transition-colors duration-200 text-white/80">
                      {item}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="h-1" />
        </div>

        {/* ── CTA ── */}
        <div className="flex-shrink-0 px-5 pb-6 pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
          <button
            onClick={onClose}
            className="w-full font-black text-base py-4 rounded-2xl transition-all duration-200"
            style={{
              background: 'linear-gradient(90deg, #A855F7 0%, #C084FC 50%, #A855F7 100%)',
              color: '#000',
              boxShadow: '0 4px 24px rgba(168,85,247,0.35)',
              cursor: 'pointer',
            }}
          >
            {t.modal.close}
          </button>
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
