'use client'

import { useState, useEffect } from 'react'
import { BeakerIcon, MoonIcon as Moon, SunIcon as Sun, EnvelopeIcon as Envelope, RocketLaunchIcon as Rocket, ChevronRightIcon } from '@heroicons/react/24/solid'
import { SocialIcon } from 'react-social-icons'
import { Button } from "@/components/ui/button"
import { ContactDrawer } from '@/components/contact-drawer'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function FloatingButtons({ pathname }: { pathname: string }) {
  const [isDark, setIsDark] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const springTransition = {
    type: "spring",
    stiffness: 85,
    damping: 14,
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
        className="fixed bottom-10 left-0 right-0 flex justify-center z-50"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
      >
        <motion.div 
          className="flex p-2 bg-background/70 backdrop-blur-md rounded-full border shadow-lg overflow-hidden"
          layout
        >
          <motion.div 
            className={`flex items-center gap-1 ${isExpanded ? 'pl-0 pr-1' : 'pl-1 pr-0'}`}
            animate={{
              justifyContent: isExpanded ? 'flex-end' : 'flex-start',
            }}
            transition={springTransition}
          >
            {/* Main Buttons */}
            <motion.div
              animate={{
                opacity: isExpanded ? 0 : 1,
                width: isExpanded ? 0 : 'auto',
              }}
              transition={springTransition}
              className="flex items-center gap-2"
            >
              <Button 
                variant={isWorkActive() ? "default" : "ghost"} 
                size="lg"
                className={isWorkActive() ? "flex items-center" : "flex items-center w-11 gap-0"}
                asChild
              >
                <Link href="/">
                  <Rocket className="h-8 w-8" />
                  <motion.span
                    initial={false}
                    animate={{
                      width: isWorkActive() ? 'auto' : 0,
                      opacity: isWorkActive() ? 1 : 0,
                    }}
                    transition={springTransition}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    Work
                  </motion.span>
                </Link>
              </Button>

              <Button 
                variant={pathname === '/experiments' ? "default" : "ghost"} 
                size="lg"
                className={pathname === '/experiments' ? "flex items-center" : "flex items-center w-11 gap-0"}
                asChild
              >
                <Link href="/experiments">
                  <BeakerIcon className="h-8 w-8" />
                  <motion.span
                    initial={false}
                    animate={{
                      width: pathname === '/experiments' ? 'auto' : 0,
                      opacity: pathname === '/experiments' ? 1 : 0,
                    }}
                    transition={springTransition}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    Experiments
                  </motion.span>
                </Link>
              </Button>

              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setContactOpen(true)} 
              >
                <Envelope className="h-8 w-8" />
              </Button>

              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleDark} 
              >
                {isDark ? <Sun className="h-8 w-8" /> : <Moon className="h-8 w-8" />}
              </Button>
            </motion.div>

            {/* Chevron */}
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            >
              <ChevronRightIcon className="h-8 w-8" />
            </Button>

            {/* Social Buttons */}
            <motion.div
              animate={{
                opacity: isExpanded ? 1 : 0,
                width: isExpanded ? 'auto' : 0,
              }}
              transition={springTransition}
              className="flex items-center gap-1"
            >
              <Button variant="ghost" size="icon" asChild>
                <SocialIcon 
                  url="https://github.com/jc26"
                  target="_blank"
                  className="!h-[44px] !w-[44px]"
                  bgColor="transparent"
                  fgColor="currentColor"
                />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <SocialIcon
                  url="https://x.com/jchang_26"
                  target="_blank"
                  className="!h-[44px] !w-[44px]"
                  bgColor="transparent"
                  fgColor="currentColor"
                />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <SocialIcon
                  url="https://www.linkedin.com/in/jason-c-a35a52126/"
                  target="_blank"
                  className="!h-[44px] !w-[44px]"
                  bgColor="transparent"
                  fgColor="currentColor"
                />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <ContactDrawer open={contactOpen} onOpenChange={setContactOpen} />
    </>
  )
} 