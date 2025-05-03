import { Metadata } from 'next'
import { getProjects } from '@/utils/get-projects'
import work from '@/data/work.json'
import { Intro, WorkExperience, ProjectList } from '@/components/sections/home'

export const metadata: Metadata = {
  title: 'JASON/C',
  description: 'Jason Chang - Design Engineer',
  openGraph: {
    title: 'Jason Chang',
    description: 'Design Engineer',
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
  const allProjects = await getProjects()

  // Sort projects: exclusive first, then by original order (assuming getProjects preserves it or sorts by ID)
  const sortedProjects = [...allProjects].sort((a, b) => {
    if (a.exclusive && !b.exclusive) return -1; // a comes first
    if (!a.exclusive && b.exclusive) return 1;  // b comes first
    return 0; // Keep original relative order if both are same exclusivity
    // Or sort by ID if needed: return a.id - b.id;
  });
  
  return (
    <div className="content-container">
      <Intro />
      <WorkExperience experiences={work} />
      <ProjectList projects={sortedProjects} />
    </div>
  )
}