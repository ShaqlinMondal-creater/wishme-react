import { apiClient } from '@/services/http.ts'
import type { AuthPayload, ProfilePayload } from '@/services/types.ts'
import { isDemoToken, matchDemoAccount } from '@/shared/data/demoAccounts.ts'
import type { User } from '@/shared/types/user.ts'

export async function login(
  email: string,
  password: string,
  role: 'customer' | 'admin' = 'customer',
): Promise<AuthPayload> {
  const demo = matchDemoAccount(email, password, role)
  if (demo) {
    return {
      token: demo.token,
      token_type: 'Bearer',
      user: demo.user,
    }
  }

  return apiClient<AuthPayload>('/login', {
    method: 'POST',
    body: { email, password, role },
  })
}

export async function register(
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
): Promise<AuthPayload> {
  return apiClient<AuthPayload>('/register', {
    method: 'POST',
    body: {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    },
  })
}

export async function logout(token: string | null): Promise<void> {
  if (!token || isDemoToken(token)) {
    return
  }

  await apiClient<null>('/logout', { method: 'POST' })
}

export async function getProfile(token: string | null, currentUser?: User | null): Promise<ProfilePayload> {
  if (isDemoToken(token) && currentUser) {
    return { user: currentUser }
  }

  return apiClient<ProfilePayload>('/profile')
}
