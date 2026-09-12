import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProject, updateProject } from '@/services/projects.service.ts'
import { fetchProjectUploads } from '@/services/uploads.service.ts'
import { getApiErrorMessage } from '@/services/http.ts'
import { queryKeys } from '@/services/queryKeys.ts'
import { Button } from '@/shared/components/ui/Button.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import type { ContentEditTarget } from '@/views/admin/components/ContentEditModal.tsx'
import { WishContentStudio } from '@/views/wish/components/WishContentStudio.tsx'
import { contentForTemplate, setByPath } from '@/views/wish/content/mergeContent.ts'
import type { TemplateContent } from '@/shared/types/templateContent.ts'
import type { Upload } from '@/shared/types/upload.ts'

export function CustomerProjectContentPage() {
  const { id } = useParams()
  const projectId = Number(id)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [draft, setDraft] = useState<TemplateContent | null>(null)
  const [target, setTarget] = useState<ContentEditTarget | null>(null)
  const [savedMessage, setSavedMessage] = useState('')

  const projectQuery = useQuery({
    queryKey: [...queryKeys.projects, projectId],
    queryFn: () => getProject(projectId),
    enabled: Number.isFinite(projectId),
  })

  const uploadsQuery = useQuery({
    queryKey: queryKeys.projectUploads(projectId),
    queryFn: () => fetchProjectUploads(projectId),
    enabled: Number.isFinite(projectId),
  })

  const content = useMemo(() => {
    if (draft) {
      return draft
    }

    const project = projectQuery.data

    if (!project) {
      return contentForTemplate({ slug: '', content: null })
    }

    return contentForTemplate({
      slug: project.template_slug ?? '',
      cover: project.template_cover,
      content: project.content,
      occasion: project.occasion ? { type: project.occasion } : null,
    })
  }, [draft, projectQuery.data])

  const saveMutation = useMutation({
    mutationFn: (next: TemplateContent) =>
      updateProject(projectId, {
        recipient_name: next.gate.recipient,
        from_name: next.gate.from,
        content: next as unknown as Record<string, unknown>,
      }),
    onSuccess: (payload) => {
      queryClient.setQueryData([...queryKeys.projects, projectId], payload.project)
      void queryClient.invalidateQueries({ queryKey: queryKeys.projects })
      setSavedMessage('Content saved.')
    },
  })

  const persistField = (path: string, value: string | string[], upload?: Upload) => {
    const next = setByPath(content, path, value)
    setDraft(next)
    setTarget(null)
    setSavedMessage(upload ? `Saved to uploads #${upload.id}` : '')
    saveMutation.mutate(next)
    if (upload) {
      void queryClient.invalidateQueries({ queryKey: queryKeys.projectUploads(projectId) })
    }
  }

  if (!Number.isFinite(projectId)) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-[#070f1c] px-6 text-center">
        <p className="text-sm text-gold-soft">This wish could not be opened.</p>
        <Button className="mt-6" onClick={() => navigate(ROUTES.projects)}>
          Back to projects
        </Button>
      </div>
    )
  }

  if (projectQuery.isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#070f1c] text-sm tracking-wide text-gold">
        Opening your wish…
      </div>
    )
  }

  const project = projectQuery.data

  if (projectQuery.isError || !project) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-[#070f1c] px-6 text-center">
        <p className="text-sm text-gold-soft">
          {projectQuery.isError ? getApiErrorMessage(projectQuery.error) : 'This wish could not be opened.'}
        </p>
        <Button className="mt-6" onClick={() => navigate(ROUTES.projects)}>
          Back to projects
        </Button>
      </div>
    )
  }

  return (
    <WishContentStudio
      backTo={ROUTES.projects}
      backLabel="← Projects"
      heading={project.title}
      owner={{ type: 'project', id: projectId }}
      templateName={project.template_name ?? 'Wish'}
      rooms={project}
      content={content}
      uploads={uploadsQuery.data?.uploads ?? []}
      target={target}
      savedMessage={savedMessage}
      saveError={saveMutation.isError ? getApiErrorMessage(saveMutation.error) : undefined}
      isSaving={saveMutation.isPending}
      onSaveAll={() => saveMutation.mutate(content)}
      onEditClose={() => setTarget(null)}
      onPersist={persistField}
      onEdit={setTarget}
    />
  )
}
