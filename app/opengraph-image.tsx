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
          background: 'linear-gradient(135deg, #1A1208 0%, #0A0A0F 60%, #1A0A02 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow amarillo fondo */}
        <div
          style={{
            position: 'absolute',
            left: -100,
            top: -100,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(250,204,21,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Glow verde derecha */}
        <div
          style={{
            position: 'absolute',
            right: -50,
            bottom: -50,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Bus imagen — derecha */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://pizzadao-mw3.vercel.app/assets/logo-mw3-pizzadao-nobg.png"
          alt=""
          style={{
            position: 'absolute',
            right: -60,
            bottom: -30,
            height: 560,
            width: 'auto',
            opacity: 0.92,
          }}
        />

        {/* Contenido izquierda */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px 70px',
            gap: 18,
            maxWidth: 660,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(250,204,21,0.12)',
              border: '1px solid rgba(250,204,21,0.35)',
              borderRadius: 999,
              padding: '7px 20px',
              width: 'fit-content',
            }}
          >
            <span style={{ color: '#FACC15', fontSize: 17, fontWeight: 800 }}>
              🎵 Convocatoria abierta · Cierra el 4 de mayo
            </span>
          </div>

          {/* Título */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ color: 'white', fontSize: 64, fontWeight: 900, lineHeight: 1.0 }}>
              Postula tu
            </span>
            <span style={{ color: '#FACC15', fontSize: 64, fontWeight: 900, lineHeight: 1.0 }}>
              canción 🎵
            </span>
          </div>

          {/* Subtitle */}
          <span style={{ color: 'rgba(255,255,255,0.60)', fontSize: 21, lineHeight: 1.4 }}>
            Primera convocatoria musical de PizzaDAO × MusicaW3 para el mundo hispanohablante.
          </span>

          {/* Premios + fecha */}
          <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
            <div
              style={{
                display: 'flex',
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: 14,
                padding: '12px 22px',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <span style={{ color: '#22C55E', fontSize: 30, fontWeight: 900 }}>$350 USDC</span>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, letterSpacing: 2 }}>EN PREMIOS</span>
            </div>
            <div
              style={{
                display: 'flex',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 14,
                padding: '12px 22px',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <span style={{ color: '#EF4444', fontSize: 30, fontWeight: 900 }}>4 de mayo</span>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, letterSpacing: 2 }}>CIERRE</span>
            </div>
            <div
              style={{
                display: 'flex',
                background: 'rgba(168,85,247,0.1)',
                border: '1px solid rgba(168,85,247,0.3)',
                borderRadius: 14,
                padding: '12px 22px',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <span style={{ color: '#A855F7', fontSize: 30, fontWeight: 900 }}>CC0</span>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, letterSpacing: 2 }}>LICENCIA LIBRE</span>
            </div>
          </div>

          {/* URL */}
          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 15, marginTop: 2 }}>
            pizzadao-mw3.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
