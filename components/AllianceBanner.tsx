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
          <a href="https://discord.gg/2MgmN3A2" target="_blank" rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group opacity-80 hover:opacity-100 transition-opacity duration-200">
            <img
              src="/assets/logo-pizzadao.png"
              alt="PizzaDAO"
              className="h-16 md:h-20 w-auto group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.4)] transition-all duration-200"
            />
            <span className="text-white/40 group-hover:text-yellow-400/70 text-xs tracking-widest uppercase transition-colors duration-200">PizzaDAO</span>
          </a>

          <span className="text-yellow-400 font-black text-4xl md:text-5xl leading-none">×</span>

          <a href="https://www.musicaw3.com/" target="_blank" rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group opacity-80 hover:opacity-100 transition-opacity duration-200">
            <img
              src="/assets/logo-mw3.png"
              alt="Música W3"
              className="h-16 md:h-20 w-auto group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.4)] transition-all duration-200"
              style={{ filter: 'invert(1)' }}
            />
            <span className="text-white/40 group-hover:text-yellow-400/70 text-xs tracking-widest uppercase transition-colors duration-200">Música W3</span>
          </a>
        </div>

        {/* Subtítulo */}
        <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
          {t.alliance.subtitle}
        </p>

      </div>
    </section>
  )
}
