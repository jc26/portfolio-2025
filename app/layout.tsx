import { MotionLayout } from '@/components/motion-layout'
import localFont from "next/font/local"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

export const metadata = {
  title: 'J/CHANG',
  description: 'Product Designer',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
    apple: '/apple-touch-icon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="antialiased bg-background text-foreground overflow-y-scroll">
        <div className="fixed inset-0 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="relative min-h-screen px-6 pt-16 pb-28 md:px-24 md:pt-32 md:pb-32">
              <MotionLayout>
                {children}
              </MotionLayout>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
