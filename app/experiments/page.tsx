import { ProjectPage } from '@/components/project/project-page'
import experimentsData from '@/data/experiments.json'
import type { Project } from '@/types/project'

export default function ExperimentsPage() {
  return <ProjectPage project={experimentsData as Project} />
}