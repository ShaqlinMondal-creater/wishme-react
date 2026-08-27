import { occasions } from '@/data/occasions.ts'
import { pricingPlans } from '@/data/pricing.ts'
import { projects } from '@/data/projects.ts'
import { templates } from '@/data/templates.ts'
import type { Occasion } from '@/types/occasion.ts'
import type { PricingPlan } from '@/types/pricing.ts'
import type { Project } from '@/types/project.ts'
import type { Template } from '@/types/template.ts'

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

export { apiClient, ApiError } from '@/api/client.ts'
