import { isDemoToken } from '@/shared/data/demoAccounts.ts'
import { projects as demoProjects } from '@/shared/data/projects.ts'
import type { Project } from '@/shared/types/project.ts'

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getProjects(token: string | null): Promise<Project[]> {
  if (isDemoToken(token)) {
    return demoProjects
  }

  await delay()
  return demoProjects
}
