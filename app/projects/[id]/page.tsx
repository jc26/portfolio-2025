import { getProject, getProjects } from '@/utils/get-projects'
import { ProjectHeader, ProjectContent, ReadMore } from '@/components/sections/project'
import { notFound } from 'next/navigation'
import { generateProjectMetadata } from '@/utils/metadata'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params
  const project = await getProject(params.id)
  if (!project) return {}

  return generateProjectMetadata(project, parent)
}

export default async function ProjectPage(props: Props) {
  const params = await props.params
  const project = await getProject(params.id)
  if (!project) return notFound()
  
  const allProjects = await getProjects()
  const otherProjects = allProjects.filter(p => p.slug !== project.slug)

  return (
    <article className="relative mt-14">
      <ProjectHeader project={project} />
      <ProjectContent content={project.content} />
      <ReadMore projects={otherProjects} />
    </article>
  )
} 