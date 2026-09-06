import { type FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ApiError, firstFieldError, getApiErrorMessage } from '@/shared/api/client.ts'
import loginImage from '@/assets/auth/login.png'
import { AuthPanel } from '@/features/auth/components/AuthPanel.tsx'
import { DemoCredentialsCard } from '@/features/auth/components/DemoCredentialsCard.tsx'
import { DEMO_ADMIN } from '@/features/auth/data/demoAccounts.ts'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { homePathForRole, ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/features/auth/hooks/useAuth.ts'
import type { ApiErrorBag } from '@/shared/api/types.ts'

function getRedirectPath(state: unknown, role?: string | null) {
  if (
    state !== null &&
    typeof state === 'object' &&
    'from' in state &&
    typeof state.from === 'string' &&
    state.from.startsWith('/admin')
  ) {
    return state.from
  }

  return homePathForRole(role)
}

export function AdminLoginPage() {
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
      await login(email.trim(), password, 'admin')
      navigate(getRedirectPath(location.state, 'admin'), { replace: true })
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
      panelEyebrow="WISHME studio"
      panelQuote="The quiet side of the house."
      eyebrow="Staff"
      title="Admin sign in"
      description="Demo details are ready. This panel is for WishMe, not for the person making a wish."
      footer={
        <p className="text-sm text-navy-muted">
          Making a wish?{' '}
          <Link to={ROUTES.login} className="text-gold-deep hover:text-navy">
            Customer sign in
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
          Enter studio
        </Button>
      </form>
      <DemoCredentialsCard
        email={DEMO_ADMIN.email}
        password={DEMO_ADMIN.password}
        onFill={() => {
          setEmail(DEMO_ADMIN.email)
          setPassword(DEMO_ADMIN.password)
        }}
      />
    </AuthPanel>
  )
}
