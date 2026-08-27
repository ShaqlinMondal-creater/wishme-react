import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys.ts'
import { fetchPricingPlans } from '@/api/wishme.ts'

export function usePricingPlans() {
  return useQuery({
    queryKey: queryKeys.pricing,
    queryFn: fetchPricingPlans,
  })
}
