import type { Metadata } from 'next'
import { Rajdhani, Orbitron } from 'next/font/google'
import './globals.css'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani'
})

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-orbitron'
})

export const metadata: Metadata = {
  title: 'Venkata Siva Lalitaaditya Duggi - Futuristic Portfolio',
  description: 'Futuristic portfolio of Venkata Siva Lalitaaditya Duggi - B.Tech Computer Science student and Vice President of VIT-AP Newspaper Club. Experience the future of web design.',
  keywords: 'portfolio, computer science, web development, futuristic design, VIT-AP, technology',
  authors: [{ name: 'Venkata Siva Lalitaaditya Duggi' }],
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
    <html lang="en" className="scroll-smooth">
      <body className={`${rajdhani.variable} ${orbitron.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}