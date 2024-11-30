'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react"
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FloatingButtons } from '@/components/floating-buttons'
import { Toaster } from "@/components/ui/toaster"

export function MotionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isFirstMount, setIsFirstMount] = useState(true)

  useEffect(() => {
    setIsFirstMount(false)
  }, [])

  return (
    <>
      <AnimatePresence mode="popLayout" initial={isFirstMount}>
        <motion.main
          key={pathname}
          initial={{ opacity: 0, filter: 'blur(10px)', y: 80 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          exit={{ opacity: 0, filter: 'blur(10px)', y: -80 }}
          transition={{
            duration: 0.8,
            ease: [0.32, 0, 0.15, 1],
            delay: isFirstMount ? 0.2 : 0
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
            className="mb-8 md:mb-16"
          >
            {children}
          </motion.div>
          <SiteFooter />
        </motion.main>
      </AnimatePresence>
      <FloatingButtons pathname={pathname} />
      <Toaster />
    </>
  )
} 