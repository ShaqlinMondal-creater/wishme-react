import { apiClient } from '@/services/http.ts'
import type { AuthPayload, ProfilePayload } from '@/services/types.ts'

export async function login(
  email: string,
  password: string,
  role: 'customer' | 'admin' = 'customer',
): Promise<AuthPayload> {
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

export async function logout(): Promise<void> {
  await apiClient<null>('/logout', { method: 'POST' })
}

export async function getProfile(): Promise<ProfilePayload> {
  return apiClient<ProfilePayload>('/profile')
}
