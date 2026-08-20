import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageLayoutServer as PageLayout } from '@/components/layout'
import { getValues, getServices, getMediaUrl } from '@/lib/payload'
import type { Value, Service, Media } from '@/payload-types'
import { ServicesCarousel } from '@/components/homepage/services-carousel'
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
      'We believe in adopting the highest standards of professionalism in our business operations and in providing First Class Service to our esteemed clients.',
  },
  {
    icon: '/images/gezairi/icons/good-partnership.svg',
    title: 'Good Partnership',
    description:
      'We believe in seeking and building a robust, long lasting and mutually beneficial Partnership with all our stakeholders.',
  },
  {
    icon: '/images/gezairi/icons/legacy.svg',
    title: 'Legacy',
    description:
      'We take pride in our rich history and profound experience and embark on its lessons for innovatively modernizing our profession.',
  },
  {
    icon: '/images/gezairi/icons/sustainability.svg',
    title: 'Sustainability',
    description:
      'We strive to sustain our success, competitiveness, and profitability with resilience and agility by continuously creating value to ensure business continuity.',
  },
  {
    icon: '/images/gezairi/icons/big-players.svg',
    title: 'Big Players',
    description:
      'We focus on approaching our challenges and opportunities with a smile while nurturing a culture of positivity.',
  },
  {
    icon: '/images/gezairi/icons/positivity.svg',
    title: 'Positivity',
    description:
      'We focus on approaching our challenges and opportunities with a smile while nurturing a culture of positivity.',
  },
]

const fallbackServices = [
  {
    icon: '/images/gezairi/services/air-freight.png',
    iconWidth: 66,
    iconHeight: 65,
    title: 'Air Freight',
    description: 'Transportation of goods by air.',
    slug: 'air-freight',
  },
  {
    icon: '/images/gezairi/services/ocean-freight.png',
    iconWidth: 60,
    iconHeight: 71,
    title: 'Ocean Freight',
    description: 'Shipping goods via sea routes.',
    slug: 'ocean-freight',
  },
  {
    icon: '/images/gezairi/services/land-freight.png',
    iconWidth: 91,
    iconHeight: 63,
    title: 'Land Freight',
    description: 'Transporting goods over land.',
    slug: 'land-freight',
  },
  {
    icon: '/images/gezairi/services/consolidation.png',
    iconWidth: 74,
    iconHeight: 74,
    title: 'Consolidation',
    description: 'Combining shipments for efficiency.',
    slug: 'consolidation',
  },
  {
    icon: '/images/gezairi/services/packing-moving.png',
    iconWidth: 65,
    iconHeight: 65,
    title: 'Packing & Local Moves',
    description: 'Preparing items for relocation.',
    slug: 'packing-moving',
  },
  {
    icon: '/images/gezairi/services/warehousing.png',
    iconWidth: 80,
    iconHeight: 62,
    title: 'Warehousing & Logistics',
    description: 'Storage and management of goods',
    slug: 'warehousing',
  },
  {
    icon: '/images/gezairi/services/fairs-exhibitions.png',
    iconWidth: 60,
    iconHeight: 66,
    title: 'Fairs & Exhibitions',
    description: 'Logistics for events and displays.',
    slug: 'fairs-exhibitions',
  },
  {
    icon: '/images/gezairi/services/customs-clearance.png',
    iconWidth: 55,
    iconHeight: 66,
    title: 'Customs Clearance',
    description: 'Navigating import/export regulations.',
    slug: 'customs-clearance',
  },
  {
    icon: '/images/gezairi/services/relief-cargo.png',
    iconWidth: 65,
    iconHeight: 65,
    title: 'Relief Cargo Specialists',
    description: 'Handling emergency supply shipments.',
    slug: 'relief-cargo',
  },
  {
    icon: '/images/gezairi/services/heavy-lifts.png',
    iconWidth: 65,
    iconHeight: 64,
    title: 'Projects and Heavy Lifts',
    description: 'Managing large-scale transport projects.',
    slug: 'heavy-lifts',
  },
  {
    icon: '/images/gezairi/services/nvocc.png',
    iconWidth: 75,
    iconHeight: 65,
    title: 'Box Operations for NVOCCs',
    description: 'Managing non-vessel operating common carriers.',
    slug: 'nvocc',
  },
  {
    icon: '/images/gezairi/services/vessel-agency.png',
    iconWidth: 65,
    iconHeight: 65,
    title: 'Vessel Agency',
    description: 'Services for ship operations and logistics.',
    slug: 'vessel-agency',
  },
]

interface ServiceCardData {
  icon: string
  iconWidth: number
  iconHeight: number
  title: string
  description: string
  slug: string
}

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

function transformService(service: Service): ServiceCardData {
  const iconUrl = service.icon ? getMediaUrl(service.icon as Media) : ''
  return {
    icon: iconUrl || `/images/gezairi/services/${service.slug}.png`,
    iconWidth: service.iconWidth || 65,
    iconHeight: service.iconHeight || 65,
    title: service.title,
    description: service.shortDescription,
    slug: service.slug || '',
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')

  // Fetch data from CMS
  const typedLocale = locale as import('payload').TypedLocale
  const [valuesResult, servicesResult] = await Promise.all([
    getValues(typedLocale),
    getServices(typedLocale),
  ])

  // Use CMS data or fallback
  const values: ValueCardData[] =
    valuesResult.docs.length > 0 ? valuesResult.docs.map(transformValue) : fallbackValues

  const services: ServiceCardData[] =
    servicesResult.docs.length > 0 ? servicesResult.docs.map(transformService) : fallbackServices

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

      {/* Our Services Section */}
      <section className="w-full max-w-[1340px] px-[10px] py-0">
        <div className="flex flex-col items-start gap-[10px] md:gap-[30px]">
          {/* Title */}
          <div className="flex flex-col items-start gap-[10px]">
            <SectionTitle>{t('ourServices')}</SectionTitle>
          </div>

          {/* Services Carousel */}
          <ServicesCarousel services={services} />
        </div>
      </section>
    </PageLayout>
  )
}
