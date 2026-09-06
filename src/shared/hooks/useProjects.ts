import { useQuery } from '@tanstack/react-query'
import { isDemoToken } from '@/features/auth/data/demoAccounts.ts'
import { useAuthStore } from '@/features/auth/store/authStore.ts'
import { queryKeys } from '@/shared/api/queryKeys.ts'
import { fetchProjects } from '@/shared/api/wishme.ts'
import { projects as demoProjects } from '@/shared/data/projects.ts'

export function useProjects() {
  const token = useAuthStore((state) => state.token)

  return useQuery({
    queryKey: [...queryKeys.projects, token],
    queryFn: async () => {
      if (isDemoToken(token)) {
        return demoProjects
      }
      return fetchProjects()
    },
  })
}
