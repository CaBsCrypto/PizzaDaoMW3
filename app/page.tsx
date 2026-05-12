'use client'

export const dynamic = 'force-dynamic'

import { useState, Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AllianceBanner from '@/components/AllianceBanner'
import GameSection from '@/components/GameSection'
import SubmitModal from '@/components/SubmitModal'
import BasesModal from '@/components/BasesModal'
import Footer from '@/components/Footer'
import ConfettiOverlay from '@/components/ConfettiOverlay'

export default function Home() {
  const [basesOpen, setBasesOpen] = useState(false)
  const [submitOpen, setSubmitOpen] = useState(false)

  return (
    <>
      <ConfettiOverlay />
      <Navbar onBasesClick={() => setBasesOpen(true)} onSubmitClick={() => setBasesOpen(true)} />
      <main>
        <Suspense fallback={<div className="min-h-screen bg-[#1A1208]" />}>
          <Hero onSubmitClick={() => setBasesOpen(true)} />
        </Suspense>
        <AllianceBanner />
        <GameSection />
      </main>
      <Footer />
      <BasesModal
        isOpen={basesOpen}
        onClose={() => setBasesOpen(false)}
        onSubmitClick={() => setSubmitOpen(true)}
      />
      <SubmitModal isOpen={submitOpen} onClose={() => setSubmitOpen(false)} />
    </>
  )
}
