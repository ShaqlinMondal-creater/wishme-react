import { useQuery } from '@tanstack/react-query'
import { fetchAdminTemplates, type AdminTemplatesQuery } from '@/services/admin.service.ts'
import { queryKeys } from '@/services/queryKeys.ts'

export function useAdminTemplates(query: AdminTemplatesQuery = {}) {
  return useQuery({
    queryKey: [...queryKeys.adminTemplates, query],
    queryFn: () => fetchAdminTemplates(query),
  })
}
