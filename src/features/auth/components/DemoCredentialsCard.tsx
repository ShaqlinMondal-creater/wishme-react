import { Card } from '@/shared/components/ui/Card.tsx'
import { Button } from '@/shared/components/ui/Button.tsx'

type DemoCredentialsCardProps = {
  email: string
  password: string
  onFill: () => void
}

export function DemoCredentialsCard({ email, password, onFill }: DemoCredentialsCardProps) {
  return (
    <Card padding="sm" className="mt-4 bg-ivory">
      <p className="text-[10px] tracking-[0.2em] text-gold-deep uppercase">Demo access</p>
      <p className="mt-2 text-sm text-navy">
        {email}
        <span className="mx-2 text-navy-muted">·</span>
        {password}
      </p>
      <Button type="button" variant="ghost" size="sm" className="mt-3" onClick={onFill}>
        Use demo details
      </Button>
    </Card>
  )
}
