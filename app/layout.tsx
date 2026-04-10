import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Home237 - Trouve ta maison au Cameroun',
  description: 'Plateforme immobilière au Cameroun : trouvez votre maison, appartement ou terrain au Cameroun. Facile, rapide, sérieux.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/h237.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/h237.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/h237.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/h237.png',
  },
}

import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
