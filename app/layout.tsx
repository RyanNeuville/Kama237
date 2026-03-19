import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
