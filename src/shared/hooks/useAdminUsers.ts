import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchAdminUsers, type AdminUsersQuery } from '@/services/admin.service.ts'
import { queryKeys } from '@/services/queryKeys.ts'

export function useAdminUsers(query: AdminUsersQuery = {}) {
  return useQuery({
    queryKey: [...queryKeys.adminUsers, query],
    queryFn: () => fetchAdminUsers(query),
    placeholderData: keepPreviousData,
  })
}
