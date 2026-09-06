import { projects } from '@/shared/data/projects.ts'
import type { Project } from '@/shared/types/project.ts'

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getProjects(): Promise<Project[]> {
  await delay()
  return projects
}
