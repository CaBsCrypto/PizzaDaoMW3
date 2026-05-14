'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLang } from '@/context/LangContext'
import VinylButton from './VinylButton'

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

  const handleVotingClick = () => {
    window.open('https://agent-6a018d7f32eadd62a893--bright-selkie-25f1f2.netlify.app/', '_blank')
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col lg:flex-row lg:items-center pt-20 overflow-hidden"
      style={{ backgroundColor: '#1A1208' }}
    >
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
              priority={i === 0}
              sizes={`${p.size}px`}
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

      {/* MOBILE */}
      <div className="relative z-10 w-full flex flex-col flex-1 lg:hidden px-4 pb-4">
        <div className="flex justify-center items-center flex-[2]">
          <div className="relative w-full max-w-[380px] aspect-square">
            <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-contain drop-shadow-2xl">
              <source src="/assets/bus-animated.webm" type="video/webm" />
              <source src="/assets/bus-animated.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 text-center">
            <div className="inline-flex items-center justify-center gap-2 text-xs font-medium">
              <div className="flex items-center gap-1 text-yellow-400">
                <span>🎵</span>
                <span className="leading-tight">{t.hero.badge}</span>
              </div>
              <span className="text-red-500 font-bold uppercase tracking-wider bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                Cierra el 15 de mayo
              </span>
            </div>
            <h1 className="text-[1.8rem] font-black text-white leading-tight">
              {t.hero.title1} <span className="text-yellow-400">{t.hero.title2}</span> <span className="text-green-400">{t.hero.title3}</span>
            </h1>
          </div>
          
          <div className="flex flex-row items-center justify-center gap-4 py-2">
            <VinylButton 
              label="POSTULA" 
              onClick={onSubmitClick}
              size="w-24 h-24"
              centerGradient="from-red-600 to-yellow-500"
              buttonText="Postular →"
              buttonStyle={{ background: 'rgba(0,220,255,0.15)', border: '1px solid cyan', color: 'cyan' }}
            />
            <VinylButton 
              label="VOTACIONES" 
              onClick={handleVotingClick}
              size="w-24 h-24"
              centerGradient="from-purple-600 to-blue-500"
              buttonText="VOTAR →"
              buttonStyle={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgb(168,85,247)', color: 'rgb(192,132,252)' }}
            />
          </div>
        </div>

        <div className="flex flex-row justify-around mt-auto pt-4 border-t border-white/10">
          {[
            { value: '$350', label: t.hero.stat1label },
            { value: '3',    label: t.hero.stat2label },
            { value: 'CC0',  label: t.hero.stat3label },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="text-white font-black text-lg">{stat.value}</div>
              <div className="text-white/50 text-[8px] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 hidden lg:grid lg:grid-cols-[1.2fr_1.4fr_0.8fr] gap-6 items-center w-full">
        <div className="flex flex-col gap-6 pl-4">
          <div className="inline-flex items-center gap-3 text-sm font-medium">
            <div className="flex items-center gap-2 text-yellow-400">
              <span>🎵</span>
              <span>{t.hero.badge}</span>
            </div>
            <span className="text-red-500 font-bold uppercase tracking-wider bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20 text-[11px]">
              Cierra el 15 de mayo
            </span>
          </div>
          <h1 className="text-6xl font-black text-white leading-tight">
            {t.hero.title1} <span className="text-yellow-400">{t.hero.title2}</span> <span className="text-green-400">{t.hero.title3}</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-sm">{t.hero.subtitle}</p>
          
          <div className="flex flex-row items-center gap-10 mt-4">
            <div className="flex flex-col items-center gap-3">
              <VinylButton 
                label="POSTULA" 
                onClick={onSubmitClick}
                size="w-32 h-32"
                centerGradient="from-red-600 to-yellow-500"
                buttonText="Postular →"
                buttonStyle={{ background: 'rgba(0,220,255,0.15)', border: '1px solid cyan', color: 'cyan' }}
              />
              <span className="text-cyan-400/60 text-[10px] font-black uppercase tracking-widest">Fase Postulación</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <VinylButton 
                label="VOTACIONES" 
                onClick={handleVotingClick}
                size="w-32 h-32"
                centerGradient="from-purple-600 to-blue-500"
                buttonText="VOTAR →"
                buttonStyle={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgb(168,85,247)', color: 'rgb(192,132,252)' }}
              />
              <span className="text-purple-400/60 text-[10px] font-black uppercase tracking-widest">Fase Votación</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="relative w-[550px] h-[550px]">
            <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-contain drop-shadow-2xl">
              <source src="/assets/bus-animated.webm" type="video/webm" />
              <source src="/assets/bus-animated.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

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
        :global(.vinyl-spin) {
          animation: vinylSpin 4s linear infinite;
        }
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
