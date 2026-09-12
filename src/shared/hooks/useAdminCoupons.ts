import { useQuery } from '@tanstack/react-query'
import { fetchAdminCoupons, type AdminCouponsQuery } from '@/services/admin.service.ts'
import { queryKeys } from '@/services/queryKeys.ts'

export function useAdminCoupons(query: AdminCouponsQuery = {}) {
  return useQuery({
    queryKey: [...queryKeys.adminCoupons, query],
    queryFn: () => fetchAdminCoupons(query),
  })
}
