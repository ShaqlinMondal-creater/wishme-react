import { useQuery } from '@tanstack/react-query'
import { fetchAdminCouponUses, type AdminCouponUsesQuery } from '@/services/admin.service.ts'
import { queryKeys } from '@/services/queryKeys.ts'

export function useAdminCouponUses(query: AdminCouponUsesQuery = {}) {
  return useQuery({
    queryKey: [...queryKeys.adminCouponUses, query],
    queryFn: () => fetchAdminCouponUses(query),
  })
}
