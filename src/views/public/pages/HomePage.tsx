import { CtaSection } from '@/views/public/components/CtaSection.tsx'
import { DemoWishSection } from '@/views/public/components/DemoWishSection.tsx'
import { HeroSection } from '@/views/public/components/HeroSection.tsx'
import { HowItWorksSection } from '@/views/public/components/HowItWorksSection.tsx'
import { MemorySection } from '@/views/public/components/MemorySection.tsx'
import { OccasionsSection } from '@/views/public/components/OccasionsSection.tsx'
import { PricingPreviewSection } from '@/views/public/components/PricingPreviewSection.tsx'
import { StoriesSection } from '@/views/public/components/StoriesSection.tsx'
import { TemplatesSection } from '@/views/public/components/TemplatesSection.tsx'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <MemorySection />
      <DemoWishSection />
      <OccasionsSection />
      <TemplatesSection />
      <HowItWorksSection />
      <StoriesSection />
      <PricingPreviewSection />
      <CtaSection />
    </>
  )
}
