import { useNavigate } from 'react-router-dom'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { Card } from '@/shared/components/ui/Card.tsx'
import { Button } from '@/shared/components/ui/Button.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import { useProjects } from '@/shared/hooks/useProjects.ts'
import { formatDate } from '@/shared/lib/formatDate.ts'

export function ProjectsPage() {
  const navigate = useNavigate()
  const { data: projects, isLoading } = useProjects()

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Library</p>
          <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">My Projects</h1>
        </div>
        <Button onClick={() => navigate(ROUTES.createProject)}>Create a wish</Button>
      </div>

      {isLoading ? (
        <LoadingState label="Loading projects…" />
      ) : !projects?.length ? (
        <EmptyState
          className="mt-8"
          title="Nothing here yet"
          description="Your drafts and published wishes will appear in this list."
          actionLabel="Create a wish"
          onAction={() => navigate(ROUTES.createProject)}
        />
      ) : (
        <div className="mt-8 grid gap-4">
          {projects.map((project) => (
            <Card key={project.id} hover>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-2xl text-navy">{project.title}</h2>
                  <p className="mt-1 text-sm text-navy-muted">
                    Recipient {project.recipientName} · last edited {formatDate(project.updatedAt)}
                  </p>
                </div>
                <span className="text-xs tracking-[0.18em] text-gold-deep uppercase">
                  {project.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
