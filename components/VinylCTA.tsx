'use client'

import { useLang } from '@/context/LangContext'

export default function VinylCTA({ onSubmitClick }: { onSubmitClick: () => void }) {
  const { t } = useLang()

  return (
    <section id="vinyl-cta" className="bg-black py-24 px-6 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
        <h2 className="text-4xl lg:text-5xl font-black text-white">{t.vinyl.title}</h2>
        <p className="text-white/50 text-lg">{t.vinyl.subtitle}</p>

        {/* Vinyl disc */}
        <button
          onClick={onSubmitClick}
          className="group relative w-56 h-56 cursor-pointer focus:outline-none"
          aria-label={t.vinyl.title}
        >
          {/* Spinning vinyl */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border-4 border-zinc-700 shadow-2xl shadow-yellow-400/10 group-hover:shadow-yellow-400/30 transition-all duration-300 vinyl-spin">
            {/* Grooves */}
            {[90, 80, 70, 60, 50, 40].map((size) => (
              <div
                key={size}
                className="absolute inset-0 m-auto rounded-full border border-white/5"
                style={{ width: `${size}%`, height: `${size}%` }}
              />
            ))}
            {/* Label center */}
            <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-yellow-500 shadow-lg overflow-hidden">
              <svg width="96" height="96" viewBox="0 0 96 96" className="absolute inset-0">
                <defs>
                  <path id="orbit-cta" d="M 48,48 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" />
                </defs>
                <text fontSize="8.5" fill="white" fontWeight="bold" letterSpacing="4.2" opacity="0.95">
                  <textPath href="#orbit-cta">POSTULA · POSTULA · </textPath>
                </text>
              </svg>
            </div>
            {/* Center hole */}
            <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-black" />
          </div>

          {/* Hover ring glow */}
          <div className="absolute inset-0 rounded-full ring-0 ring-yellow-400/0 group-hover:ring-4 group-hover:ring-yellow-400/40 transition-all duration-300" />
        </button>

        <p className="text-white/30 text-xs">click ↑</p>
      </div>

      <style jsx>{`
        .vinyl-spin {
          animation: vinylSpin 4s linear infinite;
        }
        .group:hover .vinyl-spin {
          animation-duration: 1.5s;
        }
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
