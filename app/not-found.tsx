import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="content-container">
      <section className="mt-16 mb-16">
        <div className="space-y-3 mb-3">
          <h1 className="text-3xl font-semibold">🧐</h1>
          <h2 className="text-base font-semibold">
            Oops. Looks like that page doesn&apos;t exist.
          </h2>
        </div>
        <p className="text-base text-muted-foreground mb-4 max-w-[500px]">
          Either that, or you&apos;re from the future sent to tell me about my next big project. I&apos;d love to hear all about it.
        </p>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </section>
    </div>
  )
} 