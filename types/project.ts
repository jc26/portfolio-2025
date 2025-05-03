// Block-specific types
export type TextBlockContent = {
  title?: string
  text: string | string[]
  buttonText?: string
  url?: string
}

export type ImageBlockContent = {
  images?: Array<{
    url: string
    alt: string
    aspectRatio?: string
    fullWidth?: boolean
  }>
  url?: string
  alt?: string
  aspectRatio?: string
  caption?: string
}

export type VideoBlockContent = {
  videos?: Array<{
    url: string
    isPortrait?: boolean
  }>
  url?: string
  isPortrait?: boolean
  caption?: string
}

export type ButtonBlockContent = {
  text: string
  url: string
}

export type AwardContent = {
  text: string
  url: string
}

// Add new type for Twitter embed
export type TwitterBlockContent = {
  tweetId: string
  caption?: string
}

// Add this new type
export type FigmaBlockContent = {
  url: string
}

// Add new type for YouTube embed
export type YouTubeBlockContent = {
  videoId: string
  caption?: string
}

// Main content block type
export type ContentBlock = {
  id: string
  type: 'text' | 'image' | 'video' | 'twitter' | 'figma' | 'youtube'
  width: 'contained' | 'wide'
  content: TextBlockContent | ImageBlockContent | VideoBlockContent | TwitterBlockContent | FigmaBlockContent | YouTubeBlockContent
}

export type MetadataImage = {
  url: string
  width?: number
  height?: number
  alt?: string
}

export type ProjectMetadata = {
  title?: string
  description?: string
  openGraph?: {
    title?: string
    description?: string
    image?: string
  }
  twitter?: {
    title?: string
    description?: string
    image?: string
    card?: 'summary' | 'summary_large_image'
  }
}

export type Project = {
  id: number
  slug: string
  title: string
  heading: string
  client: string
  year: string
  isVisible?: boolean
  exclusive?: boolean
  description: string | string[]
  action?: ButtonBlockContent
  award?: AwardContent
  nominations?: AwardContent | AwardContent[]
  mentions?: AwardContent | AwardContent[]
  content: ContentBlock[]
  theme?: 'light' | 'dark'
  metadata?: ProjectMetadata
}