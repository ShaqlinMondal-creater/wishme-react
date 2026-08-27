import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys.ts'
import { fetchTemplates } from '@/api/wishme.ts'

export function useTemplates() {
  return useQuery({
    queryKey: queryKeys.templates,
    queryFn: fetchTemplates,
  })
}
