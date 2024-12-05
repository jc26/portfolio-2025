import { ProjectContent, ProjectHeader } from '@/components/sections/project'
import playData from '@/data/play.json'
import type { Project } from '@/types/project'
import { generateProjectMetadata } from '@/utils/metadata'
import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
  _props: object,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const project = playData as Project
  return generateProjectMetadata(project, parent)
}

export default function PlayPage() {
  const project = playData as Project
  
  return (
    <article className="relative mt-14">
      <ProjectHeader project={project} />
      <ProjectContent content={project.content} />
    </article>
  )
}
