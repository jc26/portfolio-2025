'use client'

import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import localFont from "next/font/local"
import { FloatingButtons } from '@/components/floating-buttons'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="antialiased bg-background text-foreground">
        <AnimatePresence 
          mode="wait" 
          initial={false}
        >
          <div key={pathname} className="min-h-screen px-6 pt-16 pb-28 md:px-24 md:pt-32 md:pb-32">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </AnimatePresence>
        <FloatingButtons />
      </body>
    </html>
  )
}
