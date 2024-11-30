'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react"
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FloatingButtons } from '@/components/floating-buttons'
import { Toaster } from "@/components/ui/toaster"
import { FrozenRouter } from '@/components/frozen-router'

export function MotionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isFirstMount, setIsFirstMount] = useState(true)

  useEffect(() => {
    setIsFirstMount(false)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait" initial={isFirstMount}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 80, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -80, filter: 'blur(10px)' }}
          transition={{
            duration: 0.8,
            ease: [0.32, 0, 0.15, 1],
            delay: isFirstMount ? 0.2 : 0
          }}
        >
          <SiteHeader />
          <div className="mb-8 md:mb-16">
            <FrozenRouter>{children}</FrozenRouter>
          </div>
          <SiteFooter />
        </motion.div>
      </AnimatePresence>
      
      <FloatingButtons pathname={pathname} />
      <Toaster />
    </>
  )
} 