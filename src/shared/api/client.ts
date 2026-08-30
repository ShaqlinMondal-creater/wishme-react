import { API_BASE_URL } from '@/shared/constants/config.ts'
import { useAuthStore } from '@/features/auth/store/authStore.ts'
import type { ApiEnvelope, ApiErrorBag } from '@/shared/api/types.ts'

export class ApiError extends Error {
  readonly status: number
  readonly errors: ApiErrorBag | undefined

  constructor(message: string, status: number, errors?: ApiErrorBag) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  return value as Record<string, unknown>
}

function asEnvelope(value: unknown): ApiEnvelope<unknown> | null {
  const record = asRecord(value)

  if (!record || typeof record.success !== 'boolean' || typeof record.message !== 'string') {
    return null
  }

  return record as ApiEnvelope<unknown>
}

function asErrorBag(value: unknown): ApiErrorBag | undefined {
  const record = asRecord(value)

  if (!record) {
    return undefined
  }

  const bag: ApiErrorBag = {}

  for (const [field, messages] of Object.entries(record)) {
    if (Array.isArray(messages) && messages.every((message) => typeof message === 'string')) {
      bag[field] = messages
    }
  }

  return Object.keys(bag).length > 0 ? bag : undefined
}

export function firstFieldError(errors: ApiErrorBag | undefined, field: string): string | undefined {
  return errors?.[field]?.[0]
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message
  }

  if (error instanceof TypeError) {
    return 'Cannot reach the WISHME API. Start api-wishme with php artisan serve.'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong. Please try again.'
}

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options
  const token = useAuthStore.getState().token

  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      credentials: 'omit',
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch (error) {
    throw error instanceof TypeError ? new ApiError(getApiErrorMessage(error), 0) : error
  }

  const json: unknown = await response.json().catch(() => null)
  const envelope = asEnvelope(json)
  const record = asRecord(json)
  const errors = envelope?.errors ?? asErrorBag(record?.errors)
  const message =
    envelope?.message ??
    (typeof record?.message === 'string' ? record.message : `Request failed with status ${response.status}`)

  if (!response.ok || envelope?.success === false) {
    if (response.status === 401 && token) {
      useAuthStore.getState().clearSession()
    }

    throw new ApiError(message, response.status, errors)
  }

  if (envelope) {
    return envelope.data as T
  }

  return json as T
}
