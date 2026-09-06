import { occasions } from '@/shared/data/occasions.ts'
import { pricingPlans } from '@/shared/data/pricing.ts'
import { templates } from '@/shared/data/templates.ts'
import type { Occasion } from '@/shared/types/occasion.ts'
import type { PricingPlan } from '@/shared/types/pricing.ts'
import type { Template } from '@/shared/types/template.ts'

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getOccasions(): Promise<Occasion[]> {
  await delay()
  return occasions
}

export async function getTemplates(): Promise<Template[]> {
  await delay()
  return templates
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  await delay()
  return pricingPlans
}
