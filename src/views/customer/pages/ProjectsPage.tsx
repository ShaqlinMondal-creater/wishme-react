import { Link, useNavigate } from 'react-router-dom'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { Card } from '@/shared/components/ui/Card.tsx'
import { Button } from '@/shared/components/ui/Button.tsx'
import { ROUTES, projectContentPath } from '@/shared/constants/routes.ts'
import { useProjects } from '@/shared/hooks/useProjects.ts'
import { formatDate } from '@/shared/lib/formatDate.ts'
import { getApiErrorMessage } from '@/services/http.ts'

export function ProjectsPage() {
  const navigate = useNavigate()
  const { data: projects, isLoading, isError, error, refetch } = useProjects()

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
      ) : isError ? (
        <EmptyState
          className="mt-8"
          title="Could not load projects"
          description={getApiErrorMessage(error)}
          actionLabel="Try again"
          onAction={() => void refetch()}
        />
      ) : !projects?.length ? (
        <EmptyState
          className="mt-8"
          title="Nothing here yet"
          description="Create a draft wish, then edit every room with gold pencils."
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
                    Recipient {project.recipient_name} · last edited {formatDate(project.updated_at ?? '')}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs tracking-[0.18em] text-gold-deep uppercase">{project.status}</span>
                  <Link to={projectContentPath(project.id)} className="text-sm text-gold-deep hover:text-navy">
                    Edit
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
