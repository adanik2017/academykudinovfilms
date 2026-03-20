import { Hero } from '@/sections/Hero'
import { Concept } from '@/sections/Concept'
import { Program } from '@/sections/Program'
import { Pricing } from '@/sections/Pricing'
import { FAQ } from '@/sections/FAQ'
import { Footer } from '@/sections/Footer'
import { Nav } from '@/sections/Nav'

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Concept />
        <Program />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
