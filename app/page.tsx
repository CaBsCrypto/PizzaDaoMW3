'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AllianceBanner from '@/components/AllianceBanner'
import GameSection from '@/components/GameSection'
import SubmitModal from '@/components/SubmitModal'
import BasesModal from '@/components/BasesModal'
import Footer from '@/components/Footer'
import ConfettiOverlay from '@/components/ConfettiOverlay'

import RulesNavSection from '@/components/RulesNavSection'
import VotingRulesModal from '@/components/VotingRulesModal'

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
      <BasesModal
        isOpen={basesOpen}
        onClose={() => setBasesOpen(false)}
        onSubmitClick={() => setSubmitOpen(true)}
      />
      <SubmitModal isOpen={submitOpen} onClose={() => setSubmitOpen(false)} />
      <VotingRulesModal isOpen={votingRulesOpen} onClose={() => setVotingRulesOpen(false)} />
    </>
  )
}
