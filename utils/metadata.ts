import type { Metadata, ResolvingMetadata } from 'next'
import type { Project } from '@/types/project'

function getOptimizedOGImage(url: string): string {
  // Check if it's a Cloudinary URL
  if (url.includes('cloudinary.com')) {
    // Extract base URL and transformation parameters
    const [baseUrl, ...params] = url.split('/upload/')
    const imageUrl = params.join('/upload/')
    
    // Add transformation parameters for 1200x630 crop
    return `${baseUrl}/upload/c_fill,w_1200,h_630/${imageUrl}`
  }
  
  // Return original URL if not Cloudinary
  return url
}

export async function generateProjectMetadata(
  project: Project,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || []
  
  const description = Array.isArray(project.description) 
    ? project.description.join(' ') 
    : project.description

  const ogImage = project.metadata?.openGraph?.image ? {
    url: getOptimizedOGImage(project.metadata.openGraph.image),
    width: 1200,
    height: 630,
    alt: project.title
  } : undefined

  return {
    title: project.metadata?.title || project.title,
    description: project.metadata?.description || description,
    openGraph: {
      title: project.metadata?.openGraph?.title || project.metadata?.title || project.title,
      description: project.metadata?.openGraph?.description || project.metadata?.description || description,
      images: ogImage ? [ogImage] : previousImages
    },
    twitter: {
      card: 'summary_large_image',
      title: project.metadata?.twitter?.title || project.metadata?.title || project.title,
      description: project.metadata?.twitter?.description || project.metadata?.description || description,
      images: ogImage ? [ogImage.url] : undefined,
    }
  }
} 