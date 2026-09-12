import { apiClient } from '@/services/http.ts'
import { pricingPlans } from '@/shared/data/pricing.ts'
import type { Occasion, OccasionType } from '@/shared/types/occasion.ts'
import type { PricingPlan } from '@/shared/types/pricing.ts'
import type { Template } from '@/shared/types/template.ts'

export type OccasionsPayload = {
  occasions: Occasion[]
}

export type OccasionPayload = {
  occasion: Occasion
}

export type TemplatesPayload = {
  templates: Template[]
}

export type TemplatePayload = {
  template: Template
}

export async function getOccasions(): Promise<Occasion[]> {
  const payload = await apiClient<OccasionsPayload>('/occasions')
  return payload.occasions
}

export async function getOccasion(id: number): Promise<Occasion> {
  const payload = await apiClient<OccasionPayload>(`/occasions/${id}`)
  return payload.occasion
}

export async function getTemplates(filter?: { occasion_id?: number; type?: OccasionType }): Promise<Template[]> {
  const params = new URLSearchParams()

  if (filter?.occasion_id != null) {
    params.set('occasion_id', String(filter.occasion_id))
  }

  if (filter?.type) {
    params.set('type', filter.type)
  }

  const qs = params.toString()
  const payload = await apiClient<TemplatesPayload>(`/templates${qs ? `?${qs}` : ''}`)
  return payload.templates
}

export async function getTemplate(idOrSlug: string): Promise<Template> {
  const payload = await apiClient<TemplatePayload>(`/templates/${encodeURIComponent(idOrSlug)}`)
  return payload.template
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  return pricingPlans
}
