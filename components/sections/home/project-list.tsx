import type { Project } from '@/types/project'
import { WorkList } from '@/components/ui/work-list'
import { Badge } from '@/components/ui/badge'

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <section className="mb-16">
      <h2 className="text-base font-semibold mb-4">Projects</h2>
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
              <div className="text-base text-muted-foreground flex items-center gap-2">
                <span className="md:hidden">{project.client} • </span>
                {project.exclusive && (
                  <Badge variant="secondary">🔍<span className="ml-1.5">Exclusive</span></Badge>
                )}
                <span>{project.year}</span>
              </div>
            </div>
          )
        }))}
      />
    </section>
  )
} 