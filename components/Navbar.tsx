'use client'

import Image from 'next/image'
import { useLang } from '@/context/LangContext'

export default function Navbar({ onSubmitClick }: { onSubmitClick: () => void }) {
  const { lang, setLang, t } = useLang()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="relative h-8 w-8">
          <Image
            src="/assets/logo-pizzadao.png"
            alt="PizzaDAO"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-yellow-400 font-black text-lg">×</span>
        <div className="relative h-8 w-24">
          <Image
            src="/assets/logo-mw3.png"
            alt="Música Web3"
            fill
            className="object-contain invert"
          />
        </div>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white/70 hover:text-white text-sm transition-colors">
          {t.nav.home}
        </button>
        <button
          onClick={() => document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-white/70 hover:text-white text-sm transition-colors"
        >
          {t.nav.game}
        </button>
        <button
          onClick={onSubmitClick}
          className="bg-yellow-400 text-black font-bold text-sm px-4 py-2 rounded-full hover:bg-yellow-300 transition-colors"
        >
          {t.vinyl.voteCta}
        </button>
      </div>

      {/* Lang toggle */}
      <div className="flex items-center gap-1 bg-white/10 rounded-full p-1">
        <button
          onClick={() => setLang('es')}
          className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${lang === 'es' ? 'bg-yellow-400 text-black' : 'text-white/60 hover:text-white'}`}
        >
          ES
        </button>
        <button
          onClick={() => setLang('en')}
          className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-yellow-400 text-black' : 'text-white/60 hover:text-white'}`}
        >
          EN
        </button>
      </div>
    </nav>
  )
}
