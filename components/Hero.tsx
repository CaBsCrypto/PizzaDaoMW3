'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLang } from '@/context/LangContext'
import VinylButton from './VinylButton'
import { getCurrentPhase, ContestPhase } from '@/lib/phase'

// Posiciones fijas para evitar hydration mismatch
const PARACHUTES = [
  { left: '5%',  delay: '0s',    duration: '8s',   size: 110 },
  { left: '22%', delay: '3.2s',  duration: '10s',  size: 85  },
  { left: '45%', delay: '1.1s',  duration: '7.5s', size: 100 },
  { left: '68%', delay: '5.5s',  duration: '9s',   size: 75  },
  { left: '88%', delay: '2.4s',  duration: '11s',  size: 90  },
]


export default function Hero({ onSubmitClick }: { onSubmitClick: () => void }) {
  const { t } = useLang()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [phase, setPhase] = useState<ContestPhase>('SUBMISSIONS')

  // Detect phase on mount and searchParams change
  useEffect(() => {
    const queryPhase = searchParams.get('phase')?.toLowerCase()
    if (queryPhase === 'voting') {
      setPhase('VOTING')
    } else if (queryPhase === 'submissions') {
      setPhase('SUBMISSIONS')
    } else {
      setPhase(getCurrentPhase())
    }
  }, [searchParams])

  const handleVotingClick = () => {
    router.push('/votar')
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col lg:flex-row lg:items-center pt-20 overflow-hidden"
      style={{ backgroundColor: '#1A1208' }}
    >
      {/* Falling vinyl parachutes */}
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
              style={{
                animation: `swing 2.5s ease-in-out infinite alternate`,
                transformOrigin: 'top center',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
              }}
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
            <div className="inline-flex items-center gap-1 bg-red-500/20 border border-red-500/30 rounded-full px-2 py-0.5 w-fit">
              <span className="text-red-400 text-[10px] font-black">
                {phase === 'SUBMISSIONS' ? t.deadline.badge : '🔥 ' + (t.vinyl.vote || 'VOTACIONES')}
              </span>
            </div>
            <h1 className="text-[1.65rem] font-black text-white leading-[1.05]">
              {t.hero.title1}{' '}
              <span className="text-yellow-400">{t.hero.title2}</span>{' '}
              <span className="text-green-400">{t.hero.title3}</span>
            </h1>
            <p className="text-white/60 text-[0.7rem] leading-snug">
              {t.hero.subtitle}
              {searchParams.get('debug') && <span className="text-pink-500 ml-2">[DEBUG: {phase}]</span>}
            </p>
          </div>
          
          {/* Single Vinyl based on phase */}
          <div className="flex-shrink-0">
            {phase === 'SUBMISSIONS' ? (
              <VinylButton 
                label="POSTULA" 
                onClick={onSubmitClick}
                centerGradient="from-red-600 to-yellow-500"
                buttonText={t.vinyl.submit || "🎵 Postular →"}
                buttonStyle={{ background: 'rgba(0,220,255,0.25)', border: '2px solid cyan', color: 'cyan' }}
              />
            ) : (
              <VinylButton 
                label="VOTACIONES" 
                onClick={handleVotingClick}
                centerGradient="from-purple-600 to-blue-500"
                buttonText={t.vinyl.voteCta || "🎵 Votar →"}
                buttonStyle={{ background: 'rgba(168,85,247,0.25)', border: '2px solid rgb(168,85,247)', color: 'rgb(192,132,252)' }}
              />
            )}
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 hidden lg:grid lg:grid-cols-[1.2fr_1.4fr_0.8fr] gap-6 items-center w-full">

        {/* Left: Text + Vinyl */}
        <div className="flex flex-col gap-6 pl-4">
          <div className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
            <span>🎵</span>
            <span>{t.hero.badge}</span>
          </div>
          <div className="inline-flex items-center gap-1 bg-red-500/20 border border-red-500/30 rounded-full px-3 py-1 w-fit">
            <span className="text-red-400 text-xs font-black">
              {phase === 'SUBMISSIONS' ? t.deadline.badge : '🔥 VOTACIONES'}
            </span>
          </div>
          <h1 className="text-6xl font-black text-white leading-tight">
            {t.hero.title1}{' '}
            <span className="text-yellow-400">{t.hero.title2}</span>{' '}
            <span className="text-green-400">{t.hero.title3}</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-sm">{t.hero.subtitle}</p>
          
          <div className="flex flex-row items-start">
            {phase === 'SUBMISSIONS' ? (
              <VinylButton 
                label="POSTULA" 
                onClick={onSubmitClick}
                size="w-36 h-36"
                centerGradient="from-red-600 to-yellow-500"
                buttonText={t.vinyl.submit || "🎵 Postular →"}
                buttonStyle={{ background: 'rgba(0,220,255,0.25)', border: '2px solid cyan', color: 'cyan' }}
                ariaLabel={t.vinyl.title}
              />
            ) : (
              <VinylButton 
                label="VOTACIONES" 
                onClick={handleVotingClick}
                size="w-36 h-36"
                centerGradient="from-purple-600 to-blue-500"
                buttonText={t.vinyl.voteCta || "🎵 Votar →"}
                buttonStyle={{ background: 'rgba(168,85,247,0.25)', border: '2px solid rgb(168,85,247)', color: 'rgb(192,132,252)' }}
              />
            )}
          </div>
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
        :global(.vinyl-spin) {
          animation: vinylSpin 4s linear infinite;
        }
        :global(.group:hover .vinyl-spin) {
          animation-duration: 1.5s;
        }
        :global(.group:active .vinyl-spin) {
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
