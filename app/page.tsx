'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PrizesSection from '@/components/PrizesSection'
import RulesSection from '@/components/RulesSection'
import VinylCTA from '@/components/VinylCTA'
import SubmitModal from '@/components/SubmitModal'
import Footer from '@/components/Footer'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Navbar onSubmitClick={() => setModalOpen(true)} />
      <main>
        <Hero onSubmitClick={() => setModalOpen(true)} />
        <PrizesSection onSubmitClick={() => setModalOpen(true)} />
        <RulesSection />
        <VinylCTA onSubmitClick={() => setModalOpen(true)} />
      </main>
      <Footer />
      <SubmitModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
