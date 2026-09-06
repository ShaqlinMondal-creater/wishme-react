import {
  demoAdminCustomers,
  demoAdminStats,
  demoAdminWishes,
  type DemoCustomerRow,
  type DemoWishRow,
} from '@/shared/data/demoAdmin.ts'

export function getAdminStats() {
  return demoAdminStats
}

export function getAdminCustomers(): DemoCustomerRow[] {
  return demoAdminCustomers
}

export function getAdminWishes(): DemoWishRow[] {
  return demoAdminWishes
}
