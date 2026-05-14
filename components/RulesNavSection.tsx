'use client'

import { useLang } from '@/context/LangContext'

interface RulesNavSectionProps {
  onBasesClick: () => void
  onVotingRulesClick: () => void
}

export default function RulesNavSection({ onBasesClick, onVotingRulesClick }: RulesNavSectionProps) {
  const { t } = useLang()

  return (
    <section className="relative w-full border-y border-white/5 bg-[#0F0A02] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      <div className="relative max-w-5xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            {t.rulesNav.title}
          </h2>
          <p className="text-white/50 text-sm sm:text-base">
            {t.rulesNav.subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {/* Botón Postulaciones */}
          <button
            onClick={onBasesClick}
            className="group relative w-full sm:w-auto flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-400/50 rounded-2xl p-4 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
              🎤
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg">{t.rulesNav.btnSubmit}</div>
              <div className="text-white/40 text-xs">Bases del concurso</div>
            </div>
          </button>

          {/* Botón Votaciones */}
          <button
            onClick={onVotingRulesClick}
            className="group relative w-full sm:w-auto flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 rounded-2xl p-4 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-400/10 border border-purple-400/30 text-purple-400 group-hover:scale-110 transition-transform duration-300">
              🗳️
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg">{t.rulesNav.btnVote}</div>
              <div className="text-white/40 text-xs">Proceso de elección</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
