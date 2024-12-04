import { getProject, getProjects } from '@/utils/get-projects'
import { ProjectHeader, ProjectContent, ReadMore } from '@/components/sections/project'
import { notFound } from 'next/navigation'

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProject(id)
  if (!project) return notFound()
  
  const allProjects = await getProjects()
  const otherProjects = allProjects.filter(p => p.slug !== id)

  return (
    <article className="relative mt-14">
      <ProjectHeader project={project} />
      <ProjectContent content={project.content} />
      <ReadMore projects={otherProjects} />
    </article>
  )
} 