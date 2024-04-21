import '~styles/globals.css'

import { Header } from '~components/header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Supanonymous',
  description: ''
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={'en'}>
      <body className={'min-h-screen'}>
        <Header />

        <div className={'container m-auto px-1'}>{children}</div>
      </body>
    </html>
  )
}
