import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageLayoutServer as PageLayout } from '@/components/layout'
import { getServices, getMediaUrl } from '@/lib/payload'
import type { Service, Media } from '@/payload-types'
import { ServiceCard } from '@/components/services/service-card'
import { FadeIn } from '@/components/ui/fade-in'

const fallbackServices = [
  {
    icon: '/images/gezairi/services/air-freight.png',
    iconWidth: 66,
    iconHeight: 65,
    title: 'Air Freight',
    description: 'Transportation o"f goods by air.',
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

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('services')

  const typedLocale = locale as import('payload').TypedLocale
  const servicesResult = await getServices(typedLocale)

  const services: ServiceCardData[] =
    servicesResult.docs.length > 0
      ? servicesResult.docs.map(transformService)
      : fallbackServices

  return (
    <PageLayout locale={typedLocale}>
      {/* Hero Section */}
      <section className="w-full px-[10px] md:px-5 pt-0">
        <div className="relative w-full max-w-[1348px] overflow-hidden rounded-[20px] bg-gezairi-blue aspect-[16/9] md:aspect-auto md:h-[350px] lg:h-[486px]">
          <Image
            src="/images/gezairi/heroes/newcover.jpg"
            alt="Services"
            fill
            sizes="(max-width: 768px) 100vw, 1348px"
            className="object-contain md:object-cover"
            priority
          />
          {/* 80 Years Emblem */}
         
          {/* <h1 className="absolute start-[17px] top-[28px] md:start-[31px] lg:top-[47px] text-[32px] md:text-[42px] lg:text-[64px] font-bold text-white leading-[35px] md:leading-tight lg:leading-[84px] w-1/2 md:w-auto">
            {t('title')}
          </h1> */}
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="w-full px-4 md:px-[30px] py-[10px] flex flex-col gap-[40px]">
        <FadeIn>
          <p className="text-[18px] md:text-[22px] lg:text-[28px] font-semibold text-gezairi-blue leading-[23px] tracking-[-0.05px]">
            {t('intro')}
          </p>
        </FadeIn>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-[30px] w-full">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} locale={locale} index={index} />
          ))}
        </div>
      </section>
    </PageLayout>
  )
}
