import type { Page, Media } from '@/payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import {
  PageHero,
  YearsImageSection,
  IntroTextSection,
  StatsBar,
  VisionSection,
  ValuesSection,
  DifferentiatorsSection,
  EventsTimeline,
  OfficesSection,
  PartnersSection,
  PartnersGrid,
  PartnershipCard,
  ServicesGrid,
  ServicesCarousel,
  ServicesParagraph,
  ServiceDetail,
  PrivacyContent,
  ContentSections,
  DrivingValueTogether,
} from '@/components/homepage'

type LayoutBlock = NonNullable<Page['layout']>[number]

interface RenderBlocksProps {
  blocks: LayoutBlock[]
}

export async function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <>
      {await Promise.all(
        blocks.map(async (block, index) => {
          const key = `${block.blockType}-${index}`

          switch (block.blockType) {
            case 'hero':
              return (
                <PageHero
                  key={key}
                  title={block.title || 'Default Title'}
                  subtitle={block.subtitle || undefined}
                  imageUrl={
                    typeof block.backgroundImage === 'object'
                      ? block.backgroundImage?.url || undefined
                      : undefined
                  }
                  overlayColor={block.overlayColor as 'blue' | 'dark'}
                />
              )

            case 'yearsImage':
              return (
                <YearsImageSection
                  key={key}
                  image={typeof block.image === 'object' ? block.image : ({} as Media)}
                  buttonText={block.buttonText}
                  buttonLink={block.buttonLink}
                />
              )

            case 'introText':
              return (
                <IntroTextSection
                  key={key}
                  highlightedText={block.highlightedText}
                  mainText={block.mainText}
                  additionalParagraphs={block.additionalParagraphs ?? undefined}
                />
              )

            case 'statsBar':
              return (
                <StatsBar
                key={key}
                stats={
                  block.stats?.map((stat) => ({
                    icon:
                      typeof stat.icon === 'object'
                        ? stat.icon?.url || undefined
                        : undefined,
                    value: stat.value || undefined,
                    label: stat.label,
                    labelWidth: stat.labelWidth || undefined,
                  })) || []
                }
              />
            )

          case 'vision':
            return (
              <VisionSection
                key={key}
                title={block.title || 'Default Title'}
                content={block.content}
                founderName={block.founderName || undefined}
                founderTitle={block.founderTitle || undefined}
                founderImageUrl={
                  typeof block.founderImage === 'object'
                    ? block.founderImage?.url || undefined
                    : undefined
                }
              />
            )

          case 'values': {
            let valuesData = []

            if (block.useCollectionData) {
              // Fetch values from the collection
              const payload = await getPayloadHMR({ config })
              const valuesResult = await payload.find({
                collection: 'values',
                sort: 'order',
                limit: 100,
              })

              valuesData = valuesResult.docs.map((value) => ({
                icon:
                  typeof value.icon === 'object'
                    ? value.icon?.url || '/placeholder-icon.svg'
                    : '/placeholder-icon.svg',
                title: value.title,
                description: value.description,
              }))
            } else {
              // Use manually entered values from the block
              valuesData =
                block.values?.map((value) => ({
                  icon:
                    typeof value.icon === 'object'
                      ? value.icon?.url || '/placeholder-icon.svg'
                      : '/placeholder-icon.svg',
                  title: value.title,
                  description: value.description,
                })) || []
            }

            return (
              <ValuesSection
                key={key}
                title={block.title}
                values={valuesData}
                showTitle={block.showTitle ?? undefined}

              />
            )
          }

          case 'differentiators':
            return (
              <DifferentiatorsSection
                key={key}
                title={block.title}
                leftColumn={
                  block.leftColumn?.map((item) => ({ text: item.text })) || []
                }
                rightColumn={
                  block.rightColumn?.map((item) => ({ text: item.text })) || []
                }
              />
            )

          case 'shippingServices':
            return (
              <DifferentiatorsSection
                key={key}
                title={block.title}
                leftColumn={
                  block.leftColumn?.map((item) => ({ text: item.text })) || []
                }
                rightColumn={
                  block.rightColumn?.map((item) => ({ text: item.text })) || []
                }
              />
            )

          case 'timeline': {
            // Fetch timeline events from the collection
            const payload = await getPayloadHMR({ config })
            const timelineResult = await payload.find({
              collection: 'timeline-events',
              sort: 'order',
              limit: 100,
            })

            const eventsData = timelineResult.docs.map((event) => ({
              year: event.date,
              title: event.title,
              description: event.description || '',
              imageUrl:
                typeof event.image === 'object'
                  ? event.image?.url || undefined
                  : undefined,
              status: event.status ?? undefined,
              position: event.position ?? undefined,
            }))

            return (
              <EventsTimeline
                key={key}
                heroImageUrl={
                  typeof block.heroImage === 'object'
                    ? block.heroImage?.url || undefined
                    : undefined
                }
                events={eventsData}
              />
            )
          }

          case 'offices': {
            let officesData = []

            if (block.useCollectionData) {
              // Fetch offices from the Regional Offices collection
              const payload = await getPayloadHMR({ config })
              const officesResult = await payload.find({
                collection: 'regional-offices',
                sort: 'order',
                limit: 100,
              })

              officesData = officesResult.docs.map((office) => ({
                country: office.country,
                cities: office.cities,
                phone1: office.phone1 || undefined,
                phone2: office.phone2 || undefined,
                email: office.email || undefined,
              }))
            } else {
              // Use manually entered offices from the block
              officesData =
                block.offices?.map((office) => ({
                  city: office.city,
                  country: office.country,
                  address: office.address?.map((a) => a.line || '') || [],
                  phone: office.phone || undefined,
                  fax: office.fax || undefined,
                  email: office.email || undefined,
                  website: office.website || undefined,
                })) || []
            }

            return (
              <OfficesSection
                key={key}
                title={block.title}
                subtitle={block.subtitle || undefined}
                mapImageUrl={
                  typeof block.mapImage === 'object'
                    ? block.mapImage?.url || undefined
                    : undefined
                }
                offices={officesData}
                useCollectionData={block.useCollectionData ?? undefined}
              />
            )
          }

          case 'partnersCarousel': {
            // Fetch partners from the collection based on category (carousel with 4 per view)
            const payload = await getPayloadHMR({ config })
            const partnersResult = await payload.find({
              collection: 'partners',
              where: {
                category: {
                  equals: block.category,
                },
              },
              sort: 'order',
              limit: 100,
            })

            const partnersData = partnersResult.docs.map((partner) => ({
              name: partner.name,
              logoUrl:
                typeof partner.logo === 'object'
                  ? partner.logo?.url || '/placeholder-logo.svg'
                  : '/placeholder-logo.svg',
              description: partner.description || undefined,
            }))

            return (
              <PartnersSection
                key={key}
                title={block.title}
                subtitle={block.subtitle || undefined}
                partners={partnersData}
              />
            )
          }

          case 'partnersGrid': {
            // Fetch partners from the collection based on category (grid with 5 per row)
            const payload = await getPayloadHMR({ config })
            const partnersResult = await payload.find({
              collection: 'partners',
              where: {
                category: {
                  equals: block.category,
                },
              },
              sort: 'order',
              limit: 100,
            })

            const partnersData = partnersResult.docs.map((partner) => ({
              name: partner.name,
              logoUrl:
                typeof partner.logo === 'object'
                  ? partner.logo?.url || '/placeholder-logo.svg'
                  : '/placeholder-logo.svg',
              description: partner.description || undefined,
            }))

            return (
              <PartnersGrid
                key={key}
                title={block.title}
                subtitle={block.subtitle || undefined}
                partners={partnersData}
              />
            )
          }

          case 'partnershipCard':
            return (
              <PartnershipCard
                key={key}
                titleLine1={block.titleLine1}
                titleLine2={block.titleLine2}
                descriptionLine1={block.descriptionLine1}
                descriptionLine2={block.descriptionLine2 || undefined}
                partnerLogoUrl={
                  typeof block.partnerLogo === 'object'
                    ? block.partnerLogo?.url || '/placeholder-logo.svg'
                    : '/placeholder-logo.svg'
                }
              />
            )

          case 'servicesGrid': {
            let servicesData = []

            if (block.useCollectionData) {
              // Fetch services from the collection
              const payload = await getPayloadHMR({ config })
              const servicesResult = await payload.find({
                collection: 'services',
                sort: 'order',
                limit: 100,
              })

              servicesData = servicesResult.docs.map((service) => ({
                slug: service.slug,
                title: service.title,
                description: service.shortDescription || '',
                iconUrl:
                  typeof service.icon === 'object'
                    ? service.icon?.url || undefined
                    : undefined,
              }))
            } else {
              // Use manually entered services from the block
              servicesData =
                block.services?.map((service) => ({
                  slug: service.slug,
                  title: service.title,
                  description: service.description,
                  iconUrl:
                    typeof service.icon === 'object'
                      ? service.icon?.url || undefined
                      : undefined,
                })) || []
            }

            return (
              <ServicesGrid
                key={key}
                title={block.title || 'Our Services'}
                subtitle={block.subtitle || undefined}
                services={servicesData}
                showTitle={block.showTitle ?? undefined}

              />
            )
          }

          case 'servicesCarousel': {
            let servicesData = []

            if (block.useCollectionData) {
              // Fetch services from the collection
              const payload = await getPayloadHMR({ config })
              const servicesResult = await payload.find({
                collection: 'services',
                sort: 'order',
                limit: 100,
              })

              servicesData = servicesResult.docs.map((service) => ({
                slug: service.slug,
                title: service.title,
                description: service.shortDescription || '',
                iconUrl:
                  typeof service.icon === 'object'
                    ? service.icon?.url || undefined
                    : undefined,
              }))
            } else {
              // Use manually entered services from the block
              servicesData =
                block.services?.map((service) => ({
                  slug: service.slug,
                  title: service.title,
                  description: service.description,
                  iconUrl:
                    typeof service.icon === 'object'
                      ? service.icon?.url || undefined
                      : undefined,
                })) || []
            }

            return (
              <ServicesCarousel
                key={key}
                title={block.title}
                subtitle={block.subtitle || undefined}
                services={servicesData}
                showTitle={block.showTitle ?? undefined}

              />
            )
          }

          case 'servicesParagraph':
            return (
              <ServicesParagraph
                key={key}
                text={block.text}
              />
            )

          case 'serviceDetail':
            return (
              <ServiceDetail
                key={key}
                title={block.title}
                subtitle={block.subtitle || undefined}
                description={block.description}
                heroImageUrl={
                  typeof block.heroImage === 'object'
                    ? block.heroImage?.url || undefined
                    : undefined
                }
                sideImageUrl={
                  typeof block.sideImage === 'object'
                    ? block.sideImage?.url || undefined
                    : undefined
                }
                features={
                  block.features?.map((feature) => ({ text: feature.text })) ||
                  []
                }
              />
            )

          case 'privacy':
            return (
              <PrivacyContent
                key={key}
                title={block.title}
                lastUpdated={block.lastUpdated || undefined}
                introduction={block.introduction || undefined}
                sections={
                  block.sections?.map((section) => ({
                    number: section.number,
                    title: section.title,
                    content: section.content,
                  })) || []
                }
              />
            )

          case 'contentSections':
            return (
              <ContentSections
                key={key}
                sections={
                  block.sections?.map((section) => ({
                    number: section.number || '',
                    title: section.title || '',
                    content: section.content || '',
                  })) || []
                }
              />
            )

          case 'drivingValueTogether':
            return (
              <DrivingValueTogether
                key={key}
                title={block.title}
                leftCard={{
                  logo:
                    typeof block.leftCard?.logo === 'object'
                      ? block.leftCard.logo?.url || ''
                      : '',
                  logoWidth: block.leftCard?.logoWidth || 418,
                  logoHeight: block.leftCard?.logoHeight || 68,
                  points: block.leftCard?.points?.map((p) => p.text) || [],
                }}
                rightCard={{
                  logo:
                    typeof block.rightCard?.logo === 'object'
                      ? block.rightCard.logo?.url || ''
                      : '',
                  logoWidth: block.rightCard?.logoWidth || 227,
                  logoHeight: block.rightCard?.logoHeight || 59,
                  points: block.rightCard?.points?.map((p) => p.text) || [],
                }}
              />
            )

          default:
            return null
        }
      })
      )}
    </>
  )
}
