import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { PageLayoutServer as PageLayout } from '@/components/layout'
import { getServiceBySlug, getServices } from '@/lib/payload'
import type { Service } from '@/payload-types'

interface FallbackServiceData {
  title: string
  shortDescription: string
  fullDescription: string
  features: string[]
}

const fallbackServiceData: Record<string, FallbackServiceData> = {
  'air-freight': {
    title: 'Air Freight',
    shortDescription: 'Transportation of goods by air.',
    fullDescription:
      'Customs made, speedy, reliable, and cost effective solutions connecting all major global markets.',
    features: [
      'Special project cargo handling service (heavy, out of gauge, hazardous goods, and expensive high value items)',
      'Special solutions for automotive, fashion, and emergency relief goods',
      'Sea-air multimodal service',
      'Samaritin',
      'Global preferred carriers',
      'Time defined consolidation and direct-to-consignée worldwide services',
      'Airport-to-airport and door-to-door deliveries',
      'Full and split charter loads',
    ],
  },
  'ocean-freight': {
    title: 'Ocean Freight',
    shortDescription: 'Shipping goods via sea routes.',
    fullDescription:
      'Comprehensive ocean freight solutions with global coverage, offering flexible and reliable shipping services across all major trade lanes.',
    features: [
      'Full Container Load (FCL) services',
      'Less than Container Load (LCL) services',
      'Reefer container solutions for temperature-sensitive cargo',
      'Break-bulk and project cargo shipping',
      'Worldwide port-to-port and door-to-door coverage',
      'Competitive rates through volume contracts with major carriers',
      'Real-time shipment tracking and visibility',
      'Customs documentation and compliance support',
    ],
  },
  'land-freight': {
    title: 'Land Freight',
    shortDescription: 'Transporting goods over land.',
    fullDescription:
      'Efficient and reliable overland transportation solutions connecting key markets across the region and beyond.',
    features: [
      'Full Truck Load (FTL) services',
      'Less than Truck Load (LTL) services',
      'Cross-border transportation',
      'Temperature-controlled transport',
      'Regional distribution networks',
      'Dedicated fleet operations',
      'Real-time GPS tracking',
      'Customs transit documentation',
    ],
  },
  consolidation: {
    title: 'Consolidation',
    shortDescription: 'Combining shipments for efficiency.',
    fullDescription:
      'Strategic consolidation services that optimize shipping costs by combining multiple shipments into single containers or loads.',
    features: [
      'LCL consolidation services',
      'Buyer consolidation programs',
      'Multi-origin consolidation',
      'Warehouse consolidation',
      'Cost optimization through volume aggregation',
      'Flexible scheduling and routing',
      'Quality control and cargo inspection',
      'Comprehensive documentation management',
    ],
  },
  'packing-moving': {
    title: 'Packing & Local Moves',
    shortDescription: 'Preparing items for relocation.',
    fullDescription:
      'Professional packing and local moving services ensuring the safe handling and transportation of your valuable goods.',
    features: [
      'Professional packing and crating services',
      'Household goods relocation',
      'Office and commercial moves',
      'Fine art and antique handling',
      'Climate-controlled storage facilities',
      'Insurance coverage for all shipments',
      'Unpacking and setup services',
      'Local and domestic transportation',
    ],
  },
  warehousing: {
    title: 'Warehousing & Logistics',
    shortDescription: 'Storage and management of goods',
    fullDescription:
      'State-of-the-art warehousing and distribution solutions designed to streamline your supply chain operations.',
    features: [
      'Modern warehouse facilities',
      'Inventory management systems',
      'Pick and pack services',
      'Cross-docking operations',
      'Distribution and fulfillment services',
      'Bonded warehouse storage',
      'Temperature-controlled storage',
      'Value-added services and labeling',
    ],
  },
  'fairs-exhibitions': {
    title: 'Fairs & Exhibitions',
    shortDescription: 'Logistics for events and displays.',
    fullDescription:
      'End-to-end logistics solutions for trade fairs, exhibitions, and events worldwide, ensuring timely and safe delivery of exhibition materials.',
    features: [
      'Door-to-booth delivery services',
      'Temporary import/export documentation',
      'ATA Carnet handling',
      'On-site supervision and coordination',
      'Return logistics management',
      'Custom crating for exhibition materials',
      'Storage solutions between events',
      'Insurance and risk management',
    ],
  },
  'customs-clearance': {
    title: 'Customs Clearance',
    shortDescription: 'Navigating import/export regulations.',
    fullDescription:
      'Expert customs brokerage services ensuring smooth and compliant clearance of your goods through all regulatory processes.',
    features: [
      'Import and export customs clearance',
      'Tariff classification and duty optimization',
      'Regulatory compliance consulting',
      'Documentation preparation and filing',
      'Duty drawback programs',
      'Free trade zone management',
      'Government agency liaison',
      'Trade compliance auditing',
    ],
  },
  'relief-cargo': {
    title: 'Relief Cargo Specialists',
    shortDescription: 'Handling emergency supply shipments.',
    fullDescription:
      'Specialized logistics for humanitarian aid and relief cargo, providing rapid response capabilities for emergency situations worldwide.',
    features: [
      'Emergency response logistics',
      'Humanitarian aid transportation',
      'Rapid deployment capabilities',
      'Coordination with relief agencies',
      'Charter services for urgent cargo',
      'Field logistics and last-mile delivery',
      'Donor compliance and reporting',
      'Warehouse staging for relief operations',
    ],
  },
  'heavy-lifts': {
    title: 'Projects and Heavy Lifts',
    shortDescription: 'Managing large-scale transport projects.',
    fullDescription:
      'Specialized project logistics for oversized, heavy, and complex cargo requiring customized transportation solutions.',
    features: [
      'Heavy lift and oversized cargo transport',
      'Route surveys and feasibility studies',
      'Specialized equipment and rigging',
      'Multi-modal transportation planning',
      'Engineering and lifting studies',
      'Permit and escort arrangements',
      'On-site project management',
      'Turnkey project logistics solutions',
    ],
  },
  nvocc: {
    title: 'Box Operations for NVOCCs',
    shortDescription: 'Managing non-vessel operating common carriers.',
    fullDescription:
      'Comprehensive container management and NVOCC operations, providing flexible and cost-effective shipping solutions.',
    features: [
      'Container leasing and management',
      'Bill of lading issuance',
      'Carrier contract negotiations',
      'Container tracking and tracing',
      'Equipment repositioning',
      'Slot charter arrangements',
      'Freight rate management',
      'Multi-carrier booking platforms',
    ],
  },
  'vessel-agency': {
    title: 'Vessel Agency',
    shortDescription: 'Services for ship operations and logistics.',
    fullDescription:
      'Full vessel agency services supporting ship operations, port calls, and maritime logistics across key ports.',
    features: [
      'Port call coordination',
      'Crew management and logistics',
      'Bunker and provisions supply',
      'Cargo operations supervision',
      'Documentation and port authority liaison',
      'Vessel husbandry services',
      'Emergency response coordination',
      'Maritime regulatory compliance',
    ],
  },
}

interface ServicePageProps {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const service: Service | null = await getServiceBySlug(slug, locale as import('payload').TypedLocale)
  const fallback = fallbackServiceData[slug]

  const title = service?.title || fallback?.title || 'Service'
  const description =
    service?.shortDescription || fallback?.shortDescription || ''

  return {
    title: `${title} | GEZAIRI`,
    description,
  }
}

function extractDescription(service: Service): string | null {
  if (!service.fullDescription) return null
  if (
    typeof service.fullDescription === 'object' &&
    service.fullDescription.root?.children
  ) {
    return service.fullDescription.root.children
      .map((child) => {
        if (
          (child.type === 'paragraph' || child.type === 'heading') &&
          child.children
        ) {
          return Array.isArray(child.children)
            ? child.children.map((span) => span.text || '').join(' ')
            : ''
        }
        return ''
      })
      .filter(Boolean)
      .join(' ')
  }
  return service.fullDescription as unknown as string
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug, locale } = await params
  setRequestLocale(locale)
  const typedLocale = locale as import('payload').TypedLocale
  const service: Service | null = await getServiceBySlug(slug, typedLocale)
  const fallback = fallbackServiceData[slug]

  // If neither CMS data nor fallback exists, show a generic fallback
  const title = service?.title || fallback?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const description = service
    ? extractDescription(service)
    : fallback?.fullDescription || null
  const heroImageUrl =
    service?.heroImage &&
    typeof service.heroImage === 'object' &&
    'url' in service.heroImage &&
    service.heroImage.url
      ? service.heroImage.url
      : '/images/gezairi/heroes/newcover.jpg'

  // Build features array from CMS or fallback
  const features: string[] = service?.features?.length
    ? service.features.map((f) => f.feature)
    : fallback?.features || []

  const halfIndex = Math.ceil(features.length / 2)
  const leftFeatures = features.slice(0, halfIndex)
  const rightFeatures = features.slice(halfIndex)

  return (
    <PageLayout locale={typedLocale}>
      {/* Hero Section */}
      <section className="w-full px-[10px] md:px-5 pt-0">
        <div className="relative w-full max-w-[1348px] h-[318px] md:h-[350px] lg:h-[486px] rounded-[20px] overflow-hidden">
          <Image
            src={heroImageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
      
     
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full px-4 md:px-[30px]">
        <div className="w-full max-w-[1330px] flex flex-col gap-[20px] lg:gap-[50px] px-[10px]">
          {/* Description */}
          {description && (
            <p className="text-[18px] md:text-[21px] lg:text-[24px] font-semibold text-[#252b27] leading-[26px] md:leading-[28px] lg:leading-[32px]">
              {description}
            </p>
          )}

          {/* Features List - Two Columns */}
          {features.length > 0 && (
            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-[20px] w-full">
              {/* Left Column */}
              <div className="flex flex-col gap-[15px] flex-1">
                {leftFeatures.map((feature, idx) => (
                  <div key={idx} className="flex gap-[10px] items-start">
                    <div className="w-[26px] h-[26px] relative shrink-0 mt-[3px]">
                      <Image
                        src="/images/gezairi/icons/check-icon.svg"
                        alt=""
                        aria-hidden="true"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <p className="text-[16px] md:text-[20px] lg:text-[24px] font-light text-[#252b27] leading-[26px] md:leading-[28px] lg:leading-[32px]">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
              {/* Right Column */}
              <div className="flex flex-col gap-[15px] flex-1">
                {rightFeatures.map((feature, idx) => (
                  <div key={idx} className="flex gap-[10px] items-start">
                    <div className="w-[26px] h-[26px] relative shrink-0 mt-[3px]">
                      <Image
                        src="/images/gezairi/icons/check-icon.svg"
                        alt=""
                        aria-hidden="true"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <p className="text-[16px] md:text-[20px] lg:text-[24px] font-light text-[#252b27] leading-[26px] md:leading-[28px] lg:leading-[32px]">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Check all services button */}
          <div>
            <Link
              href={`/${locale}/services`}
              className="inline-block rounded-[25px] bg-[#9B7C4B] text-white px-[15px] py-[10px] text-[18px] md:text-[21px] lg:text-[24px] font-semibold leading-[30px] hover:bg-[#9B7C4B]/90 focus-visible:ring-2 focus-visible:ring-[#9B7C4B] focus-visible:ring-offset-2"
            >
              Check all services
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export async function generateStaticParams() {
  const services = await getServices()
  return services.docs.map((service) => ({ slug: service.slug }))
}
