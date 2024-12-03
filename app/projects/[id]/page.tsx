import { getProject } from '@/utils/get-projects'
import { ProjectHeader, ProjectContent } from '@/components/sections/project'
import { notFound } from 'next/navigation'

export default async function ProjectPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
  const project = await getProject(id)
  
  if (!project) {
    notFound()
  }

  return (
    <article className="relative mt-14">
      <ProjectHeader project={project} />
      <ProjectContent content={project.content} />
    </article>
  )
} 