import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Toaster } from '@/components/ui/toaster'
import { LoadingOverlay } from '@/components/layout/loading-overlay'
import { PageTransition } from '@/components/ui/page-transition'
import { getSiteSettings } from '@/lib/payload'
import { avenir } from '@/fonts'
import { routing } from '@/i18n/routing'
import '@/app/globals.css'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const [messages, siteSettings] = await Promise.all([getMessages(), getSiteSettings()])
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  const fontScale = siteSettings?.fontScale || '100'

  return (
    <html
      lang={locale}
      dir={dir}
      style={{ '--font-scale': `${Number(fontScale) / 100}` } as React.CSSProperties}
    >
      <head>
        <meta name="theme-color" content="#f7f7f7" />
        {/* Preload hero image for instant page transitions */}
        <link rel="prefetch" href="/images/gezairi/heroes/newcover.jpg" as="image" />
      </head>
      <body className={`${avenir.variable} font-avenir antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LoadingOverlay />
          <PageTransition>{children}</PageTransition>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
