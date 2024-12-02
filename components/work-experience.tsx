import type { WorkExperience } from '@/types/work'
import Link from 'next/link'

export function WorkExperience({ experiences }: { experiences: WorkExperience[] }) {
  return (
    <section className="mb-16">
      <h2 className="text-base font-semibold mb-6">Experience</h2>
      <div className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience.id}>
            <Link 
              href={experience.url}
              className="cursor-pointer rounded-xl transition-colors btn-no-underline"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-base font-medium">{experience.company}</h3>
              </div>
              <p className="text-base text-muted-foreground">{experience.startDate} - {experience.endDate}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
} 