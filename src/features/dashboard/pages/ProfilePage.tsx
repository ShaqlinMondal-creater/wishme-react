import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProfile } from '@/features/auth/api/auth.ts'
import { queryKeys } from '@/shared/api/queryKeys.ts'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Card } from '@/shared/components/ui/Card.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/features/auth/hooks/useAuth.ts'

export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const profileQuery = useQuery({
    queryKey: queryKeys.profile,
    queryFn: fetchProfile,
  })
  const profile = profileQuery.data?.user ?? user

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Account</p>
      <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Profile</h1>
      {profileQuery.isLoading ? (
        <LoadingState label="Loading profile…" />
      ) : (
        <Card className="mt-8 space-y-4">
          <Input label="Name" value={profile?.name ?? ''} readOnly />
          <Input label="Email" value={profile?.email ?? ''} readOnly />
          <Input label="Mobile" value={profile?.mobile_no ?? '—'} readOnly />
          <p className="text-sm text-navy-muted">
            Signed in as {profile?.role ?? 'customer'}. Profile editing will come in a later step.
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              void logout().then(() => navigate(ROUTES.home))
            }}
          >
            Sign out
          </Button>
        </Card>
      )}
    </div>
  )
}
