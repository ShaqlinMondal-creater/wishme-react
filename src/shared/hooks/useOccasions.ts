import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api/queryKeys.ts'
import { fetchOccasions } from '@/shared/api/wishme.ts'

export function useOccasions() {
  return useQuery({
    queryKey: queryKeys.occasions,
    queryFn: fetchOccasions,
  })
}
