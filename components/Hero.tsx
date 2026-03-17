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

const CONFETTI = [
  { left: '3%',  top: '10%', color: '#EF4444', w: 10, h: 10, round: true,  dur: '4s',  delay: '0s'   },
  { left: '8%',  top: '40%', color: '#F59E0B', w: 12, h: 5,  round: false, dur: '5s',  delay: '1s'   },
  { left: '14%', top: '20%', color: '#22C55E', w: 8,  h: 8,  round: true,  dur: '3.5s',delay: '0.5s' },
  { left: '20%', top: '70%', color: '#A855F7', w: 14, h: 6,  round: false, dur: '6s',  delay: '2s'   },
  { left: '25%', top: '30%', color: '#3B82F6', w: 9,  h: 9,  round: true,  dur: '4.5s',delay: '1.5s' },
  { left: '30%', top: '55%', color: '#EF4444', w: 11, h: 4,  round: false, dur: '7s',  delay: '0.8s' },
  { left: '35%', top: '15%', color: '#F59E0B', w: 7,  h: 7,  round: true,  dur: '5.5s',delay: '3s'   },
  { left: '42%', top: '80%', color: '#22C55E', w: 13, h: 5,  round: false, dur: '4s',  delay: '1.2s' },
  { left: '48%', top: '25%', color: '#A855F7', w: 8,  h: 8,  round: true,  dur: '6.5s',delay: '2.5s' },
  { left: '53%', top: '60%', color: '#3B82F6', w: 10, h: 4,  round: false, dur: '3.8s',delay: '0.3s' },
  { left: '58%', top: '45%', color: '#EF4444', w: 6,  h: 6,  round: true,  dur: '5s',  delay: '4s'   },
  { left: '65%', top: '12%', color: '#F59E0B', w: 15, h: 5,  round: false, dur: '4.2s',delay: '1.8s' },
  { left: '70%', top: '75%', color: '#22C55E', w: 9,  h: 9,  round: true,  dur: '7s',  delay: '0.6s' },
  { left: '75%', top: '35%', color: '#A855F7', w: 12, h: 4,  round: false, dur: '5.5s',delay: '3.5s' },
  { left: '80%', top: '50%', color: '#3B82F6', w: 8,  h: 8,  round: true,  dur: '4.8s',delay: '2.2s' },
  { left: '85%', top: '22%', color: '#EF4444', w: 11, h: 5,  round: false, dur: '6s',  delay: '1.4s' },
  { left: '90%', top: '65%', color: '#F59E0B', w: 7,  h: 7,  round: true,  dur: '3.5s',delay: '0.9s' },
  { left: '95%', top: '38%', color: '#22C55E', w: 13, h: 4,  round: false, dur: '5.2s',delay: '2.8s' },
  { left: '11%', top: '85%', color: '#A855F7', w: 10, h: 10, round: true,  dur: '4.6s',delay: '1.6s' },
  { left: '47%', top: '90%', color: '#3B82F6', w: 9,  h: 4,  round: false, dur: '6.3s',delay: '3.8s' },
  { left: '60%', top: '5%',  color: '#EF4444', w: 6,  h: 6,  round: true,  dur: '7.5s',delay: '0.2s' },
  { left: '28%', top: '92%', color: '#F59E0B', w: 14, h: 5,  round: false, dur: '4.4s',delay: '2.6s' },
]

export default function Hero({ onSubmitClick }: { onSubmitClick: () => void }) {
  const { t } = useLang()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{ backgroundColor: '#1A1208' }}
    >
      {/* Confetti — tumbling pieces */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {CONFETTI.map((c, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: c.left,
              top: c.top,
              width: c.w + 'px',
              height: c.h + 'px',
              backgroundColor: c.color,
              borderRadius: c.round ? '50%' : '2px',
              opacity: 0.75,
              animation: `tumble ${c.dur} ease-in-out infinite alternate`,
              animationDelay: c.delay,
            }}
          />
        ))}
      </div>

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

      <div className="relative z-10 max-w-7xl mx-auto px-2 lg:px-4 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr_0.8fr] gap-6 items-center w-full">
        {/* Left: Text */}
        <div className="flex flex-col gap-6 pl-2 lg:pl-4">
          <div className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
            <span className="text-xs">🎵</span>
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
            {t.hero.title1}{' '}
            <span className="text-yellow-400">{t.hero.title2}</span>{' '}
            <span className="text-green-400">{t.hero.title3}</span>
          </h1>

          <p className="text-white/60 text-lg leading-relaxed max-w-sm">
            {t.hero.subtitle}
          </p>

          <button
            onClick={onSubmitClick}
            className="inline-flex items-center gap-2 bg-yellow-400 text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition-all hover:scale-105 w-fit text-sm"
          >
            🎸 {t.nav.submit}
          </button>
        </div>

        {/* Center: Bus animated video */}
        <div className="flex justify-center items-center">
          <div
            className="relative w-[457px] h-[457px] lg:w-[609px] lg:h-[609px]"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain drop-shadow-2xl"
            >
              <source src="/assets/bus-animated.webm" type="video/webm" />
              <source src="/assets/bus-animated.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="flex flex-col gap-8 lg:pl-8">
          {[
            { num: '01', value: '$350', label: t.hero.stat1label },
            { num: '02', value: '3', label: t.hero.stat2label },
            { num: '03', value: 'CC0', label: t.hero.stat3label },
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
      `}</style>
    </section>
  )
}
