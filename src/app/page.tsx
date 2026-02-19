import Hero from '@/components/sections/Hero'
import HowItWorks from '@/components/sections/HowItWorks'
import Gallery from '@/components/sections/Gallery'
import Pricing from '@/components/sections/Pricing'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Gallery />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  )
}
