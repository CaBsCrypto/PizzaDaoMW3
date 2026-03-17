'use client'

import { useLang } from '@/context/LangContext'

export default function AllianceBanner() {
  const { t } = useLang()

  return (
    <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#120D04' }}>
      {/* Borde superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-yellow-400/20" />
      {/* Borde inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-yellow-400/20" />

      {/* Glow de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(250,204,21,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-8">
        {/* Logos grandes */}
        <div className="flex items-center gap-6 md:gap-10">
          <div className="flex flex-col items-center gap-2">
            <img
              src="/assets/logo-pizzadao.png"
              alt="PizzaDAO"
              className="h-16 md:h-20 w-auto"
            />
            <span className="text-white/40 text-xs tracking-widest uppercase">PizzaDAO</span>
          </div>

          <span className="text-yellow-400 font-black text-4xl md:text-5xl leading-none">×</span>

          <div className="flex flex-col items-center gap-2">
            <img
              src="/assets/logo-mw3.png"
              alt="Música Web3"
              className="h-16 md:h-20 w-auto"
              style={{ filter: 'invert(1)' }}
            />
            <span className="text-white/40 text-xs tracking-widest uppercase">Música Web3</span>
          </div>
        </div>

        {/* Subtítulo */}
        <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
          {t.alliance.subtitle}
        </p>

      </div>
    </section>
  )
}
