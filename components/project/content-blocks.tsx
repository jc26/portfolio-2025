import Image from 'next/image'
import { Button } from '@/components/ui/button'

export const TextBlock = ({ title, text }: { title?: string, text: string | string[] }) => (
  <div className="max-w-2xl mx-auto mb-16">
    {title && <h2 className="text-base font-semibold mb-4">{title}</h2>}
    {Array.isArray(text) ? (
      text.map((paragraph, i) => (
        <p key={i} className="text-base mb-4 last:mb-0">{paragraph}</p>
      ))
    ) : (
      <p className="text-base">{text}</p>
    )}
  </div>
)

export const ImageBlock = ({ url, alt, aspectRatio = '16/9' }: { url: string, alt: string, aspectRatio?: string }) => (
  <div className={`relative max-w-[1000px] mx-auto w-full mb-16`} style={{ aspectRatio }}>
    <Image 
      src={url}
      alt={alt}
      fill
      className="object-cover"
    />
  </div>
)

export const VideoBlock = ({ url }: { url: string }) => (
  <div className="max-w-[1000px] mx-auto mb-16">
    <video 
      src={url}
      controls
      className="w-full"
    />
  </div>
)

export const ButtonBlock = ({ text, url }: { text: string, url: string }) => (
  <div>
    <Button variant="outline" asChild>
      <a href={url} target="_blank" rel="noopener noreferrer">{text}</a>
    </Button>
  </div>
) 