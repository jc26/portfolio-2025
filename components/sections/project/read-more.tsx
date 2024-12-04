import Link from 'next/link'
import type { Project } from '@/types/project'

interface ReadMoreProps {
  projects: Project[]
}

export function ReadMore({ projects }: ReadMoreProps) {
  return (
    <section className="content-container mt-16">
      <h2 className="text-base font-semibold mb-4">Read more</h2>
      <div>
        {projects.map((project) => (
          <div key={project.id} className="border-y border-secondary py-4 -mt-[1px]">
            <Link href={`/projects/${project.slug}`} className="cursor-pointer rounded-xl transition-colors block">
              <div className="flex flex-col md:gap-1 md:flex-row md:justify-between md:items-center">
                <h3 className="text-base font-medium">
                  {project.title}
                  <span className="hidden md:inline font-normal text-muted-foreground"> • {project.client}</span>
                </h3>
                <p className="text-base text-muted-foreground">
                  <span className="md:hidden">{project.client} • </span>
                  {project.year}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
} 