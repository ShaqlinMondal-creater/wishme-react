import { Link, useNavigate } from 'react-router-dom'
import { EmptyState } from '@/components/common/EmptyState.tsx'
import { LoadingState } from '@/components/common/LoadingState.tsx'
import { Card } from '@/components/ui/Card.tsx'
import { getButtonClasses } from '@/components/ui/buttonStyles.ts'
import { ROUTES } from '@/constants/routes.ts'
import { useAuth } from '@/hooks/useAuth.ts'
import { useProjects } from '@/hooks/useProjects.ts'
import { formatDate } from '@/utils/cn.ts'

export function OverviewPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: projects, isLoading } = useProjects()
  const firstName = user?.name.split(' ')[0] || 'there'
  const publishedCount = projects?.filter((project) => project.status === 'published').length ?? 0
  const draftCount = projects?.filter((project) => project.status === 'draft').length ?? 0

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Overview</p>
      <h1 className="mt-2 font-display text-4xl text-navy">Hello, {firstName}</h1>
      <p className="mt-2 text-navy-muted">Your wishes live here — drafts, scheduled moments, and keepsakes.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-navy-muted">Projects</p>
          <p className="mt-2 font-display text-4xl">{projects?.length ?? 0}</p>
        </Card>
        <Card>
          <p className="text-sm text-navy-muted">Drafts</p>
          <p className="mt-2 font-display text-4xl">{draftCount}</p>
        </Card>
        <Card>
          <p className="text-sm text-navy-muted">Published</p>
          <p className="mt-2 font-display text-4xl">{publishedCount}</p>
        </Card>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-3xl text-navy">Recent projects</h2>
        <Link to={ROUTES.createProject} className={getButtonClasses({ size: 'sm' })}>
          New wish
        </Link>
      </div>

      {isLoading ? (
        <LoadingState label="Loading projects…" />
      ) : !projects?.length ? (
        <EmptyState
          className="mt-6"
          title="No wishes yet"
          description="Create your first personalized digital wish. The editor will arrive in a later phase."
          actionLabel="Create a wish"
          onAction={() => navigate(ROUTES.createProject)}
        />
      ) : (
        <div className="mt-6 grid gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-navy">{project.title}</p>
                <p className="mt-1 text-sm text-navy-muted">
                  For {project.recipientName} · {project.occasion.replaceAll('-', ' ')} · updated{' '}
                  {formatDate(project.updatedAt)}
                </p>
              </div>
              <span className="text-xs tracking-[0.18em] text-gold-deep uppercase">{project.status}</span>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
