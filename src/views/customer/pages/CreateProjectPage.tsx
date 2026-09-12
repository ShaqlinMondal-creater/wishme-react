import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProject } from '@/services/projects.service.ts'
import { getApiErrorMessage } from '@/services/http.ts'
import { queryKeys } from '@/services/queryKeys.ts'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { OccasionCard } from '@/shared/components/common/OccasionCard.tsx'
import { TemplateCard } from '@/shared/components/common/TemplateCard.tsx'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { Modal } from '@/shared/components/ui/Modal.tsx'
import { projectContentPath } from '@/shared/constants/routes.ts'
import { useOccasions } from '@/shared/hooks/useOccasions.ts'
import { useTemplates } from '@/shared/hooks/useTemplates.ts'
import { contentForTemplate } from '@/views/wish/content/mergeContent.ts'

export function CreateProjectPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [params] = useSearchParams()
  const requestedTemplateSlug = params.get('template')
  const { data: occasions, isLoading: occasionsLoading } = useOccasions()
  const { data: templates, isLoading: templatesLoading } = useTemplates()
  const [occasionId, setOccasionId] = useState<number | null>(null)
  const [templateSlug, setTemplateSlug] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recipient, setRecipient] = useState('')
  const [from, setFrom] = useState('')
  const [error, setError] = useState('')

  const selected = templates?.find((item) => item.slug === templateSlug)

  useEffect(() => {
    if (!templates || !requestedTemplateSlug) {
      return
    }

    const found = templates.find((item) => item.slug === requestedTemplateSlug)
    if (found) {
      setOccasionId(found.occasion_id)
      setTemplateSlug(found.slug)
    }
  }, [requestedTemplateSlug, templates])

  const matchingTemplates = useMemo(
    () => templates?.filter((template) => template.occasion_id === occasionId) ?? [],
    [occasionId, templates],
  )

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: (payload) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.projects })
      navigate(projectContentPath(payload.project.id))
    },
    onError: (caught) => {
      setError(getApiErrorMessage(caught))
    },
  })

  const openEditor = (event: FormEvent) => {
    event.preventDefault()
    if (!selected) {
      return
    }

    const recipientName = recipient.trim()
    const fromName = from.trim()
    if (!recipientName || !fromName) {
      setError('Recipient and from names are required.')
      return
    }

    const content = contentForTemplate(selected)
    content.gate.recipient = recipientName
    content.gate.from = fromName
    content.gate.occasion = selected.occasion?.title ?? selected.occasion?.type ?? ''

    setError('')
    createMutation.mutate({
      title: `For ${recipientName}`,
      recipient_name: recipientName,
      from_name: fromName,
      template_id: selected.id,
      content: content as unknown as Record<string, unknown>,
    })
  }

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">New wish</p>
      <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Create a project</h1>
      <p className="mt-2 max-w-2xl text-navy-muted">
        Choose a template, then open the same lookalike editor. Photos, videos, and audio save to
        your project in the uploads table. Paying comes later.
      </p>

      <h2 className="mt-10 font-display text-2xl text-navy sm:text-3xl">1. Occasion</h2>
      {occasionsLoading || !occasions ? (
        <LoadingState />
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {occasions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setOccasionId(item.id)
                setTemplateSlug(null)
              }}
              className="text-left"
            >
              <div className={occasionId === item.id ? 'rounded-3xl ring-2 ring-gold' : undefined}>
                <OccasionCard occasion={item} />
              </div>
            </button>
          ))}
        </div>
      )}

      <h2 className="mt-12 font-display text-2xl text-navy sm:text-3xl">2. Template</h2>
      {templatesLoading ? (
        <LoadingState />
      ) : !occasionId ? (
        <EmptyState
          className="mt-5"
          title="Choose an occasion first"
          description="Templates will appear once you select the celebration this wish is for."
        />
      ) : (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {matchingTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              className="text-left"
              onClick={() => setTemplateSlug(template.slug)}
            >
              <div className={templateSlug === template.slug ? 'rounded-3xl ring-2 ring-gold' : undefined}>
                <TemplateCard template={template} />
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Button disabled={!occasionId || !templateSlug} onClick={() => setIsModalOpen(true)}>
          Continue
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Who is this wish for?">
        <form className="space-y-3" onSubmit={openEditor}>
          <Input
            label="Recipient"
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
            placeholder="Riya"
          />
          <Input
            label="From"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            placeholder="Arjun"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={createMutation.isPending}>
              Open editor
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
