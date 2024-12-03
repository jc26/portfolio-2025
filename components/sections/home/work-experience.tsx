import type { WorkExperience } from '@/types/work'
import Link from 'next/link'

interface WorkExperienceProps {
  experiences: WorkExperience[]
}

export function WorkExperience({ experiences }: WorkExperienceProps) {
  return (
    <section className="mb-16">
      <h2 className="text-base font-semibold mb-4">Experience</h2>
      <div>
        {experiences.map((experience) => (
          <div key={experience.id} className="border-y border-secondary py-4 -mt-[1px]">
            <Link 
              href={experience.url}
              className="cursor-pointer rounded-xl transition-colors btn-no-underline block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-col md:gap-1 md:flex-row md:justify-between md:items-center">
                <h3 className="text-base font-medium">{experience.company}</h3>
                <p className="text-base text-muted-foreground">
                  {experience.startDate} - {experience.endDate}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
} 