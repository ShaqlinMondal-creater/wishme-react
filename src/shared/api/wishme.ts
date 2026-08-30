import { occasions } from '@/shared/data/occasions.ts'
import { pricingPlans } from '@/shared/data/pricing.ts'
import { projects } from '@/shared/data/projects.ts'
import { templates } from '@/shared/data/templates.ts'
import type { Occasion } from '@/shared/types/occasion.ts'
import type { PricingPlan } from '@/shared/types/pricing.ts'
import type { Project } from '@/shared/types/project.ts'
import type { Template } from '@/shared/types/template.ts'

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchOccasions(): Promise<Occasion[]> {
  await delay()
  return occasions
}

export async function fetchTemplates(): Promise<Template[]> {
  await delay()
  return templates
}

export async function fetchProjects(): Promise<Project[]> {
  await delay()
  return projects
}

export async function fetchPricingPlans(): Promise<PricingPlan[]> {
  await delay()
  return pricingPlans
}

export { apiClient, ApiError } from '@/shared/api/client.ts'
