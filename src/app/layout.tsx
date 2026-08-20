import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Gezairi',
    template: '%s | Gezairi',
  },
  description: 'Serving global logistics solutions since 1945',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Passthrough layout - Payload and Frontend have their own HTML structure
  return children
}
