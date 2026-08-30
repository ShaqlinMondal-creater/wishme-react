import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api/queryKeys.ts'
import { fetchProjects } from '@/shared/api/wishme.ts'

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: fetchProjects,
  })
}
