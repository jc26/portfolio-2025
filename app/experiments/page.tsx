import { ProjectContent, ProjectHeader } from '@/components/sections/project'
import experimentsData from '@/data/experiments.json'
import type { Project } from '@/types/project'

export default function ExperimentsPage() {
  const project = experimentsData as Project
  
  return (
    <article className="relative mt-14">
      <ProjectHeader project={project} />
      <ProjectContent content={project.content} />
    </article>
  )
}
