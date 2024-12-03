import { getProjects } from '@/utils/get-projects'
import work from '@/data/work.json'
import { Intro, WorkExperience, ProjectList } from '@/components/sections/home'

export default async function Home() {
  const projects = await getProjects()
  
  return (
    <div className="content-container">
      <Intro />
      <WorkExperience experiences={work} />
      <ProjectList projects={projects} />
    </div>
  )
}