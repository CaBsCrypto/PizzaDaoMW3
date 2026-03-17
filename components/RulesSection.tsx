'use client'

import { useLang } from '@/context/LangContext'

const icons = ['🎤', '🍕', '🔗', '©️', '👤', '⚖️']

export default function RulesSection() {
  const { t } = useLang()

  return (
    <section id="rules" className="bg-zinc-950 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-green-400 text-sm font-medium uppercase tracking-widest mb-3">
            {t.rules.subtitle}
          </p>
          <h2 className="text-5xl font-black text-white">{t.rules.title}</h2>
        </div>

        {/* Rules grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.rules.items.map((item: string, i: number) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-400/30 transition-colors"
            >
              <span className="text-2xl flex-shrink-0">{icons[i]}</span>
              <div>
                <span className="text-yellow-400/60 text-xs font-mono font-bold block mb-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-white/80 text-sm leading-relaxed">{item}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CC0 note */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
            <span className="text-2xl">🌐</span>
            <p className="text-white/50 text-sm">
              {t.footer.cc0} — {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
