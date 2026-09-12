import { homePathForRole } from '@/shared/constants/routes.ts'

export function getAuthRedirectPath(state: unknown, role?: string | null) {
  if (
    state !== null &&
    typeof state === 'object' &&
    'from' in state &&
    typeof state.from === 'string' &&
    state.from.startsWith('/') &&
    !state.from.startsWith('/admin')
  ) {
    return state.from
  }

  return homePathForRole(role)
}
