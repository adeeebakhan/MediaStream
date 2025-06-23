import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MediaStream', 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
