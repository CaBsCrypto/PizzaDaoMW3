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
      
      <div className="relative max-w-5xl mx-auto px-4 py-4 sm:py-6">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
            {t.rulesNav.title}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-8">
          {/* Botón Postulaciones */}
          <button
            onClick={onBasesClick}
            className="group relative w-full sm:w-64 flex items-center gap-4 bg-yellow-400/5 hover:bg-yellow-400/10 border border-yellow-400/20 hover:border-yellow-400/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.15)] hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 group-hover:scale-110 group-hover:bg-yellow-400/20 transition-all duration-300 text-lg shadow-[0_0_15px_rgba(250,204,21,0.2)]">
              🎤
            </div>
            <div className="text-left">
              <div className="text-white font-black text-lg leading-tight group-hover:text-yellow-400 transition-colors">{t.rulesNav.btnSubmit}</div>
              <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold mt-0.5">Bases</div>
            </div>
            {/* Subtle light effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>

          {/* Botón Votaciones */}
          <button
            onClick={onVotingRulesClick}
            className="group relative w-full sm:w-64 flex items-center gap-4 bg-purple-400/5 hover:bg-purple-400/10 border border-purple-400/20 hover:border-purple-400/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-400/10 border border-purple-400/30 text-purple-400 group-hover:scale-110 group-hover:bg-purple-400/20 transition-all duration-300 text-lg shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              🗳️
            </div>
            <div className="text-left">
              <div className="text-white font-black text-lg leading-tight group-hover:text-purple-400 transition-colors">{t.rulesNav.btnVote}</div>
              <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold mt-0.5">Proceso</div>
            </div>
            {/* Subtle light effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>

        <div className="text-center">
          <p className="text-white/40 text-xs sm:text-sm">
            {t.rulesNav.subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
