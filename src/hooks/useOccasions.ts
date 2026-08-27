import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys.ts'
import { fetchOccasions } from '@/api/wishme.ts'

export function useOccasions() {
  return useQuery({
    queryKey: queryKeys.occasions,
    queryFn: fetchOccasions,
  })
}
