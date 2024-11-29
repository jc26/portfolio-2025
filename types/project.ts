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
  }>
  url?: string  // fallback for single image
  alt?: string  // fallback for single image
  aspectRatio?: string
}

export type VideoBlockContent = {
  url: string
  isPortrait?: boolean
}

export type ButtonBlockContent = {
  text: string
  url: string
}

// Main content block type
export type ContentBlock = {
  id: string
  type: 'text' | 'image' | 'video' | 'button' | 'quote' | 'gallery'
  width: 'contained' | 'full' | 'wide'
  content: TextBlockContent | ImageBlockContent | VideoBlockContent | ButtonBlockContent
}

export type Project = {
  id: number
  slug: string  // e.g., "gumroad-design-system"
  title: string
  heading: string
  client: string
  year: string
  description: string
  isVisible?: boolean
  action?: ButtonBlockContent
  content: ContentBlock[]
}

// Add after your existing types
export type VideoModule = {
  default: {
    src: string
    height: number
    width: number
    blurDataURL?: string
    preload?: string
  }
} 