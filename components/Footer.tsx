'use client'

import { useLang } from '@/context/LangContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-black border-t border-white/5 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">

        {/* Logos centrados */}
        <div className="flex items-center gap-6">
          <a href="https://globalpizza.party/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
            <img src="/assets/logo-pizzadao.png" alt="PizzaDAO" className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity" />
            <span className="text-white/25 text-[10px] uppercase tracking-widest">PizzaDAO</span>
          </a>
          <span className="text-yellow-400/50 font-black text-2xl">×</span>
          <a href="https://www.musicaw3.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
            <img src="/assets/logo-mw3.png" alt="Música Web3" className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity" style={{ filter: 'invert(1)' }} />
            <span className="text-white/25 text-[10px] uppercase tracking-widest">Música Web3</span>
          </a>
        </div>

        {/* Divider */}
        <div className="w-20 h-px bg-white/8" />

        {/* Info row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 w-full">
          <span className="text-white/25 text-xs">{t.footer.by} PizzaDAO & Música Web3</span>

          <div className="flex flex-col items-center gap-0.5">
            <span className="text-white/20 text-xs">{t.footer.cc0}</span>
            <span className="text-white/15 text-[10px]">{t.footer.rights}</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://globalpizza.party/" target="_blank" rel="noopener noreferrer"
              className="text-white/25 hover:text-yellow-400 text-xs transition-colors">
              globalpizza.party
            </a>
            <span className="text-white/15">·</span>
            <a href="https://www.musicaw3.com/" target="_blank" rel="noopener noreferrer"
              className="text-white/25 hover:text-yellow-400 text-xs transition-colors">
              musicaw3.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
