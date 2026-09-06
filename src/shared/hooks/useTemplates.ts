import { useQuery } from '@tanstack/react-query'
import { getTemplates } from '@/services/catalog.service.ts'
import { queryKeys } from '@/services/queryKeys.ts'

export function useTemplates() {
  return useQuery({
    queryKey: queryKeys.templates,
    queryFn: getTemplates,
  })
}
