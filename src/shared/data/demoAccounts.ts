import type { User } from '@/shared/types/user.ts'

export type DemoAccount = {
  email: string
  password: string
  token: string
  user: User
}

export const DEMO_CUSTOMER: DemoAccount = {
  email: 'arjun@wishme.demo',
  password: 'WishMe123',
  token: 'demo-token-customer',
  user: {
    id: 101,
    name: 'Arjun Mehta',
    email: 'arjun@wishme.demo',
    mobile_no: '+91 98765 43210',
    role: 'customer',
    dob: '1996-03-14',
    auth_provider: 'email',
    is_active: true,
    is_loggedin: true,
  },
}

export const DEMO_ADMIN: DemoAccount = {
  email: 'admin@wishme.demo',
  password: 'Admin123!',
  token: 'demo-token-admin',
  user: {
    id: 1,
    name: 'WishMe Admin',
    email: 'admin@wishme.demo',
    mobile_no: '+91 90000 00001',
    role: 'admin',
    dob: null,
    auth_provider: 'email',
    is_active: true,
    is_loggedin: true,
  },
}

export function matchDemoAccount(email: string, password: string, role: 'customer' | 'admin'): DemoAccount | null {
  const account = role === 'admin' ? DEMO_ADMIN : DEMO_CUSTOMER
  if (email.trim().toLowerCase() === account.email && password === account.password) {
    return account
  }
  return null
}

export function isDemoToken(token: string | null | undefined) {
  return token === DEMO_CUSTOMER.token || token === DEMO_ADMIN.token
}

export function isAdminRole(role: string | null | undefined) {
  return role === 'admin'
}
