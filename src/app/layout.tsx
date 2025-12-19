import type { Metadata } from 'next'
import { Manrope, Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

// Plus Jakarta Sans - Modern and clean like Geist
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

// Manrope - Clean and modern
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

// Inter - System font alternative
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Oblivion Labs - Enterprise Software Development & AI Solutions',
  description: 'Leading software development company specializing in full-stack web applications, AI integration, and custom digital solutions for businesses worldwide.',
  keywords: ['oblivion labs', 'software development', 'AI integration', 'full-stack development', 'React', 'Next.js', 'TypeScript', 'machine learning', 'enterprise solutions', 'web applications'],
  authors: [{ name: 'Oblivion Labs Team' }],
  creator: 'Oblivion Labs',
  publisher: 'Oblivion Labs',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oblivion-labs.com',
    title: 'Oblivion Labs - Enterprise Software Development & AI Solutions',
    description: 'Leading software development company specializing in full-stack web applications, AI integration, and custom digital solutions for businesses worldwide.',
    siteName: 'Oblivion Labs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oblivion Labs - Enterprise Software Development & AI Solutions',
    description: 'Leading software development company specializing in AI integration and custom digital solutions.',
    creator: '@oblivion_labs',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#d946ef',
}

import AnalyticsProvider from '@/components/AnalyticsProvider'
import Navbar from '@/components/Navbar'
import { AppProvider } from '@/contexts/AppContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${manrope.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo-icon.svg" />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-D6QYQ9PF4R"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D6QYQ9PF4R');
          `
        }} />
      </head>
      <body className={`${plusJakarta.className} antialiased`}>
        {/* Performance optimization: Add and remove preload class to prevent FOUC */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.body.classList.add('preload');
            setTimeout(() => {
              document.body.classList.remove('preload');
            }, 100);
          `
        }} />
        
        <AppProvider>
          {/* NAVBAR FIJO ANTES DE TODO EL CONTENIDO */}
          <Navbar />
          
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </AppProvider>
      </body>
    </html>
  )
}