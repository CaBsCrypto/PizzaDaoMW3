'use client'

import { useLang } from '@/context/LangContext'

const prizes = [
  { key: 'second', amount: '$100', place: '2nd', emoji: '🥈', color: 'from-gray-400/20 to-gray-600/10', border: 'border-gray-400/30', textColor: 'text-gray-300', order: 'order-1', scale: '' },
  { key: 'first', amount: '$200', place: '1st', emoji: '🥇', color: 'from-yellow-400/20 to-yellow-600/10', border: 'border-yellow-400/40', textColor: 'text-yellow-400', order: 'order-2', scale: 'lg:scale-110' },
  { key: 'third', amount: '$50', place: '3rd', emoji: '🥉', color: 'from-orange-700/20 to-orange-900/10', border: 'border-orange-600/30', textColor: 'text-orange-400', order: 'order-3', scale: '' },
]

export default function PrizesSection({ onSubmitClick }: { onSubmitClick: () => void }) {
  const { t } = useLang()

  const labels: Record<string, string> = {
    first: t.prizes.first,
    second: t.prizes.second,
    third: t.prizes.third,
  }
  const amounts: Record<string, string> = {
    first: t.prizes.amount1,
    second: t.prizes.amount2,
    third: t.prizes.amount3,
  }

  return (
    <section id="prizes" className="bg-black py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-yellow-400 text-sm font-medium uppercase tracking-widest mb-3">
            {t.prizes.subtitle}
          </p>
          <h2 className="text-5xl font-black text-white mb-4">{t.prizes.title}</h2>
          <div className="text-6xl font-black text-yellow-400">{t.prizes.total}</div>
        </div>

        {/* Podium cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {prizes.map((prize) => (
            <div
              key={prize.key}
              className={`${prize.order} ${prize.scale} relative rounded-2xl border ${prize.border} bg-gradient-to-b ${prize.color} p-8 text-center transition-transform duration-300 hover:scale-105`}
            >
              <div className="text-5xl mb-4">{prize.emoji}</div>
              <div className={`text-sm font-bold uppercase tracking-widest mb-2 ${prize.textColor}`}>
                {labels[prize.key]}
              </div>
              <div className={`text-5xl font-black ${prize.textColor}`}>
                {amounts[prize.key]}
              </div>
              <div className="text-white/40 text-sm mt-1">USD</div>

              {prize.key === 'first' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full">
                  TOP PRIZE
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onSubmitClick}
            className="bg-yellow-400 text-black font-black text-lg px-10 py-4 rounded-full hover:bg-yellow-300 transition-all hover:scale-105"
          >
            {t.nav.submit} →
          </button>
        </div>
      </div>
    </section>
  )
}
