import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ApiError, firstFieldError, getApiErrorMessage } from '@/services/http.ts'
import registerImage from '@/assets/auth/register.png'
import { AuthPanel } from '@/views/auth/components/AuthPanel.tsx'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'
import type { ApiErrorBag } from '@/services/types.ts'

export function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<ApiErrorBag>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setFieldErrors(undefined)

    if (!name.trim() || !email.trim() || !password.trim() || !passwordConfirmation.trim()) {
      setError('Fill in your name, email and password.')
      return
    }

    setIsSubmitting(true)

    try {
      await register(name.trim(), email.trim(), password, passwordConfirmation)
      navigate(ROUTES.dashboard, { replace: true })
    } catch (caught) {
      setError(getApiErrorMessage(caught))
      setFieldErrors(caught instanceof ApiError ? caught.errors : undefined)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthPanel
      image={registerImage}
      imageAlt="A gold-ribboned gift and a ceremonial thread"
      panelEyebrow="Begin a keepsake"
      panelQuote="Make something they will keep."
      eyebrow="Begin"
      title="Create account"
      description="A quieter place to craft a wish for someone you love."
      footer={
        <p className="text-sm text-navy-muted">
          Already have an account?{' '}
          <Link to={ROUTES.login} className="text-gold-deep hover:text-navy">
            Sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-3" onSubmit={(event) => void onSubmit(event)}>
        <Input
          label="Name"
          inputSize="sm"
          autoComplete="name"
          value={name}
          error={firstFieldError(fieldErrors, 'name')}
          onChange={(event) => setName(event.target.value)}
        />
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
          autoComplete="new-password"
          value={password}
          error={firstFieldError(fieldErrors, 'password')}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Input
          label="Confirm password"
          type="password"
          inputSize="sm"
          autoComplete="new-password"
          value={passwordConfirmation}
          error={firstFieldError(fieldErrors, 'password')}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
        />
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Create account
        </Button>
      </form>
    </AuthPanel>
  )
}
