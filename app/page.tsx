'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Project } from '@/types/project'

export default function Component() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const loadProjects = async () => {
      const { getProjects } = await import('@/utils/get-projects')
      const projectData = await getProjects()
      setProjects(projectData)
    }
    loadProjects()
  }, [])

  return (
    <div className="content-container">
      <motion.div
        key="list"
        initial={{ opacity: 0, y: '10%', filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: '10%', filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <section className="mb-16">
          <div className="mb-4">
            <h1 className="text-base font-semibold">Jason Chang</h1>
            <p className="text-base font-medium">Product Designer at <a href="https://procreate.com" target="_blank" rel="noopener noreferrer">Procreate</a> and <a href="https://antiwork.com" target="_blank" rel="noopener noreferrer">Antiwork</a></p>
          </div>
          <p className="text-base mt-4">
            I craft human interfaces that conform necessary function into intuitive form.
          </p>
        </section>
        
        <section className="mb-16">
          <h2 className="text-base font-semibold mb-6">Work</h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id}>
                <Link href={`/projects/${project.id}`} className="cursor-pointer rounded-xl transition-colors">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-medium">{project.title}</h3>
                  </div>
                  <p className="text-base text-muted-foreground">{project.client} • {project.year}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  )
}