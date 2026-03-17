'use client'

import { useEffect } from 'react'

const COLORS = [
  '#EF4444', '#F59E0B', '#FACC15', '#22C55E',
  '#A855F7', '#3B82F6', '#EC4899', '#06B6D4',
  '#F97316', '#84CC16',
]

interface Particle {
  x: number; y: number
  vx: number; vy: number
  color: string
  w: number; h: number
  rotation: number; rotationSpeed: number
  gravity: number; opacity: number
  shape: 'rect' | 'circle'
  life: number; maxLife: number
}

function randomColor() { return COLORS[Math.floor(Math.random() * COLORS.length)] }

function spawnParticle(canvasW: number, canvasH: number, side?: 'left' | 'right' | 'top'): Particle {
  let x: number, y: number, vx: number, vy: number

  if (side === 'left') {
    x = -10; y = Math.random() * canvasH * 0.7
    vx = 2 + Math.random() * 4; vy = -2 + Math.random() * 5
  } else if (side === 'right') {
    x = canvasW + 10; y = Math.random() * canvasH * 0.7
    vx = -(2 + Math.random() * 4); vy = -2 + Math.random() * 5
  } else {
    x = Math.random() * canvasW; y = -10
    vx = -3 + Math.random() * 6; vy = 2 + Math.random() * 4
  }

  const maxLife = 220 + Math.random() * 160
  return {
    x, y, vx, vy,
    color: randomColor(),
    w: 7 + Math.random() * 13,
    h: 5 + Math.random() * 10,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (-0.08 + Math.random() * 0.16),
    gravity: 0.06 + Math.random() * 0.04,
    opacity: 1,
    shape: Math.random() > 0.5 ? 'rect' : 'circle',
    life: 0, maxLife,
  }
}

export default function ConfettiOverlay() {
  useEffect(() => {
    // Crear canvas y pegarlo al body
    const canvas = document.createElement('canvas')
    canvas.style.cssText = `
      position: fixed; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 9990;
    `
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')!
    let rafId: number
    let spawnTimer = 0
    const particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Burst inicial más intenso
    for (let i = 0; i < 160; i++) {
      const side = Math.random() < 0.33 ? 'left' : Math.random() < 0.5 ? 'right' : 'top'
      const p = spawnParticle(canvas.width, canvas.height, side)
      p.life = Math.random() * 40 // stagger inicial
      particles.push(p)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn continuo — 40% menos que el burst inicial
      spawnTimer++
      if (spawnTimer % 16 === 0) {
        for (let i = 0; i < 2; i++) particles.push(spawnParticle(canvas.width, canvas.height, 'left'))
        for (let i = 0; i < 2; i++) particles.push(spawnParticle(canvas.width, canvas.height, 'right'))
      }
      if (spawnTimer % 27 === 0) {
        for (let i = 0; i < 2; i++) particles.push(spawnParticle(canvas.width, canvas.height, 'top'))
      }

      // Update + draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy += p.gravity
        p.vx *= 0.99
        p.rotation += p.rotationSpeed

        // Fade out en el último 30% de vida
        const fadeStart = p.maxLife * 0.7
        if (p.life > fadeStart) {
          p.opacity = 1 - (p.life - fadeStart) / (p.maxLife - fadeStart)
        }

        // Eliminar si murió o salió por abajo
        if (p.life >= p.maxLife || p.y > canvas.height + 20) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = Math.max(0, p.opacity) * 0.85
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.fillStyle = p.color

        if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        }
        ctx.restore()
      }

      rafId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      document.body.removeChild(canvas)
    }
  }, [])

  return null
}
