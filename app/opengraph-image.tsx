import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'PizzaDAO × MusicaW3 — Concurso Musical en Español'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#0A0A0F',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Fondo degradado principal */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #1c1408 0%, #0A0A0F 55%, #0f0a1a 100%)',
          display: 'flex',
        }} />

        {/* Glow amarillo top-left */}
        <div style={{
          position: 'absolute', left: -120, top: -120,
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(250,204,21,0.20) 0%, transparent 65%)',
          display: 'flex',
        }} />

        {/* Glow naranja bottom-right */}
        <div style={{
          position: 'absolute', right: -100, bottom: -100,
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,146,60,0.14) 0%, transparent 65%)',
          display: 'flex',
        }} />

        {/* Línea decorativa top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, transparent 0%, #FACC15 30%, #F59E0B 70%, transparent 100%)',
          display: 'flex',
        }} />

        {/* Línea decorativa bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent 0%, rgba(250,204,21,0.4) 50%, transparent 100%)',
          display: 'flex',
        }} />

        {/* Círculo decorativo derecha (simula vinilo) */}
        <div style={{
          position: 'absolute', right: -80, top: '50%',
          width: 520, height: 520,
          borderRadius: '50%',
          border: '2px solid rgba(250,204,21,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: 'translateY(-50%)',
        }}>
          <div style={{
            width: 380, height: 380, borderRadius: '50%',
            border: '1px solid rgba(250,204,21,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 240, height: 240, borderRadius: '50%',
              border: '1px solid rgba(250,204,21,0.08)',
              background: 'rgba(250,204,21,0.03)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'rgba(250,204,21,0.10)',
                border: '1px solid rgba(250,204,21,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 36 }}>🎵</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px 80px',
          gap: 0,
          maxWidth: 700,
          position: 'relative',
        }}>

          {/* Logos / organizadores */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#FACC15', borderRadius: 10,
              width: 36, height: 36, fontSize: 20,
            }}>🍕</div>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, fontWeight: 700 }}>PizzaDAO</span>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 22 }}>×</span>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(168,85,247,0.2)', borderRadius: 10,
              width: 36, height: 36, fontSize: 20,
              border: '1px solid rgba(168,85,247,0.3)',
            }}>🎵</div>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, fontWeight: 700 }}>Música W3</span>
          </div>

          {/* Badge convocatoria */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(250,204,21,0.12)',
            border: '1px solid rgba(250,204,21,0.3)',
            borderRadius: 999, padding: '6px 16px',
            width: 'fit-content', marginBottom: 20,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FACC15', display: 'flex' }} />
            <span style={{ color: '#FACC15', fontSize: 15, fontWeight: 800, letterSpacing: 1 }}>
              CONVOCATORIA ABIERTA
            </span>
          </div>

          {/* Título grande */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 18 }}>
            <span style={{
              color: 'white', fontSize: 72, fontWeight: 900, lineHeight: 1.0, letterSpacing: -2,
            }}>
              Postula tu
            </span>
            <span style={{
              color: '#FACC15', fontSize: 72, fontWeight: 900, lineHeight: 1.0, letterSpacing: -2,
            }}>
              canción
            </span>
          </div>

          {/* Subtítulo */}
          <span style={{
            color: 'rgba(255,255,255,0.55)', fontSize: 20, lineHeight: 1.5, marginBottom: 28,
          }}>
            Primer álbum en Español de PizzaDAO para el mundo hispanohablante.
          </span>

          {/* Badges premios + fecha */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 3,
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.3)',
              borderRadius: 16, padding: '14px 24px',
            }}>
              <span style={{ color: '#4ADE80', fontSize: 32, fontWeight: 900, lineHeight: 1 }}>$350 USDC</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: 2, fontWeight: 700 }}>EN PREMIOS</span>
            </div>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 3,
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 16, padding: '14px 24px',
            }}>
              <span style={{ color: '#F87171', fontSize: 32, fontWeight: 900, lineHeight: 1 }}>4 de mayo</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: 2, fontWeight: 700 }}>CIERRE</span>
            </div>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 3,
              background: 'rgba(250,204,21,0.06)',
              border: '1px solid rgba(250,204,21,0.2)',
              borderRadius: 16, padding: '14px 24px',
            }}>
              <span style={{ color: '#FDE68A', fontSize: 32, fontWeight: 900, lineHeight: 1 }}>CC0</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: 2, fontWeight: 700 }}>LICENCIA LIBRE</span>
            </div>
          </div>

          {/* URL abajo */}
          <span style={{
            color: 'rgba(255,255,255,0.18)', fontSize: 14, marginTop: 22, letterSpacing: 1,
          }}>
            pizzadao-mw3.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
