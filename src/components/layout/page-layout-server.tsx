import { getLayoutData } from '@/lib/payload'
import { PageLayout } from './page-layout'
import type { Footer } from '@/payload-types'
import type { TypedLocale } from 'payload'

interface PageLayoutServerProps {
  children: React.ReactNode
  locale?: TypedLocale
}

export async function PageLayoutServer({ children, locale }: PageLayoutServerProps) {
  const { navigation, footer } = await getLayoutData(locale)

  return (
    <PageLayout
      navItems={navigation?.mainMenu?.map((item) => ({
        label: item.label,
        href: item.link,
      }))}
      footerData={footer as Footer | null}
    >
      {children}
    </PageLayout>
  )
}
