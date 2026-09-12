export function getInitials(name?: string | null) {
  if (!name?.trim()) {
    return 'W'
  }

  const parts = name.trim().split(/\s+/).filter(Boolean)

  return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? parts[0]?.[1] ?? ''}`.toUpperCase()
}
