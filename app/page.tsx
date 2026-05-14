'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AllianceBanner from '@/components/AllianceBanner'
import GameSection from '@/components/GameSection'
import Footer from '@/components/Footer'
import RulesNavSection from '@/components/RulesNavSection'

// Dynamic imports for components not needed for initial paint
const ConfettiOverlay = dynamic(() => import('@/components/ConfettiOverlay'), { ssr: false })
const BasesModal = dynamic(() => import('@/components/BasesModal'), { ssr: false })
const SubmitModal = dynamic(() => import('@/components/SubmitModal'), { ssr: false })
const VotingRulesModal = dynamic(() => import('@/components/VotingRulesModal'), { ssr: false })

export default function Home() {
  const [basesOpen, setBasesOpen] = useState(false)
  const [submitOpen, setSubmitOpen] = useState(false)
  const [votingRulesOpen, setVotingRulesOpen] = useState(false)

  return (
    <>
      <ConfettiOverlay />
      <Navbar onSubmitClick={() => setBasesOpen(true)} />
      <main>
        <Hero onSubmitClick={() => setBasesOpen(true)} />
        <AllianceBanner />
        <RulesNavSection 
          onBasesClick={() => setBasesOpen(true)}
          onVotingRulesClick={() => setVotingRulesOpen(true)}
        />
        <GameSection />
      </main>
      <Footer />
      
      {basesOpen && (
        <BasesModal
          isOpen={basesOpen}
          onClose={() => setBasesOpen(false)}
          onSubmitClick={() => setSubmitOpen(true)}
        />
      )}
      
      {submitOpen && (
        <SubmitModal isOpen={submitOpen} onClose={() => setSubmitOpen(false)} />
      )}
      
      {votingRulesOpen && (
        <VotingRulesModal isOpen={votingRulesOpen} onClose={() => setVotingRulesOpen(false)} />
      )}
    </>
  )
}
