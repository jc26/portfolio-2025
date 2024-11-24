export type ContentBlock = {
  id: string
  type: 'text' | 'image' | 'video' | 'button' | 'quote' | 'gallery'
  width: 'contained' | 'full' | 'wide'
  content: {
    title?: string
    text?: string | string[]
    url?: string
    buttonText?: string
    mediaUrl?: string
    mediaAlt?: string
    aspectRatio?: string
    gallery?: string[]
  }
}

export type Project = {
  id: number
  title: string
  heading: string
  client: string
  year: string
  description: string
  action?: {
    text: string
    url: string
  }
  content: ContentBlock[]
} 