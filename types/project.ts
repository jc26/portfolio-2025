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
  // TODO: Make the naming consistent
  mediaUrl?: string  // fallback for single image
  mediaAlt?: string  // fallback for single image
  aspectRatio?: string
}

export type VideoBlockContent = {
  mediaUrl: string
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
  title: string
  heading: string
  client: string
  year: string
  description: string
  action?: ButtonBlockContent
  content: ContentBlock[]
} 