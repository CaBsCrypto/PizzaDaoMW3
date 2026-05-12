'use client'

import React from 'react'

interface VinylButtonProps {
  label: string
  onClick: () => void
  centerGradient?: string
  size?: string
  ariaLabel?: string
  buttonText?: string
  buttonStyle?: React.CSSProperties
  overlayText?: string
}

export default function VinylButton({
  label,
  onClick,
  centerGradient = "from-red-600 to-yellow-500",
  size = "w-28 h-28",
  ariaLabel,
  buttonText,
  buttonStyle,
  overlayText
}: VinylButtonProps) {
  // Create a unique ID for the textPath to avoid collisions if multiple are rendered
  const pathId = React.useId().replace(/:/g, '');

  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-1">
      <button 
        onClick={overlayText === 'SOON' ? undefined : onClick} 
        className={`group relative ${size} cursor-pointer focus:outline-none ${overlayText === 'SOON' ? 'opacity-80' : ''}`} 
        aria-label={ariaLabel || label}
      >
        {/* Spinning Vinyl */}
        <div 
          className="w-full h-full rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border-4 border-zinc-700 shadow-2xl transition-all duration-300 vinyl-spin overflow-hidden"
          style={{ boxShadow: label.includes('VOTA') ? '0 0 20px rgba(168,85,247,0.2)' : '0 0 20px rgba(234,179,8,0.2)' }}
        >
          {[90, 80, 70, 60, 50, 40].map((s) => (
            <div 
              key={s} 
              className="absolute inset-0 m-auto rounded-full border border-white/5" 
              style={{ width: `${s}%`, height: `${s}%` }} 
            />
          ))}
          <div className={`absolute inset-0 m-auto w-[50%] h-[50%] rounded-full bg-gradient-to-br ${centerGradient} shadow-lg overflow-hidden flex items-center justify-center`}>
            <svg width="100%" height="100%" viewBox="0 0 64 64" className="absolute inset-0">
              <defs>
                <path id={pathId} d="M 32,32 m -20,0 a 20,20 0 1,1 40,0 a 20,20 0 1,1 -40,0" />
              </defs>
              <text fontSize="7" fill="white" fontWeight="900" letterSpacing="2.5">
                <textPath href={`#${pathId}`}>{label} · {label} · </textPath>
              </text>
            </svg>
            <div className="w-2 h-2 rounded-full bg-black z-10" />
          </div>
        </div>
        
        {/* Static Overlay Banner */}
        {overlayText && (
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] bg-red-600/90 backdrop-blur-sm border-y border-red-400 py-1.5 -rotate-[-25deg] flex items-center justify-center shadow-2xl">
              <span className="text-white font-black text-[10px] lg:text-[11px] tracking-[0.4em] uppercase">
                {overlayText}
              </span>
            </div>
          </div>
        )}
      </button>
      
      {buttonText && (
        <button
          onClick={overlayText === 'SOON' ? undefined : onClick}
          style={overlayText === 'SOON' ? undefined : buttonStyle}
          className={`w-full text-[10px] font-black px-2 py-1.5 rounded-full whitespace-nowrap text-center mt-1 uppercase tracking-tighter ${overlayText === 'SOON' ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed' : ''}`}
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}
