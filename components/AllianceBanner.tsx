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

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
        
        {/* Izquierda: Alianza PizzaDAO x MW3 */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 md:w-1/2">
          <div className="flex items-center gap-6">
            <a href="https://discord.gg/2MgmN3A2" target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group opacity-80 hover:opacity-100 transition-opacity duration-200">
              <img
                src="/assets/logo-pizzadao.png"
                alt="PizzaDAO"
                className="h-12 md:h-16 w-auto group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.4)] transition-all duration-200"
              />
              <span className="text-white/40 group-hover:text-yellow-400/70 text-[10px] tracking-widest uppercase transition-colors duration-200">PizzaDAO</span>
            </a>

            <div className="flex items-center justify-center pb-5">
              <span className="text-yellow-400 font-black text-3xl md:text-4xl leading-none">×</span>
            </div>

            <a href="https://www.musicaw3.com/" target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group opacity-80 hover:opacity-100 transition-opacity duration-200">
              <img
                src="/assets/logo-mw3.png"
                alt="Música W3"
                className="h-12 md:h-16 w-auto group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.4)] transition-all duration-200"
                style={{ filter: 'invert(1)' }}
              />
              <span className="text-white/40 group-hover:text-yellow-400/70 text-[10px] tracking-widest uppercase transition-colors duration-200">Música W3</span>
            </a>
          </div>

          <p className="text-white/70 text-sm md:text-base max-w-md leading-relaxed">
            {t.alliance.subtitle}
          </p>
        </div>

        {/* Derecha: Agradecimiento a Meta Pool */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4 md:w-1/2 relative">
          <span className="text-white/40 text-xs tracking-[0.2em] uppercase font-bold">
            Evento posible gracias a
          </span>
          
          <a href="https://metapool.app/" target="_blank" rel="noopener noreferrer" 
            className="group relative opacity-90 hover:opacity-100 transition-all duration-300 transform hover:scale-105">
            <div className="absolute -inset-4 bg-lime-400/5 rounded-full blur-xl group-hover:bg-lime-400/10 transition-colors duration-300"></div>
            <img
              src="/assets/meta-pool.png"
              alt="Meta Pool"
              className="relative h-10 md:h-14 w-auto group-hover:drop-shadow-[0_0_15px_rgba(163,230,53,0.5)] transition-all duration-300"
            />
          </a>
        </div>

      </div>
    </section>
  )
}

