import type { Project } from '@/types/project'
import { WorkList } from '@/components/ui/work-list'

interface ReadMoreProps {
  projects: Project[]
}

export function ReadMore({ projects }: ReadMoreProps) {
  return (
    <section className="content-container mt-16">
      <h2 className="text-base font-semibold mb-4">Read more</h2>
      <WorkList 
        items={projects.map(project => ({
          id: project.id,
          href: `/projects/${project.slug}`,
          children: (
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
          )
        }))}
      />
    </section>
  )
}