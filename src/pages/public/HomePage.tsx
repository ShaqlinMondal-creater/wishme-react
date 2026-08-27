import { CtaSection } from '@/components/landing/CtaSection.tsx'
import { HeroSection } from '@/components/landing/HeroSection.tsx'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection.tsx'
import { MemorySection } from '@/components/landing/MemorySection.tsx'
import { OccasionsSection } from '@/components/landing/OccasionsSection.tsx'
import { PricingPreviewSection } from '@/components/landing/PricingPreviewSection.tsx'
import { TemplatesSection } from '@/components/landing/TemplatesSection.tsx'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <MemorySection />
      <OccasionsSection />
      <TemplatesSection />
      <HowItWorksSection />
      <PricingPreviewSection />
      <CtaSection />
    </>
  )
}
