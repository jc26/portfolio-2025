import { ProjectContent, ProjectHeader } from '@/components/sections/project'
import playData from '@/data/play.json'
import type { Project } from '@/types/project'

export default function PlayPage() {
  const project = playData as Project
  
  return (
    <article className="relative mt-14">
      <ProjectHeader project={project} />
      <ProjectContent content={project.content} />
    </article>
  )
}
