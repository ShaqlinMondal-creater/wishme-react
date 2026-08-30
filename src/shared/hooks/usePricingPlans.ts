import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api/queryKeys.ts'
import { fetchPricingPlans } from '@/shared/api/wishme.ts'

export function usePricingPlans() {
  return useQuery({
    queryKey: queryKeys.pricing,
    queryFn: fetchPricingPlans,
  })
}
