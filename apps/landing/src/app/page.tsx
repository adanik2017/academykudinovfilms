import { Hero } from '@/sections/Hero'
import { Concept } from '@/sections/Concept'
import { Tools } from '@/sections/Tools'
import { Program } from '@/sections/Program'
import { Evidence } from '@/sections/Evidence'
import { Pricing } from '@/sections/Pricing'
import { FAQ } from '@/sections/FAQ'
import { Footer } from '@/sections/Footer'
import { Nav } from '@/sections/Nav'
import { LandingEffects } from '@/components/LandingEffects'

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Scroll progress bar */}
      <div
        id="scrollProgress"
        className="fixed top-[52px] left-0 z-[10001] h-0.5 w-0 bg-gradient-to-r from-amber to-yellow-400 transition-[width] duration-100"
      />

      <Nav />
      <main>
        <Hero />
        <Concept />
        <Tools />
        <Program />
        <Evidence />
        <Pricing />
        <FAQ />
      </main>
      <Footer />

      {/* Все scroll-анимации и эффекты */}
      <LandingEffects />
    </div>
  )
}
