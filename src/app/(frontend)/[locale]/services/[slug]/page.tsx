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
    shortDescription: 'Fast, reliable air cargo with global carrier partnerships and time-critical delivery options.',
    fullDescription:
      'Custom-made, speedy, and cost-effective air freight solutions connecting all major global markets.',
    features: [
      'Special project cargo handling — heavy, out-of-gauge, hazardous, and high-value items',
      'Dedicated solutions for automotive, fashion, and emergency relief cargo',
      'Sea-air multimodal service',
      'Global preferred carrier network',
      'Time-defined consolidation and direct-to-consignee worldwide services',
      'Airport-to-airport and door-to-door delivery options',
      'Full and split charter loads',
    ],
  },
  'ocean-freight': {
    title: 'Ocean Freight',
    shortDescription: 'FCL and LCL ocean freight across major global trade lanes, with competitive rates and full cargo tracking.',
    fullDescription:
      'Comprehensive sea freight solutions built on strong carrier relationships and deep regional expertise.',
    features: [
      'Full Container Load (FCL) and Less than Container Load (LCL) shipments',
      'Coverage across all major global trade lanes',
      'Preferred partnerships with leading ocean carriers',
      'Port-to-port and door-to-door delivery options',
      'Real-time cargo tracking and status updates',
      'Dangerous goods and out-of-gauge cargo handling',
      'Competitive rates and flexible booking options',
    ],
  },
  'land-freight': {
    title: 'Land Freight',
    shortDescription: 'Cross-border trucking and road freight across Lebanon and the wider Middle East region.',
    fullDescription:
      'Reliable overland freight solutions connecting key markets across the Middle East with speed and flexibility.',
    features: [
      'Cross-border trucking across Lebanon, Syria, Jordan, Iraq, and the Gulf',
      'Full truck load (FTL) and part load (LTL) options',
      'Temperature-controlled transport for sensitive cargo',
      'Dedicated fleet with experienced drivers',
      'Real-time shipment tracking',
      'Customs coordination at all border crossings',
      'Door-to-door delivery across the region',
    ],
  },
  consolidation: {
    title: 'Consolidation',
    shortDescription: 'Reduce costs by consolidating your cargo with other shipments — flexible, affordable, and fully managed.',
    fullDescription:
      'Smart consolidation services that give you the benefits of full container shipping at a fraction of the cost.',
    features: [
      'LCL consolidation on regular fixed schedules',
      'Groupage services from all major origins',
      'Shared container solutions with full cargo accountability',
      'Flexible pick-up and delivery arrangements',
      'Full documentation and customs handling included',
      'Ideal for small to medium-sized shipments',
    ],
  },
  'packing-moving': {
    title: 'Packing & Local Moves',
    shortDescription: 'Preparing items for relocation.',
    fullDescription:
      'End-to-end packing and moving solutions handled with care, precision, and minimal disruption.',
    features: [
      'Professional packing using industry-grade materials',
      'Household and office relocation services',
      'Fragile, antique, and high-value item handling',
      'Furniture disassembly and reassembly',
      'Local and intercity moves',
      'Inventory management and labelling',
    ],
  },
  warehousing: {
    title: 'Warehousing & Logistics',
    shortDescription: 'Storage and management of goods',
    fullDescription:
      'Secure, well-located warehousing facilities backed by efficient logistics management across the region.',
    features: [
      'Short and long-term storage solutions',
      'Inventory management and stock reporting',
      'Pick, pack, and distribution services',
      'Temperature-controlled storage options',
      'Cross-docking and transshipment capabilities',
      'Bonded warehouse facilities',
      'Integration with customs clearance services',
    ],
  },
  'fairs-exhibitions': {
    title: 'Fairs & Exhibitions',
    shortDescription: 'Logistics for events and displays.',
    fullDescription:
      'Seamless logistics for your exhibition and event cargo — so you arrive on time, every time.',
    features: [
      'Door-to-stand delivery and collection',
      'Temporary import and re-export customs handling',
      'ATA Carnet processing',
      'On-site logistics coordination and supervision',
      'Storage between events',
      'Urgent and time-critical shipment handling',
    ],
  },
  'customs-clearance': {
    title: 'Customs Clearance',
    shortDescription: 'Navigating import/export regulations.',
    fullDescription:
      'Fast, compliant customs clearance handled by specialists who know every market we operate in.',
    features: [
      'Import and export customs clearance',
      'Tariff classification and duty calculation',
      'Documentation preparation and submission',
      'Liaison with customs authorities across all 8 countries',
      'Temporary admission and re-export handling',
      'Compliance advisory for complex or restricted goods',
    ],
  },
  'relief-cargo': {
    title: 'Relief Cargo Specialists',
    shortDescription: 'Handling emergency supply shipments.',
    fullDescription:
      'Experienced in moving critical humanitarian and emergency cargo with speed, sensitivity, and full compliance.',
    features: [
      'Emergency and humanitarian aid shipment handling',
      'Coordination with NGOs, UN agencies, and relief organisations',
      'Expedited customs clearance for relief goods',
      'Air, sea, and land options for rapid deployment',
      'Handling of medical supplies, food, and shelter equipment',
      '24/7 availability for crisis response logistics',
    ],
  },
  'heavy-lifts': {
    title: 'Projects and Heavy Lifts',
    shortDescription: 'Managing large-scale transport projects.',
    fullDescription:
      'Specialist project cargo and heavy lift solutions for the most demanding transport challenges.',
    features: [
      'Out-of-gauge and overweight cargo transport',
      'Route surveys and feasibility studies',
      'Heavy lift crane and equipment coordination',
      'Multi-modal transport planning (sea, air, road)',
      'Oil & gas, construction, and industrial project experience',
      'Full documentation, permits, and escort arrangements',
    ],
  },
  nvocc: {
    title: 'Box Operations for NVOCCs',
    shortDescription: 'Managing non-vessel operating common carriers.',
    fullDescription:
      'Reliable container operations and NVOCC support services backed by deep regional expertise.',
    features: [
      'Container positioning and repositioning',
      'Empty container management and depot coordination',
      'Bill of lading issuance and documentation',
      'Freight collection and disbursement',
      'Local port and terminal liaison',
      'Full operational support across all Gezairi offices',
    ],
  },
  'vessel-agency': {
    title: 'Vessel Agency',
    shortDescription: 'Services for ship operations and logistics.',
    fullDescription:
      'Trusted vessel agency services delivered by experienced port operators with strong local authority relationships.',
    features: [
      'Port call coordination and husbandry services',
      'Crew changes, repatriation, and welfare services',
      'Bunker and fresh water supply coordination',
      'Cargo operations supervision',
      'Customs, immigration, and port authority liaison',
      'Disbursement account management',
      '24/7 on-call port agency support',
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
