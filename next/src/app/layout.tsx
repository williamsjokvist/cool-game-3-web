import '../style/globals.sass'
import '../style/fonts.sass'
import '../style/register-btn.scss'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

/* https://nextjs.org/docs/app/api-reference/file-conventions/metadata */
export const metadata = {
  title: 'Cool Game 3'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
