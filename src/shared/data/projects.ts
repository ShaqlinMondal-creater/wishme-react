import type { Project } from '@/shared/types/project.ts'

export const projects: Project[] = [
  {
    id: 'prj-ananya-birthday',
    title: 'For Ananya',
    occasion: 'birthday',
    templateId: 'tpl-golden-hour',
    status: 'draft',
    recipientName: 'Ananya',
    updatedAt: '2026-08-22',
  },
  {
    id: 'prj-aarav-rakhi',
    title: 'Rakhi for Aarav',
    occasion: 'raksha-bandhan',
    templateId: 'tpl-sacred-thread',
    status: 'scheduled',
    recipientName: 'Aarav',
    updatedAt: '2026-08-18',
  },
]
