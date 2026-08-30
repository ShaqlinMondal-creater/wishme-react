import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api/queryKeys.ts'
import { fetchTemplates } from '@/shared/api/wishme.ts'

export function useTemplates() {
  return useQuery({
    queryKey: queryKeys.templates,
    queryFn: fetchTemplates,
  })
}
