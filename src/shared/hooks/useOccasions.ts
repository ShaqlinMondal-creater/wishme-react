import { useQuery } from '@tanstack/react-query'
import { getOccasions } from '@/services/catalog.service.ts'
import { queryKeys } from '@/services/queryKeys.ts'

export function useOccasions() {
  return useQuery({
    queryKey: queryKeys.occasions,
    queryFn: getOccasions,
  })
}
