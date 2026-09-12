import { type FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteAdminUser, updateAdminUser } from '@/services/admin.service.ts'
import { ApiError, firstFieldError, getApiErrorMessage } from '@/services/http.ts'
import { queryKeys } from '@/services/queryKeys.ts'
import { EmptyState } from '@/shared/components/common/EmptyState.tsx'
import { LoadingState } from '@/shared/components/common/LoadingState.tsx'
import { Button } from '@/shared/components/ui/Button.tsx'
import { Card } from '@/shared/components/ui/Card.tsx'
import { Input } from '@/shared/components/ui/Input.tsx'
import { Modal } from '@/shared/components/ui/Modal.tsx'
import { useAdminUsers } from '@/shared/hooks/useAdminUsers.ts'
import { cn } from '@/shared/lib/cn.ts'
import { formatDate } from '@/shared/lib/formatDate.ts'
import type { User } from '@/shared/types/user.ts'
import type { ApiErrorBag } from '@/services/types.ts'

const PAGE_SIZES = [10, 25, 50]

export function AdminUsersPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [editing, setEditing] = useState<User | null>(null)
  const [removing, setRemoving] = useState<User | null>(null)
  const [menuUserId, setMenuUserId] = useState<number | null>(null)
  const closeMenu = useCallback(() => setMenuUserId(null), [])
  const debouncedSearch = useDebouncedValue(search.trim(), 400)

  useEffect(() => {
    setOffset(0)
  }, [debouncedSearch, status, limit])

  const usersQuery = useAdminUsers({
    search: debouncedSearch || undefined,
    status: status === 'all' ? undefined : status,
    limit,
    offset,
  })
  const users = usersQuery.data?.users ?? []
  const total = usersQuery.data?.total ?? 0
  const from = total === 0 ? 0 : offset + 1
  const to = Math.min(offset + limit, total)
  const hasFilters = Boolean(debouncedSearch) || status !== 'all'

  const refresh = () => queryClient.invalidateQueries({ queryKey: queryKeys.adminUsers })

  return (
    <div className="mx-auto max-w-[90rem]">
      <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">People</p>
      <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Users</h1>
      <p className="mt-2 text-navy-muted">Customers and admins. Search, filter, edit, or remove an account.</p>

      <Card className="mt-8" padding="none">
        <div className="flex flex-col gap-3 border-b border-line/80 p-4 sm:flex-row sm:items-end sm:p-5">
          <div className="min-w-0 flex-1">
            <Input
              label="Search"
              inputSize="sm"
              value={search}
              placeholder="Name, email, or mobile"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <FilterSelect
            label="Status"
            value={status}
            onChange={(value) => setStatus(value as 'all' | 'active' | 'inactive')}
            options={[
              { value: 'all', label: 'All' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
          <FilterSelect
            label="Per page"
            value={String(limit)}
            onChange={(value) => setLimit(Number(value))}
            options={PAGE_SIZES.map((size) => ({ value: String(size), label: String(size) }))}
          />
        </div>

        {usersQuery.isLoading ? (
          <LoadingState label="Loading users…" />
        ) : usersQuery.isError ? (
          <EmptyState
            className="border-0 bg-transparent"
            title="Could not load users"
            description={getApiErrorMessage(usersQuery.error)}
            actionLabel="Try again"
            onAction={() => void usersQuery.refetch()}
          />
        ) : users.length === 0 ? (
          <EmptyState
            className="border-0 bg-transparent"
            title={hasFilters ? 'No matching users' : 'No users yet'}
            description={
              hasFilters
                ? 'Try a different name, email, mobile, or status.'
                : 'They will appear here when someone creates an account on WISHME.'
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-[68rem] w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line/80 bg-ivory/70 text-xs tracking-[0.12em] text-navy-muted uppercase">
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Mobile</th>
                    <th className="px-5 py-3 font-medium">Role</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Logged in</th>
                    <th className="px-5 py-3 font-medium">Sign-in</th>
                    <th className="px-5 py-3 font-medium">Date of birth</th>
                    <th className="px-5 py-3 font-medium">Joined</th>
                    <th className="px-5 py-3 font-medium">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-line/60 last:border-0">
                      <td className="px-5 py-3 font-medium whitespace-nowrap text-navy">{user.name}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-navy-muted">{user.email}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-navy-muted">{user.mobile_no || '—'}</td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <span className="rounded-full bg-ivory px-2.5 py-1 text-xs tracking-wide text-navy">
                          {roleLabel(user.role)}
                        </span>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-1 text-xs tracking-wide',
                            user.is_active ? 'bg-gold-soft text-navy' : 'bg-sand text-navy-muted',
                          )}
                        >
                          {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-navy-muted">{user.is_loggedin ? 'Yes' : 'No'}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-navy-muted">{providerLabel(user.auth_provider)}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-navy-muted">{user.dob ? formatDate(user.dob) : '—'}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-navy-muted">
                        {user.created_at ? formatDate(user.created_at) : '—'}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <UserActionsMenu
                          isOpen={menuUserId === user.id}
                          onToggle={() => setMenuUserId((id) => (id === user.id ? null : user.id))}
                          onClose={closeMenu}
                          onEdit={() => {
                            setMenuUserId(null)
                            setEditing(user)
                          }}
                          onDelete={() => {
                            setMenuUserId(null)
                            setRemoving(user)
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-3 border-t border-line/80 px-5 py-4 text-sm text-navy-muted sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {from}–{to} of {total}
                {usersQuery.isFetching && !usersQuery.isLoading ? ' · Updating…' : ''}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={offset === 0}
                  onClick={() => setOffset(Math.max(0, offset - limit))}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={offset + limit >= total}
                  onClick={() => setOffset(offset + limit)}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>

      <EditUserModal
        user={editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          setEditing(null)
          void refresh()
        }}
      />
      <DeleteUserModal
        user={removing}
        onClose={() => setRemoving(null)}
        onDeleted={() => {
          setRemoving(null)
          void refresh()
        }}
      />
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  className?: string
}) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className={cn('flex w-full flex-col gap-1.5 text-left sm:w-40', className)}>
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
    </div>
  )
}

function UserActionsMenu({
  isOpen,
  onToggle,
  onClose,
  onEdit,
  onDelete,
}: {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const place = () => {
      const rect = buttonRef.current?.getBoundingClientRect()
      if (!rect) {
        return
      }

      const width = 160
      setCoords({
        top: rect.bottom + 6,
        left: Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8)),
      })
    }

    place()

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return
      }
      onClose()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onClose)
    document.addEventListener('scroll', onClose, true)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onClose)
      document.removeEventListener('scroll', onClose, true)
    }
  }, [isOpen, onClose])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Open actions"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-navy hover:bg-ivory"
        onClick={onToggle}
      >
        <span className="text-lg leading-none" aria-hidden="true">
          ⋮
        </span>
      </button>
      {isOpen
        ? createPortal(
            <div
              ref={menuRef}
              role="menu"
              className="fixed z-[60] min-w-40 rounded-2xl border border-line bg-white py-1 shadow-lift"
              style={{ top: coords.top, left: coords.left }}
            >
              <button
                type="button"
                role="menuitem"
                className="block w-full px-4 py-2.5 text-left text-sm text-navy hover:bg-ivory"
                onClick={onEdit}
              >
                Edit
              </button>
              <button
                type="button"
                role="menuitem"
                className="block w-full px-4 py-2.5 text-left text-sm text-red-700 hover:bg-ivory"
                onClick={onDelete}
              >
                Delete
              </button>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}

function EditUserModal({
  user,
  onClose,
  onSaved,
}: {
  user: User | null
  onClose: () => void
  onSaved: () => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [dob, setDob] = useState('')
  const [role, setRole] = useState<'customer' | 'admin'>('customer')
  const [isActive, setIsActive] = useState(true)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<ApiErrorBag>()

  useEffect(() => {
    if (!user) {
      return
    }

    setName(user.name)
    setEmail(user.email)
    setMobile(user.mobile_no ?? '')
    setDob(user.dob ?? '')
    setRole(user.role === 'admin' ? 'admin' : 'customer')
    setIsActive(user.is_active)
    setPassword('')
    setError('')
    setFieldErrors(undefined)
  }, [user])

  const mutation = useMutation({
    mutationFn: () => {
      if (!user) {
        throw new Error('No user selected.')
      }

      return updateAdminUser(user.id, {
        name: name.trim(),
        email: email.trim(),
        mobile_no: mobile.trim() || null,
        dob: dob.trim() || null,
        role,
        is_active: isActive,
        ...(password.trim() ? { password: password.trim() } : {}),
      })
    },
    onSuccess: onSaved,
    onError: (caught) => {
      setError(getApiErrorMessage(caught))
      setFieldErrors(caught instanceof ApiError ? caught.errors : undefined)
    },
  })

  return (
    <Modal isOpen={user !== null} onClose={onClose} title="Edit user">
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
          value={name}
          error={firstFieldError(fieldErrors, 'name')}
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          label="Email"
          type="email"
          inputSize="sm"
          value={email}
          error={firstFieldError(fieldErrors, 'email')}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          label="Mobile"
          inputSize="sm"
          value={mobile}
          error={firstFieldError(fieldErrors, 'mobile_no')}
          onChange={(event) => setMobile(event.target.value)}
        />
        <Input
          label="Date of birth"
          type="date"
          inputSize="sm"
          value={dob}
          error={firstFieldError(fieldErrors, 'dob')}
          onChange={(event) => setDob(event.target.value)}
        />
        <FilterSelect
          label="Role"
          className="sm:w-full"
          value={role}
          onChange={(value) => setRole(value as 'customer' | 'admin')}
          options={[
            { value: 'customer', label: 'Customer' },
            { value: 'admin', label: 'Admin' },
          ]}
        />
        <Input
          label="New password"
          type="password"
          inputSize="sm"
          value={password}
          hint="Leave blank to keep the current password."
          error={firstFieldError(fieldErrors, 'password')}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div>
          <p className="text-xs font-medium tracking-wide text-navy">Status</p>
          <div className="mt-2 flex gap-2">
            <Button type="button" size="sm" variant={isActive ? 'primary' : 'secondary'} onClick={() => setIsActive(true)}>
              Active
            </Button>
            <Button type="button" size="sm" variant={!isActive ? 'primary' : 'secondary'} onClick={() => setIsActive(false)}>
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
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
}

function DeleteUserModal({
  user,
  onClose,
  onDeleted,
}: {
  user: User | null
  onClose: () => void
  onDeleted: () => void
}) {
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
  }, [user])

  const mutation = useMutation({
    mutationFn: () => {
      if (!user) {
        throw new Error('No user selected.')
      }
      return deleteAdminUser(user.id)
    },
    onSuccess: onDeleted,
    onError: (caught) => setError(getApiErrorMessage(caught)),
  })

  return (
    <Modal isOpen={user !== null} onClose={onClose} title="Delete user">
      <p className="text-sm leading-6 text-navy-muted">
        Remove {user?.name}? They will no longer be able to sign in.
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

function roleLabel(role: string) {
  if (role === 'admin') {
    return 'Admin'
  }

  if (role === 'customer') {
    return 'Customer'
  }

  return role
}

function providerLabel(value: string) {
  if (value === 'email') {
    return 'Email'
  }

  if (value === 'google') {
    return 'Google'
  }

  return value
}

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}
