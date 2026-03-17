'use client'

import { useLang } from '@/context/LangContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-black border-t border-white/5 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-white font-black text-lg">
            MW3 <span className="text-yellow-400">×</span> PizzaDAO
          </span>
          <span className="text-white/30 text-xs">{t.footer.by} PizzaDAO & Música Web3</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <span className="text-lg">©</span>
            <span>{t.footer.cc0}</span>
          </div>
          <span className="text-white/30 text-xs">{t.footer.rights}</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://pizzadao.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-yellow-400 text-sm transition-colors"
          >
            PizzaDAO
          </a>
          <span className="text-white/20">·</span>
          <a
            href="https://musicaweb3.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-yellow-400 text-sm transition-colors"
          >
            Música Web3
          </a>
        </div>
      </div>
    </footer>
  )
}
