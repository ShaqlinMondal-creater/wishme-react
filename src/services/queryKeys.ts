export const queryKeys = {
  occasions: ['occasions'] as const,
  templates: ['templates'] as const,
  projects: ['projects'] as const,
  pricing: ['pricing'] as const,
  profile: ['profile'] as const,
  adminUsers: ['admin', 'users'] as const,
  adminTemplates: ['admin', 'templates'] as const,
  templateUploads: (id: number) => ['admin', 'templates', id, 'uploads'] as const,
  projectUploads: (id: number) => ['projects', id, 'uploads'] as const,
}
