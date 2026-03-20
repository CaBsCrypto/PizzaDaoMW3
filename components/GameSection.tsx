'use client'

import { useLang } from '@/context/LangContext'

// ─────────────────────────────────────────────
// ZONA DE ACOPLE — reemplaza este componente
// por el contenido real del juego cuando esté listo
// ─────────────────────────────────────────────
function GameScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 relative overflow-hidden select-none"
      style={{ background: 'linear-gradient(160deg, #0D0A1A 0%, #1A0D2E 50%, #0A1A0D 100%)' }}>

      {/* Fondo animado — grid de píxeles */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(168,85,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.4) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          animation: 'gridScroll 8s linear infinite',
        }} />

      {/* Glow central */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(168,85,247,0.15) 0%, transparent 70%)' }} />

      {/* Pizza 8-bit decorativa */}
      <div className="relative z-10 text-5xl game-float">🍕</div>

      {/* Título */}
      <div className="relative z-10 text-center px-4">
        <div className="text-[10px] text-purple-400/70 font-mono uppercase tracking-widest mb-1">PizzaDAO Game</div>
        <div className="text-white font-black text-lg leading-tight">Coming Soon</div>
        <div className="text-white/30 text-[10px] mt-1 font-mono">v0.1 — build in progress</div>
      </div>

      {/* Barra de progreso fake */}
      <div className="relative z-10 w-32">
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div className="h-full rounded-full progress-glow"
            style={{ width: '68%', background: 'linear-gradient(90deg, #A855F7, #FACC15)' }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-white/20 text-[8px] font-mono">desarrollo</span>
          <span className="text-purple-400/60 text-[8px] font-mono">68%</span>
        </div>
      </div>

      {/* Mini HUD elements */}
      <div className="absolute top-6 left-4 right-4 flex justify-between z-10">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400/60 text-[8px] font-mono">LIVE</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-400/50 text-[8px] font-mono">🎵 MW3</span>
        </div>
      </div>

      {/* Bottom tabs fake */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-around z-10">
        {['🎮','🏆','🎵','👤'].map((icon, i) => (
          <div key={i} className={`flex flex-col items-center gap-0.5 ${i === 0 ? 'opacity-100' : 'opacity-25'}`}>
            <span className="text-base">{icon}</span>
            <div className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-purple-400' : 'bg-transparent'}`} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes gridScroll {
          from { backgroundPosition: 0 0; }
          to   { backgroundPosition: 0 28px; }
        }
        .game-float {
          animation: gameFloat 3s ease-in-out infinite alternate;
        }
        @keyframes gameFloat {
          from { transform: translateY(0px) rotate(-5deg); }
          to   { transform: translateY(-10px) rotate(5deg); }
        }
        .progress-glow {
          box-shadow: 0 0 8px rgba(168,85,247,0.6);
          animation: progressPulse 2s ease-in-out infinite alternate;
        }
        @keyframes progressPulse {
          from { opacity: 0.8; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// ─────────────────────────────────────────────
// Mockup de teléfono — estructura fija
// ─────────────────────────────────────────────
function PhoneMockup({ large = false }: { large?: boolean }) {
  const w = large ? 300 : 240
  const h = large ? 612 : 490
  const r = large ? 50 : 40
  const ri = large ? 48 : 38
  return (
    <div className="relative mx-auto"
      style={{ width: `${w}px`, height: `${h}px` }}>

      {/* Sombra exterior */}
      <div className="absolute inset-0" style={{ borderRadius: `${r}px`, boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), 0 0 40px rgba(168,85,247,0.15)' }} />

      {/* Cuerpo del teléfono */}
      <div className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: `${r}px`, background: 'linear-gradient(160deg, #1c1c1e 0%, #0a0a0a 100%)', border: '1px solid rgba(255,255,255,0.12)' }}>

        {/* Notch / Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20"
          style={{ width: '80px', height: '24px', background: '#000', borderRadius: '12px' }} />

        {/* Botones laterales */}
        <div className="absolute -right-[3px] top-24 w-[3px] h-12 rounded-r-full"
          style={{ background: 'rgba(255,255,255,0.12)' }} />
        <div className="absolute -left-[3px] top-20 w-[3px] h-8 rounded-l-full"
          style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="absolute -left-[3px] top-32 w-[3px] h-8 rounded-l-full"
          style={{ background: 'rgba(255,255,255,0.08)' }} />

        {/* Pantalla — zona de acople del juego */}
        <div className="absolute inset-[3px] overflow-hidden" style={{ borderRadius: `${ri}px` }}>
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-10 z-10 flex items-start justify-between px-5 pt-2"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}>
            <span className="text-white text-[9px] font-semibold mt-1">9:41</span>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex gap-px items-end h-2.5">
                {[3,5,7,9].map((h,i) => <div key={i} className="w-0.5 bg-white rounded-sm" style={{ height:`${h}px`, opacity: i < 3 ? 1 : 0.3 }} />)}
              </div>
              <svg width="12" height="10" viewBox="0 0 12 10" fill="white" opacity="0.9">
                <path d="M1 3.5C2.8 1.7 5 1 6 1s3.2.7 5 2.5L9.5 5c-1-1-2.2-1.5-3.5-1.5S4 4 3 5L1 3.5z"/>
                <path d="M3 6c.8-.8 1.8-1.2 3-1.2s2.2.4 3 1.2L7.5 7.5c-.5-.5-1-.7-1.5-.7s-1 .2-1.5.7L3 6z"/>
                <circle cx="6" cy="9" r="1"/>
              </svg>
              <div className="flex items-center gap-px">
                <div className="rounded-sm" style={{ width:'18px', height:'9px', border:'1px solid rgba(255,255,255,0.5)', padding:'1px' }}>
                  <div className="rounded-sm bg-green-400 h-full" style={{ width:'70%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* CONTENIDO DEL JUEGO — reemplazar GameScreen() */}
          <GameScreen />
        </div>

        {/* Reflejo de pantalla */}
        <div className="absolute inset-[3px] pointer-events-none"
          style={{ borderRadius: `${ri}px`, background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)' }} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Feature cards — used in mobile layout
// ─────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FeatureCards({ t }: { t: any }) {
  return (
    <div className="w-full flex flex-col gap-3">
      {[
        { icon: '🎵', color: '#FACC15', label: t.game.feat1title, desc: t.game.feat1desc },
        { icon: '🍕', color: '#EF4444', label: t.game.feat2title, desc: t.game.feat2desc },
        { icon: '🏆', color: '#A855F7', label: t.game.feat3title, desc: t.game.feat3desc },
      ].map((f) => (
        <div key={f.label} className="relative rounded-2xl p-4 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${f.color}10 0%, ${f.color}03 100%)`, border: `1px solid ${f.color}25` }}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: `${f.color}18`, border: `1px solid ${f.color}35` }}>
              {f.icon}
            </div>
            <div>
              <div className="text-white font-black text-sm mb-0.5">{f.label}</div>
              <div className="text-white/45 text-xs leading-relaxed">{f.desc}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 rounded-full px-4 py-2.5 self-start"
        style={{ background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.30)' }}>
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        <span className="text-purple-300/70 text-xs font-bold tracking-wide">{t.game.comingSoon}</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Sección principal
// ─────────────────────────────────────────────
export default function GameSection() {
  const { t } = useLang()

  return (
    <section id="game" className="relative py-14 px-6 overflow-hidden"
      style={{ backgroundColor: '#08060F' }}>

      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position:'absolute', top:'10%', left:'5%', width:'300px', height:'300px', background:'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)', borderRadius:'50%' }} />
        <div style={{ position:'absolute', bottom:'10%', right:'5%', width:'250px', height:'250px', background:'radial-gradient(circle, rgba(250,204,21,0.06) 0%, transparent 70%)', borderRadius:'50%' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)', color: '#C084FC' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            {t.game.badge}
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            {t.game.title1}{' '}
            <span style={{ color: '#C084FC' }}>{t.game.title2}</span>
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto leading-relaxed">{t.game.subtitle}</p>
        </div>

        {/* ── MOBILE: stacked ── DESKTOP: phone centred + features around ── */}

        {/* Mobile layout */}
        <div className="flex flex-col items-center gap-8 lg:hidden">
          <PhoneMockup />
          <FeatureCards t={t} />
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr auto 1fr', gap: '48px', alignItems: 'center' }}>

          {/* Left column — 2 stacked feature cards */}
          <div className="flex flex-col gap-4">
            {[
              { icon: '🎵', color: '#FACC15', label: t.game.feat1title, desc: t.game.feat1desc },
              { icon: '🍕', color: '#EF4444', label: t.game.feat2title, desc: t.game.feat2desc },
            ].map((f) => (
              <div key={f.label} className="relative rounded-2xl p-5 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${f.color}10 0%, ${f.color}03 100%)`, border: `1px solid ${f.color}25` }}>
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${f.color}1A 0%, transparent 70%)` }} />
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `${f.color}18`, border: `1px solid ${f.color}35` }}>
                    {f.icon}
                  </div>
                  <div>
                    <div className="text-white font-black text-sm mb-1">{f.label}</div>
                    <div className="text-white/45 text-xs leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Centre — BIG phone */}
          <div className="flex flex-col items-center gap-6">
            {/* Glow ring behind phone */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full pointer-events-none"
                style={{ boxShadow: '0 0 120px 40px rgba(168,85,247,0.18), 0 0 60px 20px rgba(250,204,21,0.10)', transform: 'translateY(10%)' }} />
              <PhoneMockup large />
            </div>
            {/* Coming soon pill below phone */}
            <div className="flex items-center gap-2 rounded-full px-5 py-2.5"
              style={{ background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.30)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-300/70 text-xs font-bold tracking-wide">{t.game.comingSoon}</span>
            </div>
          </div>

          {/* Right column — feature card + coming-soon detail */}
          <div className="flex flex-col gap-4">
            <div className="relative rounded-2xl p-5 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.10) 0%, rgba(168,85,247,0.03) 100%)', border: '1px solid rgba(168,85,247,0.25)' }}>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.20) 0%, transparent 70%)' }} />
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.35)' }}>
                  🏆
                </div>
                <div>
                  <div className="text-white font-black text-sm mb-1">{t.game.feat3title}</div>
                  <div className="text-white/45 text-xs leading-relaxed">{t.game.feat3desc}</div>
                </div>
              </div>
            </div>

            {/* Stats mini */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { n: '3', label: 'Géneros', color: '#FACC15' },
                { n: '∞', label: 'Niveles', color: '#A855F7' },
                { n: 'Web3', label: 'Integrado', color: '#3B82F6' },
                { n: 'CC0', label: 'Libre', color: '#22C55E' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-3 text-center"
                  style={{ background: `${s.color}0D`, border: `1px solid ${s.color}22` }}>
                  <div className="font-black text-base" style={{ color: s.color }}>{s.n}</div>
                  <div className="text-white/35 text-[9px] uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
