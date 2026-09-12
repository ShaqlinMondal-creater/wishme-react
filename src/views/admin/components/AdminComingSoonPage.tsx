import { EmptyState } from '@/shared/components/common/EmptyState.tsx'

export function AdminComingSoonPage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">{eyebrow}</p>
      <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">{title}</h1>
      <p className="mt-2 text-navy-muted">{description}</p>
      <EmptyState
        className="mt-8"
        title={`${title} is next`}
        description="This screen is in the admin studio. The live module will land here."
      />
    </div>
  )
}
