import type { User } from '@/shared/types/user.ts'

export type ApiErrorBag = Record<string, string[]>

export type ApiEnvelope<T> = {
  success: boolean
  message: string
  data?: T
  errors?: ApiErrorBag
}

export type AuthPayload = {
  token: string
  token_type: string
  user: User
}

export type ProfilePayload = {
  user: User
}
