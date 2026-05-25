import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Venkata Siva Lalitaaditya Duggi - Portfolio',
  description: 'AI/ML Developer & Full-Stack Engineer. B.Tech Computer Science (AI & ML) at VIT-AP. Building intelligent systems and production-ready platforms.',
  keywords: 'AI/ML developer, full-stack engineer, portfolio, Next.js, TypeScript, Python, TensorFlow',
  authors: [{ name: 'Venkata Siva Lalitaaditya Duggi' }],
  verification: {
    google: 'qub0blP6jmR_z4vPfwxZHoVgu63yf5aTU_RjD1hdwCc',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-bg text-fg transition-colors duration-300`}>
        <ThemeProvider>
        <div className="liquid-bg-element" />
        


        {children}
        <Analytics />
        <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}