import { CtaSection } from '@/features/marketing/components/CtaSection.tsx'
import { DemoWishSection } from '@/features/marketing/components/DemoWishSection.tsx'
import { HeroSection } from '@/features/marketing/components/HeroSection.tsx'
import { HowItWorksSection } from '@/features/marketing/components/HowItWorksSection.tsx'
import { MemorySection } from '@/features/marketing/components/MemorySection.tsx'
import { OccasionsSection } from '@/features/marketing/components/OccasionsSection.tsx'
import { PricingPreviewSection } from '@/features/marketing/components/PricingPreviewSection.tsx'
import { StoriesSection } from '@/features/marketing/components/StoriesSection.tsx'
import { TemplatesSection } from '@/features/marketing/components/TemplatesSection.tsx'

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
