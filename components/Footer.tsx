'use client'

import Image from 'next/image'
import { useLang } from '@/context/LangContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-black border-t border-white/5 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">

        {/* Logos centrados */}
        <div className="flex items-center gap-6">
          <a href="https://discord.gg/2MgmN3A2" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
            <div className="relative h-10 w-10">
              <Image
                src="/assets/logo-pizzadao.png"
                alt="PizzaDAO"
                fill
                className="object-contain opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="text-white/25 text-[10px] uppercase tracking-widest">PizzaDAO</span>
          </a>
          <span className="text-yellow-400/50 font-black text-2xl">×</span>
          <a href="https://www.musicaw3.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
            <div className="relative h-10 w-24">
              <Image
                src="/assets/logo-mw3.png"
                alt="Música W3"
                fill
                className="object-contain opacity-60 group-hover:opacity-100 transition-opacity invert"
              />
            </div>
            <span className="text-white/25 text-[10px] uppercase tracking-widest">Música W3</span>
          </a>
        </div>

        {/* Divider */}
        <div className="w-20 h-px bg-white/8" />

        {/* Info row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 w-full">
          <span className="text-white/25 text-xs">{t.footer.by} PizzaDAO & Música W3</span>

          <div className="flex flex-col items-center gap-0.5">
            <span className="text-white/20 text-xs">{t.footer.cc0}</span>
            <span className="text-white/15 text-[10px]">{t.footer.rights}</span>
          </div>

          <div className="flex items-center gap-3 md:gap-4 flex-wrap justify-center">
            <a href="https://discord.gg/2MgmN3A2" target="_blank" rel="noopener noreferrer"
              className="text-white/25 hover:text-yellow-400 text-xs transition-colors">
              discord PizzaDAO
            </a>
            <span className="text-white/15">·</span>
            <a href="https://www.musicaw3.com/" target="_blank" rel="noopener noreferrer"
              className="text-white/25 hover:text-yellow-400 text-xs transition-colors">
              musicaw3.com
            </a>
            <span className="text-white/15">·</span>
            <a href="https://x.com/meta_pool" target="_blank" rel="noopener noreferrer"
              className="text-white/25 hover:text-lime-400 text-xs transition-colors">
              Meta Pool
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
