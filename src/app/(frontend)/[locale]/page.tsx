import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageLayoutServer as PageLayout } from '@/components/layout'
import { getValues, getMediaUrl } from '@/lib/payload'
import type { Value, Media } from '@/payload-types'
import { HeroStats } from '@/components/homepage/hero-stats'
import { HeroGlobe } from '@/components/homepage/hero-globe'
import { HeroHeadline } from '@/components/homepage/hero-headline'
import { ValuesGrid } from '@/components/homepage/values-grid'
import { SectionTitle } from '@/components/ui/section-title'
import { FadeIn } from '@/components/ui/fade-in'

// Fallback data for when CMS is not seeded
const fallbackValues = [
  {
    icon: '/images/gezairi/icons/professionalism.svg',
    title: 'Professionalism',
    description:
      'We hold ourselves to the highest standards in every aspect of our operations, delivering first-class service that our clients can consistently rely on.',
  },
  {
    icon: '/images/gezairi/icons/good-partnership.svg',
    title: 'Good Partnership',
    description:
      'We build lasting, mutually beneficial relationships with our clients, partners, and stakeholders — grounded in trust, transparency, and shared success.',
  },
  {
    icon: '/images/gezairi/icons/legacy.svg',
    title: 'Legacy',
    description:
      'With over 80 years of history, we carry a deep pride in our roots while continuously evolving to meet the demands of a changing industry.',
  },
  {
    icon: '/images/gezairi/icons/sustainability.svg',
    title: 'Sustainability',
    description:
      'We are committed to sustaining our growth and competitiveness by continuously creating value — for our business, our clients, and the communities we serve.',
  },
  {
    icon: '/images/gezairi/icons/big-players.svg',
    title: 'Big Players',
    description:
      'We operate at the highest level, working alongside major global partners and handling complex, large-scale logistics with the expertise and capability to deliver.',
  },
  {
    icon: '/images/gezairi/icons/positivity.svg',
    title: 'Positivity',
    description:
      'We approach every challenge and opportunity with a constructive mindset, fostering a culture where people feel motivated, valued, and proud of what they do.',
  },
]

interface ValueCardData {
  icon: string
  title: string
  description: string
}

// Transform CMS data to component format
function transformValue(value: Value): ValueCardData {
  const iconUrl = value.icon ? getMediaUrl(value.icon as Media) : ''
  return {
    icon: iconUrl || `/images/gezairi/icons/${value.title.toLowerCase().replace(/\s+/g, '-')}.svg`,
    title: value.title,
    description: value.description,
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')

  // Fetch data from CMS
  const typedLocale = locale as import('payload').TypedLocale
  const valuesResult = await getValues(typedLocale)

  // Use CMS data or fallback
  const values: ValueCardData[] =
    valuesResult.docs.length > 0 ? valuesResult.docs.map(transformValue) : fallbackValues

  return (
    <PageLayout locale={typedLocale}>
      {/* Hero Section — refined layout with continent globe, glowing arcs, and polished stats */}
      <section className="hero-bg relative w-full overflow-hidden">
        {/* Subtle dot pattern background */}
        <div className="hero-bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[1340px] px-5 pb-8 pt-4 md:px-8 md:pb-12 md:pt-6 lg:px-12 lg:pb-16 lg:pt-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
            {/* Left: Headline */}
            <HeroHeadline
              eyebrow={t('heroEyebrow')}
              line1={t('heroLine1')}
              line2={t('heroLine2')}
              line3={t('heroLine3')}
              subtitle={t('heroSubtitle')}
            />

            {/* Right: Globe */}
            <FadeIn onMount direction="none" delay={0.4} duration={1.0}>
              <HeroGlobe />
            </FadeIn>
          </div>

          {/* Stats — full-width band beneath */}
          <div className="relative mt-12 md:mt-16 lg:mt-20">
            {/* Order: Established in, Countries, Employees, Successful Shipments, Total Customers */}
            <HeroStats
              stat1Value={t('heroStat3Value')}
              stat1Label={t('heroStat3Label')}
              stat2Value={t('heroStat4Value')}
              stat2Label={t('heroStat4Label')}
              stat3Value={t('heroStat5Value')}
              stat3Label={t('heroStat5Label')}
              stat4Value={t('heroStat1Value')}
              stat4Label={t('heroStat1Label')}
              stat5Value={t('heroStat2Value')}
              stat5Label={t('heroStat2Label')}
            />
          </div>
        </div>
      </section>

      {/* 80 Years Section */}
      <section className="w-full max-w-[1348px] px-[10px] py-0 md:px-[20px]">
        <FadeIn>
          <div className="img-zoom relative h-[196px] w-full overflow-hidden rounded-[20px] md:h-[400px] lg:h-[534px]">
            <Image
              src="/images/gezairi/heroes/eighty.png"
              alt={t('eightyYearsAlt')}
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
        </FadeIn>
      </section>

      {/* Our Values Section */}
      <section className="w-full max-w-[1330px] px-[10px] py-0">
        <div className="flex flex-col items-start gap-[20px] md:gap-[30px]">
          {/* Title */}
          <div className="flex flex-col items-start gap-[5px] md:gap-[10px]">
            <SectionTitle>{t('ourValues')}</SectionTitle>
          </div>

          {/* Values Grid — gold sweep on hover */}
          <ValuesGrid values={values} sweepColor="#9b7c4bbf" />
        </div>
      </section>

    </PageLayout>
  )
}
