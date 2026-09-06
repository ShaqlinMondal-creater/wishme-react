import { apiClient } from '@/shared/api/client.ts'
import type { AuthPayload, ProfilePayload } from '@/shared/api/types.ts'

export function loginRequest(
  email: string,
  password: string,
  role: 'customer' | 'admin' = 'customer',
): Promise<AuthPayload> {
  return apiClient<AuthPayload>('/login', {
    method: 'POST',
    body: { email, password, role },
  })
}

export function registerRequest(
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

export function fetchProfile(): Promise<ProfilePayload> {
  return apiClient<ProfilePayload>('/profile')
}

export function logoutRequest(): Promise<null> {
  return apiClient<null>('/logout', { method: 'POST' })
}
