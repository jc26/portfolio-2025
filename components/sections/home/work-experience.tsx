import type { WorkExperience } from '@/types/work'
import { WorkList } from '@/components/ui/work-list'

interface WorkExperienceProps {
  experiences: WorkExperience[]
}

export function WorkExperience({ experiences }: WorkExperienceProps) {
  return (
    <section className="mb-16">
      <h2 className="text-base font-semibold mb-4">Experience</h2>
      <WorkList 
        items={experiences.map(experience => ({
          id: experience.id,
          href: experience.url,
          external: true,
          children: (
            <div className="flex flex-col md:gap-1 md:flex-row md:justify-between md:items-center">
              <h3 className="text-base font-medium">{experience.company}</h3>
              <p className="text-base text-muted-foreground">
                {experience.startDate} - {experience.endDate}
              </p>
            </div>
          )
        }))}
      />
    </section>
  )
} 