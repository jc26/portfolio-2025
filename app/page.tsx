'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Project } from '@/types/project'
import type { WorkExperience } from '@/types/work'
import { WorkExperience as WorkExperienceBlock } from '@/components/work-experience'

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [experiences, setExperiences] = useState<WorkExperience[]>([])

  useEffect(() => {
    const loadData = async () => {
      const [projectsModule, workModule] = await Promise.all([
        import('@/utils/get-projects'),
        import('@/data/work.json')
      ])
      
      setProjects(await projectsModule.getProjects())
      setExperiences(workModule.default)
    }
    loadData()
  }, [])

  return (
    <div className="content-container">
      <section className="mb-16">
        <div className="mb-4">
          <h1 className="text-base font-semibold">Jason Chang</h1>
          <p className="text-base font-medium">Product Designer at <a href="https://procreate.com" target="_blank" rel="noopener noreferrer">Procreate</a> and <a href="https://antiwork.com" target="_blank" rel="noopener noreferrer">Antiwork</a></p>
        </div>
        <p className="text-base mt-4">
          I craft human interfaces that conform necessary function into intuitive form.
        </p>
      </section>
      
      <WorkExperienceBlock experiences={experiences} />
      
      <section className="mb-16">
        <h2 className="text-base font-semibold mb-4">Projects</h2>
        <div>
          {projects.map((project) => (
            <div key={project.id} className="border-y border-border py-4 -mt-[1px]">
              <Link href={`/projects/${project.id}`} className="cursor-pointer rounded-xl transition-colors block">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-medium">{project.title}</h3>
                </div>
                <p className="text-base text-muted-foreground">{project.client} • {project.year}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}