import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/theme-provider'
import { ClientWrapper } from '@/components/layout/client-wrapper'
import localFont from "next/font/local"
import "./globals.css"
import type { Metadata } from 'next'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: {
    template: '%s | JASON/C',
    default: 'Product Designer'
  },
  description: 'Jason Chang is a product designer based in Australia.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    shortcut: { url: '/favicon.ico' },
    apple: { url: '/apple-touch-icon.png' },
    other: [
      { rel: 'mask-icon', url: '/favicon.svg' },
    ],
  },
  openGraph: {
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/duuq9bfel/image/upload/v1733396395/nfl-social-min_fdhyal.jpg',
        width: 1200,
        height: 630,
        alt: 'Default OG Image'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@jchang_26'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="antialiased bg-background text-foreground overflow-y-scroll">
        <ThemeProvider>
          <Analytics />
          <div className="fixed inset-0 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <div className="relative px-6 pt-16 pb-28 md:px-24 md:pt-32 md:pb-32">
                <ClientWrapper>{children}</ClientWrapper>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
