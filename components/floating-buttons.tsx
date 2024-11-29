'use client'

import { useState, useEffect, useRef } from 'react'
import { BeakerIcon, MoonIcon as Moon, SunIcon as Sun, EnvelopeIcon as Envelope, RocketLaunchIcon as Rocket, ChevronRightIcon } from '@heroicons/react/24/solid'
import { SocialIcon } from 'react-social-icons'
import { Button } from "@/components/ui/button"
import { ContactDrawer } from '@/components/contact-drawer'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function FloatingButtons({ pathname }: { pathname: string }) {
  const [isDark, setIsDark] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const mainButtonsRef = useRef<HTMLDivElement>(null)
  const socialButtonsRef = useRef<HTMLDivElement>(null)

  const springTransition = {
    type: "spring",
    stiffness: 200,
    damping: 30,
    duration: 0.7,
    ease: [0.77, 0, 0.175, 1],
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(savedTheme === 'dark' || (!savedTheme && systemPrefersDark))
    document.documentElement.classList.toggle('dark', savedTheme === 'dark' || (!savedTheme && systemPrefersDark))
  }, [])

  const toggleDark = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    document.documentElement.classList.toggle('dark', newDarkMode)
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
  }

  const isWorkActive = () => pathname === '/' || pathname.startsWith('/projects/')

  return (
    <>
      <motion.div 
        className="fixed bottom-10 left-1/2 -translate-x-1/2 flex p-2 bg-background/80 backdrop-blur-sm rounded-full border shadow-lg z-50"
        layout
        transition={springTransition}
      >
        <motion.div 
          className="flex items-center gap-1"
          layout
        >
          <Link href="/" className={isWorkActive() ? "contents" : undefined}>
            <Button 
              variant={isWorkActive() ? "default" : "ghost"} 
              size="lg" 
              className="flex gap-2 rounded-full"
            >
              <Rocket className="h-8 w-8" />
              <AnimatePresence mode="wait">
                {isWorkActive() && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    Work
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </Link>

          <Link href="/experiments">
            <Button 
              variant={pathname === '/experiments' ? "default" : "ghost"} 
              size="lg" 
              className="flex gap-2 rounded-full"
            >
              <BeakerIcon className="h-8 w-8" />
              <AnimatePresence mode="wait">
                {pathname === '/experiments' && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    Experiments
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="lg" 
            onClick={() => setContactOpen(true)} 
            className="flex gap-2 rounded-full"
          >
            <Envelope className="h-8 w-8" />
          </Button>

          <Button 
            variant="ghost" 
            size="lg" 
            onClick={toggleDark} 
            className="flex gap-2 rounded-full"
          >
            {isDark ? <Sun className="h-8 w-8" /> : <Moon className="h-8 w-8" />}
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex gap-2 rounded-full transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          >
            <ChevronRightIcon className="h-8 w-8" />
          </Button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="flex gap-1 overflow-hidden"
              >
                <div className="flex gap-1">
                  <SocialIcon 
                    url="https://github.com"
                    className="!h-[40px] !w-[40px]"
                    target="_blank"
                    bgColor="transparent"
                    fgColor="currentColor"
                  />
                  <SocialIcon 
                    url="https://twitter.com"
                    className="!h-[40px] !w-[40px]"
                    target="_blank"
                    bgColor="transparent"
                    fgColor="currentColor"
                  />
                  <SocialIcon 
                    url="https://linkedin.com"
                    className="!h-[40px] !w-[40px]"
                    target="_blank"
                    bgColor="transparent"
                    fgColor="currentColor"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <ContactDrawer open={contactOpen} onOpenChange={setContactOpen} />
    </>
  )
} 