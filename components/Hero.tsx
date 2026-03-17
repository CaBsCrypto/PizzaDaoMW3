'use client'

import Image from 'next/image'
import { useLang } from '@/context/LangContext'

// Posiciones fijas para evitar hydration mismatch
const PARACHUTES = [
  { left: '5%',  delay: '0s',    duration: '8s',   size: 120 },
  { left: '18%', delay: '3.2s',  duration: '10s',  size: 90  },
  { left: '38%', delay: '1.1s',  duration: '7.5s', size: 105 },
  { left: '62%', delay: '5.5s',  duration: '9s',   size: 80  },
  { left: '80%', delay: '2.4s',  duration: '11s',  size: 95  },
  { left: '92%', delay: '7s',    duration: '8.5s', size: 70  },
]


export default function Hero({ onSubmitClick }: { onSubmitClick: () => void }) {
  const { t } = useLang()

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col lg:flex-row lg:items-center pt-20 overflow-hidden"
      style={{ backgroundColor: '#1A1208' }}
    >
      {/* Falling vinyl parachutes — z-20, above the bus */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        {PARACHUTES.map((p, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: p.left,
              top: '-160px',
              width: p.size + 'px',
              height: p.size + 'px',
              animation: `fall ${p.duration} linear infinite`,
              animationDelay: p.delay,
            }}
          >
            <Image
              src="/assets/vinyl-parachute.png"
              alt=""
              fill
              className="object-contain"
              style={{ animation: `swing 2.5s ease-in-out infinite alternate`, transformOrigin: 'top center', filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.9))' }}
            />
          </div>
        ))}
      </div>

      {/* ── MOBILE layout: flex-col filling 100dvh ── */}
      <div className="relative z-10 w-full flex flex-col flex-1 lg:hidden px-4 pb-4">

        {/* Bus — bigger, takes the top bulk */}
        <div className="flex justify-center items-center flex-[2]">
          <div className="relative w-full max-w-[380px] aspect-square">
            <video autoPlay loop muted playsInline className="w-full h-full object-contain drop-shadow-2xl">
              <source src="/assets/bus-animated.webm" type="video/webm" />
              <source src="/assets/bus-animated.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Text LEFT + Vinyl RIGHT */}
        <div className="flex flex-row items-center gap-3 flex-shrink-0">
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <div className="inline-flex items-center gap-1 text-yellow-400 text-xs font-medium">
              <span>🎵</span>
              <span className="leading-tight">{t.hero.badge}</span>
            </div>
            <h1 className="text-[1.65rem] font-black text-white leading-[1.05]">
              {t.hero.title1}{' '}
              <span className="text-yellow-400">{t.hero.title2}</span>{' '}
              <span className="text-green-400">{t.hero.title3}</span>
            </h1>
            <p className="text-white/60 text-[0.7rem] leading-snug">
              {t.hero.subtitle}
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <button onClick={onSubmitClick} className="group relative w-28 h-28 cursor-pointer focus:outline-none" aria-label={t.vinyl.title}>
              <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border-4 border-zinc-700 shadow-2xl shadow-yellow-400/10 group-active:shadow-yellow-400/30 transition-all duration-300 vinyl-spin">
                {[90, 80, 70, 60, 50, 40].map((size) => (
                  <div key={size} className="absolute inset-0 m-auto rounded-full border border-white/5" style={{ width: `${size}%`, height: `${size}%` }} />
                ))}
                <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-yellow-500 shadow-lg overflow-hidden">
                  <svg width="64" height="64" viewBox="0 0 64 64" className="absolute inset-0 w-full h-full">
                    <defs><path id="orbit-m" d="M 32,32 m -20,0 a 20,20 0 1,1 40,0 a 20,20 0 1,1 -40,0" /></defs>
                    <text fontSize="6.5" fill="white" fontWeight="bold" letterSpacing="3.2" opacity="0.95">
                      <textPath href="#orbit-m">POSTULA · POSTULA · </textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-black" />
              </div>
              <div className="absolute inset-0 rounded-full ring-0 ring-yellow-400/0 group-active:ring-4 group-active:ring-yellow-400/40 transition-all duration-300" />
            </button>
            <span className="text-white/30 text-[9px]">toca ↑</span>
          </div>
        </div>

        {/* Stats — pushed to bottom */}
        <div className="flex flex-row justify-around mt-auto pt-3 border-t border-white/10">
          {[
            { value: '$350', label: t.hero.stat1label },
            { value: '3',    label: t.hero.stat2label },
            { value: 'CC0',  label: t.hero.stat3label },
          ].map((stat) => (
            <div key={stat.value} className="flex flex-col items-center gap-0.5">
              <div className="text-white font-black text-xl">{stat.value}</div>
              <div className="text-white/50 text-[9px] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP layout: 3-column grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 hidden lg:grid lg:grid-cols-[1fr_1.6fr_0.8fr] gap-6 items-center w-full">

        {/* Left: Text + Vinyl */}
        <div className="flex flex-col gap-6 pl-4">
          <div className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
            <span>🎵</span>
            <span>{t.hero.badge}</span>
          </div>
          <h1 className="text-6xl font-black text-white leading-tight">
            {t.hero.title1}{' '}
            <span className="text-yellow-400">{t.hero.title2}</span>{' '}
            <span className="text-green-400">{t.hero.title3}</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-sm">{t.hero.subtitle}</p>
          <button onClick={onSubmitClick} className="group relative w-36 h-36 cursor-pointer focus:outline-none" aria-label={t.vinyl.title}>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border-4 border-zinc-700 shadow-2xl shadow-yellow-400/10 group-hover:shadow-yellow-400/30 transition-all duration-300 vinyl-spin">
              {[90, 80, 70, 60, 50, 40].map((size) => (
                <div key={size} className="absolute inset-0 m-auto rounded-full border border-white/5" style={{ width: `${size}%`, height: `${size}%` }} />
              ))}
              <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-yellow-500 shadow-lg overflow-hidden">
                <svg width="64" height="64" viewBox="0 0 64 64" className="absolute inset-0 w-full h-full">
                  <defs><path id="orbit-d" d="M 32,32 m -20,0 a 20,20 0 1,1 40,0 a 20,20 0 1,1 -40,0" /></defs>
                  <text fontSize="6.5" fill="white" fontWeight="bold" letterSpacing="3.2" opacity="0.95">
                    <textPath href="#orbit-d">POSTULA · POSTULA · </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-black" />
            </div>
            <div className="absolute inset-0 rounded-full ring-0 ring-yellow-400/0 group-hover:ring-4 group-hover:ring-yellow-400/40 transition-all duration-300" />
          </button>
        </div>

        {/* Center: Bus */}
        <div className="flex justify-center items-center">
          <div className="relative w-[609px] h-[609px]">
            <video autoPlay loop muted playsInline className="w-full h-full object-contain drop-shadow-2xl">
              <source src="/assets/bus-animated.webm" type="video/webm" />
              <source src="/assets/bus-animated.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="flex flex-col gap-8 pl-8">
          {[
            { num: '01', value: '$350', label: t.hero.stat1label },
            { num: '02', value: '3',    label: t.hero.stat2label },
            { num: '03', value: 'CC0',  label: t.hero.stat3label },
          ].map((stat) => (
            <div key={stat.num} className="flex items-center gap-4">
              <span className="text-white/30 text-sm font-mono font-bold">{stat.num}</span>
              <div className="w-8 h-px bg-yellow-400/60" />
              <div>
                <div className="text-white font-black text-2xl">{stat.value}</div>
                <div className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes tumble {
          0%   { transform: translateY(0px) rotate(0deg) scale(1); }
          33%  { transform: translateY(-18px) rotate(120deg) scale(1.1); }
          66%  { transform: translateY(8px) rotate(240deg) scale(0.9); }
          100% { transform: translateY(-12px) rotate(360deg) scale(1.05); }
        }
        @keyframes fall {
          0%   { transform: translateY(-160px); opacity: 0; }
          5%   { opacity: 0.9; }
          88%  { opacity: 0.9; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        @keyframes swing {
          from { transform: rotate(-9deg); }
          to   { transform: rotate(9deg); }
        }
        @keyframes busFloat {
          from { transform: translateY(0px); }
          to   { transform: translateY(-10px); }
        }
        .vinyl-spin {
          animation: vinylSpin 4s linear infinite;
        }
        .group:hover .vinyl-spin {
          animation-duration: 1.5s;
        }
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
