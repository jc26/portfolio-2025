import { Metadata } from 'next'
import { getProjects } from '@/utils/get-projects'
import work from '@/data/work.json'
import { Intro, WorkExperience, ProjectList } from '@/components/sections/home'

export const metadata: Metadata = {
  title: 'JASON/C',
  description: 'Jason Chang - Product Designer',
  openGraph: {
    title: 'Jason Chang',
    description: 'Portfolio and work of Jason Chang - Product Designer',
    url: 'https://jchang.cc',
    siteName: 'Jason Chang',
    images: [
      {
        url: 'https://res.cloudinary.com/duuq9bfel/image/upload/v1733391468/home-og-image_z71mr3.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en-US',
    type: 'website',
  }
}

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