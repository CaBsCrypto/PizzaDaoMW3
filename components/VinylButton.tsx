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
}

export default function VinylButton({
  label,
  onClick,
  centerGradient = "from-red-600 to-yellow-500",
  size = "w-28 h-28",
  ariaLabel,
  buttonText,
  buttonStyle
}: VinylButtonProps) {
  // Create a unique ID for the textPath to avoid collisions if multiple are rendered
  const pathId = React.useId().replace(/:/g, '');

  return (
    <div className={`flex-shrink-0 flex flex-col items-center gap-1 ${size}`}>
      <button 
        onClick={onClick} 
        className={`group relative ${size} cursor-pointer focus:outline-none`} 
        aria-label={ariaLabel || label}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border-4 border-zinc-700 shadow-2xl shadow-yellow-400/10 group-active:shadow-yellow-400/30 lg:group-hover:shadow-yellow-400/30 transition-all duration-300 vinyl-spin">
          {[90, 80, 70, 60, 50, 40].map((s) => (
            <div 
              key={s} 
              className="absolute inset-0 m-auto rounded-full border border-white/5" 
              style={{ width: `${s}%`, height: `${s}%` }} 
            />
          ))}
          <div className={`absolute inset-0 m-auto w-[50%] h-[50%] rounded-full bg-gradient-to-br ${centerGradient} shadow-lg overflow-hidden`}>
            <svg width="64" height="64" viewBox="0 0 64 64" className="absolute inset-0 w-full h-full">
              <defs>
                <path id={pathId} d="M 32,32 m -20,0 a 20,20 0 1,1 40,0 a 20,20 0 1,1 -40,0" />
              </defs>
              <text fontSize="6.5" fill="white" fontWeight="bold" letterSpacing="3.2" opacity="0.95">
                <textPath href={`#${pathId}`}>{label} · {label} · </textPath>
              </text>
            </svg>
          </div>
          <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-black" />
        </div>
        <div className="absolute inset-0 rounded-full ring-0 ring-yellow-400/0 group-active:ring-4 group-active:ring-yellow-400/40 lg:group-hover:ring-4 lg:group-hover:ring-yellow-400/40 transition-all duration-300" />
      </button>
      
      {buttonText && (
        <button
          onClick={onClick}
          style={buttonStyle}
          className="w-full text-[10px] lg:text-xs font-bold px-2 py-1 lg:py-1.5 rounded-full whitespace-nowrap text-center"
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}
