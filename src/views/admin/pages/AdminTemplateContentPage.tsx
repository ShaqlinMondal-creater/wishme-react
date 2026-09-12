import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  fetchAdminTemplate,
  updateAdminTemplateContent,
} from '@/services/admin.service.ts'
import { fetchTemplateUploads } from '@/services/uploads.service.ts'
import { getApiErrorMessage } from '@/services/http.ts'
import { queryKeys } from '@/services/queryKeys.ts'
import { Button } from '@/shared/components/ui/Button.tsx'
import { ROUTES } from '@/shared/constants/routes.ts'
import type { ContentEditTarget } from '@/views/admin/components/ContentEditModal.tsx'
import { WishContentStudio } from '@/views/wish/components/WishContentStudio.tsx'
import { contentForTemplate, setByPath } from '@/views/wish/content/mergeContent.ts'
import type { TemplateContent } from '@/shared/types/templateContent.ts'
import type { Upload } from '@/shared/types/upload.ts'

export function AdminTemplateContentPage() {
  const { id } = useParams()
  const templateId = Number(id)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [draft, setDraft] = useState<TemplateContent | null>(null)
  const [target, setTarget] = useState<ContentEditTarget | null>(null)
  const [savedMessage, setSavedMessage] = useState('')

  const templateQuery = useQuery({
    queryKey: [...queryKeys.adminTemplates, templateId],
    queryFn: () => fetchAdminTemplate(templateId),
    enabled: Number.isFinite(templateId),
  })

  const uploadsQuery = useQuery({
    queryKey: queryKeys.templateUploads(templateId),
    queryFn: () => fetchTemplateUploads(templateId),
    enabled: Number.isFinite(templateId),
  })

  const content = useMemo(() => {
    if (draft) {
      return draft
    }

    const template = templateQuery.data?.template

    if (!template) {
      return contentForTemplate({ slug: '', content: null })
    }

    return contentForTemplate(template)
  }, [draft, templateQuery.data?.template])

  const saveMutation = useMutation({
    mutationFn: (next: TemplateContent) =>
      updateAdminTemplateContent(templateId, next as unknown as Record<string, unknown>),
    onSuccess: (payload) => {
      queryClient.setQueryData([...queryKeys.adminTemplates, templateId], payload)
      void queryClient.invalidateQueries({ queryKey: queryKeys.adminTemplates })
      void queryClient.invalidateQueries({ queryKey: queryKeys.templates })
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
      void queryClient.invalidateQueries({ queryKey: queryKeys.templateUploads(templateId) })
    }
  }

  if (!Number.isFinite(templateId)) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-[#070f1c] px-6 text-center">
        <p className="text-sm text-gold-soft">This template could not be opened.</p>
        <Button className="mt-6" onClick={() => navigate(ROUTES.adminTemplates)}>
          Back to templates
        </Button>
      </div>
    )
  }

  if (templateQuery.isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#070f1c] text-sm tracking-wide text-gold">
        Opening template details…
      </div>
    )
  }

  const template = templateQuery.data?.template

  if (templateQuery.isError || !template) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-[#070f1c] px-6 text-center">
        <p className="text-sm text-gold-soft">
          {templateQuery.isError ? getApiErrorMessage(templateQuery.error) : 'This template could not be opened.'}
        </p>
        <Button className="mt-6" onClick={() => navigate(ROUTES.adminTemplates)}>
          Back to templates
        </Button>
      </div>
    )
  }

  return (
    <WishContentStudio
      backTo={ROUTES.adminTemplates}
      backLabel="← Templates"
      heading={template.name}
      owner={{ type: 'template', id: templateId }}
      templateName={template.name}
      rooms={template}
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
