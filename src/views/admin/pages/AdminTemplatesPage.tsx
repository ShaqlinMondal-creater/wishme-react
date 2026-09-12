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
import { TEMPLATE_PRICES, type Template } from '@/shared/types/template.ts'
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
        <Card className="mt-6" padding="none">
          <div className="overflow-x-auto">
            <table className="min-w-[64rem] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line/80 bg-ivory/70 text-xs tracking-[0.12em] text-navy-muted uppercase">
                  <th className="px-5 py-3 font-medium">Template</th>
                  <th className="px-5 py-3 font-medium">Occasion</th>
                  <th className="px-5 py-3 font-medium">Price</th>
                  <th className="px-5 py-3 font-medium">Rooms</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {templates.map((template) => {
                  const preview = templateOpenTarget(template.slug)

                  return (
                    <tr key={template.id} className="border-b border-line/60 last:border-0">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={templateCoverSrc(template)}
                            alt=""
                            className="h-12 w-16 rounded-xl object-cover"
                          />
                          <div>
                            <p className="font-medium whitespace-nowrap text-navy">{template.name}</p>
                            <p className="text-xs text-navy-muted">{template.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 capitalize whitespace-nowrap text-navy-muted">
                        {templateOccasionTitle(template)}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-navy">
                        {formatTemplatePrice(template.price)}
                      </td>
                      <td className="px-5 py-3 text-navy-muted">
                        {enabledRoomLabels(template).join(', ') || 'None'}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-1 text-xs tracking-wide',
                            template.is_active ? 'bg-gold-soft text-navy' : 'bg-ivory text-navy-muted',
                          )}
                        >
                          {template.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-4">
                        <Link
                          to={adminTemplateContentPath(template.id)}
                          className="text-sm text-gold-deep hover:text-navy"
                        >
                          Detail
                        </Link>
                        <Link
                          to={preview.to}
                          target={preview.openInNewTab ? '_blank' : undefined}
                          rel={preview.openInNewTab ? 'noopener noreferrer' : undefined}
                          className="text-sm text-gold-deep hover:text-navy"
                        >
                          Preview
                        </Link>
                        <button
                          type="button"
                          className="text-sm text-navy hover:text-gold-deep"
                          onClick={() => setEditing(template)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-sm text-red-700 hover:text-red-800"
                          onClick={() => setRemoving(template)}
                        >
                          Delete
                        </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
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
      className="max-w-2xl"
    >
      <form
        className="space-y-3"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          mutation.mutate()
        }}
      >
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
          hint="midnight-toast is the live React engine."
          error={firstFieldError(fieldErrors, 'slug')}
          onChange={(event) => setField('slug', event.target.value.trim().toLowerCase())}
        />
        <Input
          label="Description"
          inputSize="sm"
          value={form.description}
          error={firstFieldError(fieldErrors, 'description')}
          onChange={(event) => setField('description', event.target.value)}
        />
        <div className="flex w-full flex-col gap-1.5 text-left">
          <label htmlFor="template-cover" className="text-xs font-medium tracking-wide text-navy">
            Cover
          </label>
          <img src={preview} alt="" className="h-36 w-full rounded-2xl object-cover" />
          <input
            id="template-cover"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
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
            className="text-sm text-navy"
          />
          <p className="text-xs text-navy-muted">
            Default cover for this slug shows until you choose a file.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <FieldSelect
            label="Occasion"
            value={String(form.occasion_id || '')}
            error={firstFieldError(fieldErrors, 'occasion_id')}
            onChange={(value) => setField('occasion_id', Number(value))}
            options={
              occasions?.map((item) => ({ value: String(item.id), label: item.title })) ?? []
            }
          />
          <FieldSelect
            label="Price"
            value={String(form.price)}
            error={firstFieldError(fieldErrors, 'price')}
            onChange={(value) => setField('price', Number(value))}
            options={TEMPLATE_PRICES.map((price) => ({
              value: String(price),
              label: formatTemplatePrice(price),
            }))}
          />
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-navy">Rooms</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {TEMPLATE_ROOM_LABELS.map((room) => {
              const on = form[room.key]
              return (
                <button
                  key={room.key}
                  type="button"
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs tracking-wide',
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
        <div>
          <p className="text-xs font-medium tracking-wide text-navy">Status</p>
          <div className="mt-2 flex gap-2">
            <Button
              type="button"
              size="sm"
              variant={form.is_active ? 'primary' : 'secondary'}
              onClick={() => setField('is_active', true)}
            >
              Active
            </Button>
            <Button
              type="button"
              size="sm"
              variant={!form.is_active ? 'primary' : 'secondary'}
              onClick={() => setField('is_active', false)}
            >
              Inactive
            </Button>
          </div>
        </div>
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={mutation.isPending}>
            {isNew ? 'Create' : 'Save'}
          </Button>
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
