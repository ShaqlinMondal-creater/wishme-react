import { type FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ApiError, firstFieldError, getApiErrorMessage } from '@/services/http.ts'
import loginImage from '@/assets/auth/login.png'
import { AuthPanel } from '@/views/auth/components/AuthPanel.tsx'
import { DemoCredentialsCard } from '@/views/auth/components/DemoCredentialsCard.tsx'
import { DEMO_CUSTOMER } from '@/shared/data/demoAccounts.ts'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { homePathForRole, ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'
import { useAuthStore } from '@/shared/store/authStore.ts'
import type { ApiErrorBag } from '@/services/types.ts'

function getRedirectPath(state: unknown, role?: string | null) {
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

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<ApiErrorBag>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setFieldErrors(undefined)

    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password.')
      return
    }

    setIsSubmitting(true)

    try {
      await login(email.trim(), password)
      navigate(getRedirectPath(location.state, useAuthStore.getState().user?.role), { replace: true })
    } catch (caught) {
      setError(getApiErrorMessage(caught))
      setFieldErrors(caught instanceof ApiError ? caught.errors : undefined)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthPanel
      image={loginImage}
      imageAlt="A handwritten letter, gold seal and cream roses"
      panelEyebrow="A private moment"
      panelQuote="Wishes that feel held, not sent."
      eyebrow="Welcome back"
      title="Sign in"
      description="Continue a wish you started, or open the ones waiting for you."
      footer={
        <p className="text-sm text-navy-muted">
          New here?{' '}
          <Link to={ROUTES.register} className="text-gold-deep hover:text-navy">
            Create an account
          </Link>
          <span className="mx-2 text-navy-muted/50">·</span>
          <Link to={ROUTES.adminLogin} className="text-gold-deep hover:text-navy">
            Staff
          </Link>
        </p>
      }
    >
      <form className="space-y-3" onSubmit={(event) => void onSubmit(event)}>
        <Input
          label="Email"
          type="email"
          inputSize="sm"
          autoComplete="email"
          value={email}
          error={firstFieldError(fieldErrors, 'email')}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          label="Password"
          type="password"
          inputSize="sm"
          autoComplete="current-password"
          value={password}
          error={firstFieldError(fieldErrors, 'password')}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Continue
        </Button>
      </form>
      <DemoCredentialsCard
        email={DEMO_CUSTOMER.email}
        password={DEMO_CUSTOMER.password}
        onFill={() => {
          setEmail(DEMO_CUSTOMER.email)
          setPassword(DEMO_CUSTOMER.password)
        }}
      />
    </AuthPanel>
  )
}
