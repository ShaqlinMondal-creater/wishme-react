import { useQuery } from '@tanstack/react-query'
import { getPricingPlans } from '@/services/catalog.service.ts'
import { queryKeys } from '@/services/queryKeys.ts'

export function usePricingPlans() {
  return useQuery({
    queryKey: queryKeys.pricing,
    queryFn: getPricingPlans,
  })
}
