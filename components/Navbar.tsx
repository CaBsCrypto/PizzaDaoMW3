'use client'

import { useLang } from '@/context/LangContext'

export default function Navbar({ onSubmitClick }: { onSubmitClick: () => void }) {
  const { lang, setLang, t } = useLang()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-white font-black text-lg tracking-tight">
          MW3 <span className="text-yellow-400">×</span> PizzaDAO
        </span>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8">
        <button onClick={() => scrollTo('hero')} className="text-white/70 hover:text-white text-sm transition-colors">
          {t.nav.home}
        </button>
        <button onClick={() => scrollTo('prizes')} className="text-white/70 hover:text-white text-sm transition-colors">
          {t.nav.prizes}
        </button>
        <button onClick={() => scrollTo('rules')} className="text-white/70 hover:text-white text-sm transition-colors">
          {t.nav.rules}
        </button>
        <button
          onClick={onSubmitClick}
          className="bg-yellow-400 text-black font-bold text-sm px-4 py-2 rounded-full hover:bg-yellow-300 transition-colors"
        >
          {t.nav.submit}
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
