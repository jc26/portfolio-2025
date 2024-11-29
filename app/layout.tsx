'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import localFont from "next/font/local"
import { FloatingButtons } from '@/components/floating-buttons'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useContext, useRef } from "react"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {})
  const frozen = useRef(context).current
  
  if (!frozen) {
    return <>{props.children}</>
  }

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="antialiased bg-background text-foreground">
        
        <div className="relative min-h-screen px-6 pt-16 pb-28 md:px-24 md:pt-32 md:pb-32">
          
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.main
              key={pathname}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 80 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)', y: -80 }}
              transition={{
                duration: 0.8,
                ease: [0.32, 0, 0.15, 1],
              }}
            >
              <motion.div
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.32, 0, 0.15, 1],
                }}
              >
                <SiteHeader />
              </motion.div>
              <motion.div
                initial={{ y: 60 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.32, 0, 0.15, 1],
                }}
              >
                <FrozenRouter>{children}</FrozenRouter>
              </motion.div>
              <SiteFooter />
            </motion.main>
          </AnimatePresence>
        </div>
        
        <FloatingButtons pathname={pathname} />
        <Toaster />
      </body>
    </html>
  )
}
