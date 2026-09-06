import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/services/projects.service.ts'
import { queryKeys } from '@/services/queryKeys.ts'
import { useAuthStore } from '@/shared/store/authStore.ts'

export function useProjects() {
  const token = useAuthStore((state) => state.token)

  return useQuery({
    queryKey: [...queryKeys.projects, token],
    queryFn: getProjects,
  })
}
