'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Moon, Sun, Twitter, Github, Mail, Contact } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from "@/components/ui/button"
import projects from '@/data/projects.json'
import articles from '@/data/articles.json'
import { ContactDrawer } from '@/components/contact-drawer'
import { SiteHeader } from '@/components/site-header'

type Project = {
  id: number
  title: string
  client: string
  year: string
  description: string
}

type Article = {
  id: number
  title: string
  year: string
  isNew?: boolean
  description: string
}

export default function Component() {
  const [isDark, setIsDark] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Project | Article | null>(null)
  const [contactOpen, setContactOpen] = useState(false)

  const toggleDark = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors ${isDark ? 'dark' : ''}`}>
      <SiteHeader />

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-background/80 backdrop-blur-sm rounded-full border shadow-lg z-50">
        <Button variant="default" size="lg" onClick={() => setContactOpen(true)} className="flex gap-2 relative z-50 rounded-full">
          <Contact className="h-8 w-8" />
          Contact
        </Button>
        {/* <div className="w-px bg-border" /> */}
        <Button variant="secondary" size="lg" onClick={toggleDark} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className="relative z-50 rounded-full">
          {isDark ? <Sun className="h-8 w-8" /> : <Moon className="h-8 w-8" />}
        </Button>
      </div>

      <ContactDrawer open={contactOpen} onOpenChange={setContactOpen} />

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {selectedItem ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: '30%', filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: '30%', filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedItem(null)}
                className="mb-4"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-base mb-2">{selectedItem.title}</h2>
              {'client' in selectedItem && (
                <p className="text-base text-muted-foreground mb-4">
                  {selectedItem.client} • {selectedItem.year}
                </p>
              )}
              <p className="text-base text-muted-foreground">{selectedItem.description}</p>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: '20%', filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: '20%', filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <section className="mb-12">
                <div className="mb-4">
                  <h1 className="text-base font-semibold">Jason Chang</h1>
                  <p className="text-base">Product Designer at <a href="https://procreate.com" target="_blank" rel="noopener noreferrer" className="">Procreate</a> and <a href="https://antiwork.com" target="_blank" rel="noopener noreferrer" className="">Antiwork</a></p>
                </div>
                <p className="text-base mt-4">
                  I craft human interfaces that conform necessary function into intuitive form.
                </p>
              </section>
              

              <section className="mb-12">
                <h2 className="text-base font-semibold mb-6">Work</h2>
                <div className="space-y-6">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <Link href={`/projects/${project.id}`} className="cursor-pointer rounded-lg transition-colors">
                        <div className="flex justify-between items-start">
                          <h3 className="text-base font-medium">{project.title}</h3>
                        </div>
                        <p className="text-base text-muted-foreground">{project.year} • {project.client}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-base mb-4">Writing</h2>
                <div className="space-y-4">
                  {articles.map((article) => (
                    <div key={article.id}>
                      <motion.div
                        onClick={() => setSelectedItem(article)}
                        className="cursor-pointer rounded-lg transition-colors"
                      >
                        <h3 className="text-base">{article.title}</h3>
                        <p className="text-base text-muted-foreground">{article.year}</p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}