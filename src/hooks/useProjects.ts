import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys.ts'
import { fetchProjects } from '@/api/wishme.ts'

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: fetchProjects,
  })
}
