import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import { parseMarkdownLinks } from '@/utils/markdown'
import type { Project } from '@/types/project'

export function ProjectHeader({ project }: { project: Project }) {
  const descriptions = Array.isArray(project.description) 
    ? project.description 
    : [project.description]

  return (
    <div className="content-container mb-8 md:mb-16">
      <div className="mb-3">
        <h1 className="text-base font-semibold mb-3">{project.heading}</h1>
        <div className="mb-4">
          {descriptions.map((paragraph, index) => (
            <p key={index} className="text-base">
              {parseMarkdownLinks(paragraph)} 
            </p>
          ))}
        </div>
      </div>
      <div className="mb-6">
        {project.award && (
          <div className="flex flex-wrap items-center gap-x-1 text-sm mb-2 pt-1">
            <span className="font-medium">🏆 Winner</span>
            <a 
              href={project.award.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
            >
              {project.award.text}
            </a>
          </div>
        )}
        {project.nominations && (
          <div className="flex flex-wrap items-center gap-x-1 text-sm mb-2">
            <span className="font-medium">💎 Nomination</span>
            {Array.isArray(project.nominations) ? (
              project.nominations?.map((nomination, index, array) => (
                <span key={index}>
                  <a 
                    href={nomination.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1"
                  >
                    {nomination.text}
                  </a>
                  {index < array.length - 1 && ", "}
                </span>
              ))
            ) : (
              <a
                href={project.nominations?.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1"
              >
                {project.nominations.text}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
        {project.mentions && (
          <div className="flex flex-wrap items-center gap-x-1 text-sm">
            <span className="font-medium">🗞️ Mentions</span>
            {Array.isArray(project.mentions) ? (
              project.mentions?.map((mention, index, array) => (
                <span key={index}>
                  <a 
                    href={mention.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1"
                  >
                    {mention.text}
                  </a>
                  {index < array.length - 1 && ", "}
                </span>
              ))
            ) : (
              <a
                href={project.mentions.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1"
              >
                {project.mentions.text}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
      {project.action && (
        <Button variant="default" asChild>
          <a 
            href={project.action.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {project.action.text}
          </a>
        </Button>
      )}
    </div>
  )
} 