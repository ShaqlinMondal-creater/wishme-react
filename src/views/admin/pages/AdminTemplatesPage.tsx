import { type FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  bulkCreateAdminTemplates,
  createAdminTemplate,
  deleteAdminTemplate,
  updateAdminTemplate,
  type TemplateInput,
} from '@/services/admin.service.ts'
import { uploadTemplateCover } from '@/services/uploads.service.ts'
import { ApiError, firstFieldError, getApiErrorMessage } from '@/services/http.ts'
import { queryKeys } from '@/services/queryKeys.ts'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Card } from '@/shared/components/ui/Card.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { Modal } from '@/shared/components/ui/Modal.tsx'
import { MIDNIGHT_TOAST_SLUG, adminTemplateContentPath, templateOpenTarget } from '@/shared/constants/routes.ts'
import { useAdminTemplates } from '@/shared/hooks/useAdminTemplates.ts'
import { useOccasions } from '@/shared/hooks/useOccasions.ts'
import { cn } from '@/shared/lib/cn.ts'
import { enabledRoomLabels, formatTemplatePrice, templateCoverSrc, templateDefaultCover, TEMPLATE_ROOM_LABELS } from '@/shared/lib/templateDisplay.ts'
import { templateOccasionTitle } from '@/shared/lib/occasionDisplay.ts'
import type { Occasion } from '@/shared/types/occasion.ts'
import { type Template } from '@/shared/types/template.ts'
import type { ApiErrorBag } from '@/services/types.ts'

export function AdminTemplatesPage() {
  const queryClient = useQueryClient()
  const { data: occasions } = useOccasions()
  const [occasionId, setOccasionId] = useState<number | 'all'>('all')
  const [editing, setEditing] = useState<Template | 'new' | null>(null)
  const [removing, setRemoving] = useState<Template | null>(null)
  const [bulkMessage, setBulkMessage] = useState('')

  const templatesQuery = useAdminTemplates({
    occasion_id: occasionId === 'all' ? undefined : occasionId,
  })
  const templates = templatesQuery.data?.templates ?? []

  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.adminTemplates })
    void queryClient.invalidateQueries({ queryKey: queryKeys.templates })
  }

  const bulkMutation = useMutation({
    mutationFn: bulkCreateAdminTemplates,
    onSuccess: (payload) => {
      refresh()
      const missing =
        payload.missing_occasions.length > 0
          ? ` Missing occasions: ${payload.missing_occasions.join(', ')}. Create those from JSON first.`
          : ''
      setBulkMessage(
        `Created ${payload.created_count}, skipped ${payload.skipped_count}, attached ${payload.covers_attached} covers.${missing}`,
      )
    },
    onError: (caught) => {
      setBulkMessage(getApiErrorMessage(caught))
    },
  })

  return (
    <div className="mx-auto max-w-[90rem]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Catalogue</p>
          <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Templates</h1>
          <p className="mt-2 text-navy-muted">
            Products you sell. Set price and which rooms are on. Midnight Toast uses slug{' '}
            <span className="font-medium text-navy">{MIDNIGHT_TOAST_SLUG}</span>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            isLoading={bulkMutation.isPending}
            onClick={() => bulkMutation.mutate()}
          >
            Create from JSON
          </Button>
          <Button onClick={() => setEditing('new')}>Add template</Button>
        </div>
      </div>

      {bulkMessage ? <p className="mt-4 text-sm text-navy-muted">{bulkMessage}</p> : null}

      <div className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        <FilterChip label="All" isActive={occasionId === 'all'} onClick={() => setOccasionId('all')} />
        {occasions?.map((item) => (
          <FilterChip
            key={item.id}
            label={item.title}
            isActive={occasionId === item.id}
            onClick={() => setOccasionId(item.id)}
          />
        ))}
      </div>

      {templatesQuery.isLoading ? (
        <LoadingState label="Loading templates…" />
      ) : templatesQuery.isError ? (
        <EmptyState
          className="mt-8"
          title="Could not load templates"
          description={getApiErrorMessage(templatesQuery.error)}
          actionLabel="Try again"
          onAction={() => void templatesQuery.refetch()}
        />
      ) : templates.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="No templates yet"
          description="Create from JSON after occasions exist, or add Midnight Toast first."
          actionLabel="Add template"
          onAction={() => setEditing('new')}
        />
      ) : (
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {templates.map((template) => {
            const preview = templateOpenTarget(template.slug)
            const rooms = enabledRoomLabels(template)

            return (
              <Card key={template.id} padding="none" className="overflow-hidden">
                <div className="flex min-h-[8.5rem]">
                  <div className="relative w-32 shrink-0 sm:w-40">
                    <img src={templateCoverSrc(template)} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/20" />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        type="button"
                        aria-label={`Edit ${template.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy shadow-soft hover:bg-gold"
                        onClick={() => setEditing(template)}
                      >
                        <PencilIcon />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${template.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-700 shadow-soft hover:bg-red-50"
                        onClick={() => setRemoving(template)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between px-4 py-3 sm:px-5">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-[10px] tracking-[0.2em] text-gold-deep uppercase">
                          {templateOccasionTitle(template)}
                        </p>
                        <span
                          className={cn(
                            'shrink-0 rounded-full px-2 py-0.5 text-[10px] tracking-wide',
                            template.is_active ? 'bg-gold-soft text-navy' : 'bg-ivory text-navy-muted',
                          )}
                        >
                          {template.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="mt-1 flex items-baseline justify-between gap-3">
                        <h2 className="min-w-0 truncate font-display text-2xl leading-none text-navy">
                          {template.name}
                        </h2>
                        <p className="shrink-0 font-display text-2xl leading-none text-navy sm:text-3xl">
                          {formatTemplatePrice(template.price)}
                        </p>
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {rooms.length > 0 ? (
                          rooms.map((room) => (
                            <span
                              key={room}
                              className="rounded-full bg-ivory px-2 py-0.5 text-[10px] tracking-wide text-navy"
                            >
                              {room}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-navy-muted">No rooms</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex gap-3">
                      <Link
                        to={adminTemplateContentPath(template.id)}
                        className="text-xs tracking-wide text-gold-deep hover:text-navy"
                      >
                        Detail
                      </Link>
                      <Link
                        to={preview.to}
                        target={preview.openInNewTab ? '_blank' : undefined}
                        rel={preview.openInNewTab ? 'noopener noreferrer' : undefined}
                        className="text-xs tracking-wide text-gold-deep hover:text-navy"
                      >
                        Preview
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <TemplateFormModal
        template={editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          refresh()
          setEditing(null)
        }}
      />
      <DeleteTemplateModal
        template={removing}
        onClose={() => setRemoving(null)}
        onDeleted={() => {
          refresh()
          setRemoving(null)
        }}
      />
    </div>
  )
}

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full px-4 py-2 text-sm',
        isActive ? 'bg-navy text-white' : 'bg-white text-navy-muted',
      )}
    >
      {label}
    </button>
  )
}

function emptyForm(occasion?: Occasion | null): TemplateInput {
  return {
    slug: MIDNIGHT_TOAST_SLUG,
    name: 'Midnight Toast',
    description: 'A night-sky sequence with a personal toast, photos, and a final wish.',
    occasion_id: occasion?.id ?? 0,
    price: 249,
    has_letter: true,
    has_stories: true,
    has_moments: true,
    has_privacy: true,
    has_surprise_gift: true,
    is_active: true,
  }
}

function formFromTemplate(template: Template): TemplateInput {
  return {
    slug: template.slug,
    name: template.name,
    description: template.description,
    occasion_id: template.occasion_id,
    price: template.price,
    has_letter: template.has_letter,
    has_stories: template.has_stories,
    has_moments: template.has_moments,
    has_privacy: template.has_privacy,
    has_surprise_gift: template.has_surprise_gift,
    is_active: template.is_active,
  }
}

function TemplateFormModal({
  template,
  onClose,
  onSaved,
}: {
  template: Template | 'new' | null
  onClose: () => void
  onSaved: () => void
}) {
  const isNew = template === 'new'
  const [form, setForm] = useState<TemplateInput>(emptyForm)
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<ApiErrorBag>()
  const { data: occasions } = useOccasions()

  useEffect(() => {
    if (template === null) {
      return
    }

    setForm(template === 'new' ? emptyForm(occasions?.[0]) : formFromTemplate(template))
    setFile(null)
    setFilePreview(null)
    setError('')
    setFieldErrors(undefined)
  }, [template, occasions])

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview)
      }
    }
  }, [filePreview])

  const savedPreview =
    template && template !== 'new' && template.slug === form.slug ? templateCoverSrc(template) : null
  const preview = filePreview ?? savedPreview ?? templateDefaultCover(form.slug)

  const mutation = useMutation({
    mutationFn: async () => {
      if (template === null) {
        throw new Error('No template selected.')
      }

      const saved =
        template === 'new' ? await createAdminTemplate(form) : await updateAdminTemplate(template.id, form)

      if (file) {
        const body = new FormData()
        body.append('file', file)
        await uploadTemplateCover(saved.template.id, body)
      }

      return saved
    },
    onSuccess: onSaved,
    onError: (caught) => {
      setError(getApiErrorMessage(caught))
      setFieldErrors(caught instanceof ApiError ? caught.errors : undefined)
    },
  })

  const setField = <K extends keyof TemplateInput>(key: K, value: TemplateInput[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  return (
    <Modal
      isOpen={template !== null}
      onClose={onClose}
      title={isNew ? 'Add template' : 'Edit template'}
      className="max-w-xl"
      titleClassName="text-2xl"
    >
      <form
        className="space-y-3"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          mutation.mutate()
        }}
      >
        <div className="grid gap-3 sm:grid-cols-[9.5rem_1fr] sm:items-start">
          <label className="group relative block cursor-pointer overflow-hidden rounded-2xl ring-1 ring-line">
            <img src={preview} alt="" className="h-36 w-full object-cover sm:h-40" />
            <span className="absolute inset-0 flex items-end bg-linear-to-t from-navy/75 via-navy/10 to-transparent p-2.5 text-[10px] tracking-[0.16em] text-white uppercase">
              Change cover
            </span>
            <input
              id="template-cover"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="sr-only"
              onChange={(event) => {
                const next = event.target.files?.[0] ?? null
                setFile(next)
                setFilePreview((current) => {
                  if (current) {
                    URL.revokeObjectURL(current)
                  }
                  return next ? URL.createObjectURL(next) : null
                })
              }}
            />
          </label>
          <div className="space-y-2.5">
            <Input
              label="Name"
              inputSize="sm"
              value={form.name}
              error={firstFieldError(fieldErrors, 'name')}
              onChange={(event) => setField('name', event.target.value)}
            />
            <Input
              label="Slug"
              inputSize="sm"
              value={form.slug}
              error={firstFieldError(fieldErrors, 'slug')}
              onChange={(event) => setField('slug', event.target.value.trim().toLowerCase())}
            />
            <div className="grid grid-cols-2 gap-2.5">
              <FieldSelect
                label="Occasion"
                value={String(form.occasion_id || '')}
                error={firstFieldError(fieldErrors, 'occasion_id')}
                onChange={(value) => setField('occasion_id', Number(value))}
                options={
                  occasions?.map((item) => ({ value: String(item.id), label: item.title })) ?? []
                }
              />
              <Input
                label="Price ₹"
                inputSize="sm"
                type="number"
                min={0}
                step={1}
                value={String(form.price)}
                error={firstFieldError(fieldErrors, 'price')}
                onChange={(event) => setField('price', Math.max(0, Math.floor(Number(event.target.value) || 0)))}
              />
            </div>
          </div>
        </div>

        <label className="flex w-full flex-col gap-1.5 text-left">
          <span className="text-xs font-medium tracking-wide text-navy">Description</span>
          <textarea
            rows={2}
            value={form.description}
            onChange={(event) => setField('description', event.target.value)}
            className="w-full resize-none rounded-2xl border border-line bg-ivory px-3 py-2 text-sm text-navy outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(196,163,90,0.18)]"
          />
          {firstFieldError(fieldErrors, 'description') ? (
            <span className="text-sm text-red-600">{firstFieldError(fieldErrors, 'description')}</span>
          ) : null}
        </label>

        <div>
          <p className="text-xs font-medium tracking-wide text-navy">Rooms</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {TEMPLATE_ROOM_LABELS.map((room) => {
              const on = form[room.key]
              return (
                <button
                  key={room.key}
                  type="button"
                  className={cn(
                    'rounded-full px-2.5 py-1 text-[11px] tracking-wide',
                    on ? 'bg-navy text-white' : 'bg-ivory text-navy-muted',
                  )}
                  onClick={() => setField(room.key, !on)}
                >
                  {room.label}
                </button>
              )
            })}
          </div>
        </div>

        {error ? <p className="text-xs text-red-600">{error}</p> : null}

        <div className="flex items-center justify-between gap-3 border-t border-line/80 pt-3">
          <button
            type="button"
            role="switch"
            aria-checked={form.is_active}
            onClick={() => setField('is_active', !form.is_active)}
            className="flex items-center gap-2 text-xs tracking-wide text-navy"
          >
            <span
              className={cn(
                'relative h-5 w-9 rounded-full transition-colors',
                form.is_active ? 'bg-navy' : 'bg-line',
              )}
            >
              <span
                className={cn(
                  'absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform',
                  form.is_active && 'translate-x-4',
                )}
              />
            </span>
            {form.is_active ? 'Active' : 'Inactive'}
          </button>
          <div className="flex gap-2">
            <Button type="button" size="sm" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={mutation.isPending}>
              {isNew ? 'Create' : 'Save'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

function DeleteTemplateModal({
  template,
  onClose,
  onDeleted,
}: {
  template: Template | null
  onClose: () => void
  onDeleted: () => void
}) {
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
  }, [template])

  const mutation = useMutation({
    mutationFn: () => {
      if (!template) {
        throw new Error('No template selected.')
      }
      return deleteAdminTemplate(template.id)
    },
    onSuccess: onDeleted,
    onError: (caught) => setError(getApiErrorMessage(caught)),
  })

  return (
    <Modal isOpen={template !== null} onClose={onClose} title="Delete template">
      <p className="text-sm leading-6 text-navy-muted">
        Remove {template?.name}? This only works if nobody has purchased or started a project with it.
      </p>
      {error ? <p className="mt-3 text-xs text-red-600">{error}</p> : null}
      <div className="mt-5 flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" isLoading={mutation.isPending} onClick={() => mutation.mutate()}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}

function FieldSelect({
  label,
  value,
  onChange,
  options,
  error,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  error?: string
}) {
  const id = `template-${label.toLowerCase()}`

  return (
    <div className="flex w-full flex-col gap-1.5 text-left">
      <label htmlFor={id} className="text-xs font-medium tracking-wide text-navy">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-2xl border border-line bg-ivory px-3 text-sm text-navy outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(196,163,90,0.18)] sm:h-10"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-sm text-red-600">{error}</span> : null}
    </div>
  )
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M4 20h4.2L19 9.2 14.8 5 4 15.8V20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m13.5 6.3 4.2 4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M5 7h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 7V5h4v2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d="M7 7l1 12h8l1-12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 11v5M14 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
