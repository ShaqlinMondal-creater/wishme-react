import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Card } from '@/shared/components/ui/Card.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useAuth } from '@/shared/hooks/useAuth.ts'

export function AdminProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Admin</p>
      <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Profile</h1>
      <Card className="mt-8 space-y-4">
        <Input label="Name" value={user?.name ?? ''} readOnly />
        <Input label="Email" value={user?.email ?? ''} readOnly />
        <Input label="Mobile" value={user?.mobile_no ?? '—'} readOnly />
        <Input label="Role" value="Admin" readOnly />
        <p className="text-sm text-navy-muted">Profile editing will come in a later step.</p>
        <Button
          variant="secondary"
          onClick={() => {
            void logout().then(() => navigate(ROUTES.adminLogin))
          }}
        >
          Sign out
        </Button>
      </Card>
    </div>
  )
}
