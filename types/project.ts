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
  url?: string
  alt?: string
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
  description: string | string[]
  isVisible?: boolean
  action?: ButtonBlockContent
  award?: AwardContent
  mentions?: AwardContent | AwardContent[]
  content: ContentBlock[]
}