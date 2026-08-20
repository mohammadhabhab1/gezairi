import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { PageLayoutServer as PageLayout } from '@/components/layout'
import {
  getValues,
  getDifferentiators,
  getWhoWeAre,
  getTimelineEvents,
  getMediaUrl,
} from '@/lib/payload'
import type {
  Value,
  Media,
  Differentiator,
  WhoWeAre as WhoWeAreType,
  TimelineEvent,
} from '@/payload-types'
import { SectionTitle } from '@/components/ui/section-title'
import { TimelineRow } from '@/components/who-we-are/timeline-row'

const fallbackDifferentiators = {
  left: [
    'Being recognized globally with a successful history',
    'Having a clear business strategy for the coming 5 years',
    'Focusing on the quality and efficiency of our services',
    'Professional business communication for our clients suuport',
  ],
  right: [
    'Operating 24/7.',
    'Covering the full supply chain services',
    'Presence in more than 8 countries and 24 offices',
    "Safeguarding client's confidentiality.",
  ],
}

const fallbackValues = [
  {
    icon: '/images/gezairi/icons/professionalism-icon.svg',
    title: 'Professionalism',
    description:
      'We believe in adopting the highest standards of professionalism in our business operations and in providing First Class Service to our esteemed clients.',
  },
  {
    icon: '/images/gezairi/icons/partnership-icon.svg',
    title: 'Good Partnership',
    description:
      'We believe in seeking and building a robust, long lasting and mutually beneficial Partnership with all our stakeholders.',
  },
  {
    icon: '/images/gezairi/icons/legacy-icon.svg',
    title: 'Legacy',
    description:
      'We take pride in our rich history and profound experience and embark on its lessons for innovatively modernizing our profession.',
  },
  {
    icon: '/images/gezairi/icons/sustainability-icon.svg',
    title: 'Sustainability',
    description:
      'We strive to sustain our success, competitiveness, and profitability with resilience and agility by continuously creating value to ensure business continuity.',
  },
  {
    icon: '/images/gezairi/icons/goals-icon.svg',
    title: 'Big Players',
    description:
      'We focus on approaching our challenges and opportunities with a smile while nurturing a culture of positivity.',
  },
  {
    icon: '/images/gezairi/icons/positivity-icon.svg',
    title: 'Positivity',
    description:
      'We focus on approaching our challenges and opportunities with a smile while nurturing a culture of positivity.',
  },
]

const fallbackIntro = {
  highlightedIntro: 'The 1000 miles journey',
  introText:
    'started in 1945 when Abdul-Salam Bou-Azza El-Gezairi took the first step and opened a small customs clearing office in his hometown of Beirut, Lebanon.',
  additionalParagraphs: [
    'Over the years, Gezairi continued to expand and widen its scope of activities through hard work, diligence, and dedication to customers.',
    "The company's commitment to excellence forged a link around the world that made Gezairi become one of the leading international freight forwarding, shipping and logistics companies in the Middle East.",
  ],
}

const fallbackStats = [
  {
    type: 'icon' as const,
    icon: '/images/gezairi/icons/location-icon.svg',
    value: '',
    label: 'Corporate Head office in Beirut, Lebanon',
    labelWidth: 137,
  },
  {
    type: 'number' as const,
    icon: '',
    value: '45',
    label: 'Offices worldwide',
    labelWidth: 159,
  },
  {
    type: 'number' as const,
    icon: '',
    value: '600+',
    label: 'Experienced staff members in all offices',
    labelWidth: 140,
  },
  {
    type: 'icon' as const,
    icon: '/images/gezairi/icons/world-icon.svg',
    value: '',
    label: 'Wide spectrum of reputable agents & partners worldwide',
    labelWidth: 175,
  },
]

const fallbackVision = {
  visionTitle: "The Founder's Vision and Leadership Journey",
  visionParagraphs: [
    "Gezairi Transport's vision is to maintain leadership in offering a full range of transport, shipping, and logistics services based on high quality and fair value. We pledge to dedicate all our resources to attain total satisfaction and retention of our valued customers.",
    'Our pledge is to keep pioneering in our domain and region, inspired by our deeply rooted heritage.',
    'Our objective is to lead our customers beyond their recognized demands, by moving their cargo in the shortest time, optimal cost, and maximum safety. Our quest is to be responsive to new ideas and technologies that help in developing our transport industry and our human resources in which we believe and invest.',
  ],
}

const fallbackTimelineEvents = [
  {
    title: 'Lebanon, 1945',
    date: 'January 31',
    status: 'Introduced',
    description:
      'Abdul-Salam Bou-Azza El-Gezairi took the first step and opened a small customs clearing office in his hometown of Beirut, Lebanon.',
    position: 'left' as const,
  },
  {
    title: 'Jordan, 1950',
    date: 'February 2',
    status: 'Expanded',
    description:
      'Gezairi expanded operations to Jordan, establishing a strong foothold in the Levant region.',
    position: 'right' as const,
  },
  {
    title: 'Iraq, 1950',
    date: 'January 31',
    status: 'Expanded',
    description:
      'Further expansion into Iraq, growing the network of offices and logistics capabilities across the Middle East.',
    position: 'left' as const,
  },
  {
    title: 'Syria, 1950',
    date: 'February 2',
    status: 'Expanded',
    description:
      "Extended reach to Syria, reinforcing Gezairi's position as a leading regional freight forwarder.",
    position: 'right' as const,
  },
  {
    title: 'Cyprus, 1983',
    date: 'January 31',
    status: 'Expanded',
    description:
      'Established presence in Cyprus, bridging operations between the Middle East and Europe.',
    position: 'left' as const,
  },
  {
    title: 'UAE, 2020',
    date: 'February 2',
    status: 'Expanded',
    description:
      'Opened operations in the United Arab Emirates, tapping into the dynamic Gulf logistics market.',
    position: 'right' as const,
  },
  {
    title: 'KSA, 2023',
    date: 'January 31',
    status: 'Expanded',
    description:
      'Expanded to the Kingdom of Saudi Arabia, capitalizing on the rapidly growing logistics sector.',
    position: 'left' as const,
  },
  {
    title: 'India, 2023 - Backoffice',
    date: 'February 2',
    status: 'Expanded',
    description:
      'Set up backoffice operations in India, leveraging skilled talent for operational efficiency.',
    position: 'right' as const,
  },
  {
    title: 'Georgia, 2023 - Backoffice',
    date: 'January 31',
    status: 'Expanded',
    description:
      'Opened backoffice operations in Georgia, further expanding the global support network.',
    position: 'left' as const,
  },
  {
    title: 'India',
    date: 'February 2',
    status: 'Expanded',
    description:
      'Further expansion of operations in India, strengthening the presence in South Asia.',
    position: 'right' as const,
  },
]

interface ValueCardData {
  icon: string
  title: string
  description: string
}

interface StatData {
  type: 'icon' | 'number'
  icon: string
  value: string
  label: string
  labelWidth: number
}

interface TimelineEventData {
  title: string
  date: string
  description: string
  status?: string
  image?: string
  position: 'left' | 'right'
}

function transformValue(value: Value): ValueCardData {
  const iconUrl = value.icon ? getMediaUrl(value.icon as Media) : ''
  return {
    icon:
      iconUrl || `/images/gezairi/icons/${value.title.toLowerCase().replace(/\s+/g, '-')}-icon.svg`,
    title: value.title,
    description: value.description,
  }
}

function transformTimelineEvent(event: TimelineEvent): TimelineEventData {
  return {
    title: event.title,
    date: event.date,
    description: event.description || '',
    status: event.status || undefined,
    image: event.image ? getMediaUrl(event.image as Media) : undefined,
    position: (event.position as 'left' | 'right') || 'left',
  }
}

function TimelineEventCard({ event, mobile }: { event: TimelineEventData; mobile?: boolean }) {
  if (mobile) {
    return (
      <div className="flex flex-col gap-[5px] px-[5px]">
        <h3 className="text-[16px] font-semibold leading-[20px] text-gezairi-blue">
          {event.title}
        </h3>
        {event.status && (
          <p className="text-[12px] font-light capitalize leading-[16px] text-black">
            {event.status}
          </p>
        )}
        <p className="w-[149px] text-[12px] font-light leading-[18px] text-black">
          <span className="font-semibold">Description: </span>
          {event.description}
        </p>
      </div>
    )
  }
  return (
    <div className="flex w-full max-w-[430px] flex-col">
      <h3 className="text-[28px] font-semibold leading-[38px] text-gezairi-blue lg:text-[36px]">
        {event.title}
      </h3>
    
      {event.status && (
        <p className="text-[16px] font-light capitalize leading-[20px] text-black">
          {event.status}
        </p>
      )}
      <p className="mt-[16px] text-[16px] font-light leading-[22px] text-black">
        <span className="font-semibold">Description: </span>
        {event.description}
      </p>
    </div>
  )
}

function TimelineEventImage({ event, mobile }: { event: TimelineEventData; mobile?: boolean }) {
  const imgSrc = event.image || '/images/gezairi/timeline-placeholder.png'
  if (mobile) {
    return (
      <div className="relative h-[112px] w-[150px]">
        <Image src={imgSrc} alt={event.title} fill className="object-contain" />
      </div>
    )
  }
  return (
    <div className="w-full max-w-[430px] overflow-hidden rounded-[10px]">
      <div className="relative flex h-[250px] w-full items-center justify-center">
        <Image src={imgSrc} alt={event.title} fill className="object-contain" />
      </div>
    </div>
  )
}

function DesktopTimeline({ events }: { events: TimelineEventData[] }) {
  return (
    <div className="relative w-full">
      {/* Continuous center line */}
      <div className="absolute bottom-0 left-1/2 top-0 w-[4px] -translate-x-1/2 bg-[#d6d6d6]" />

      {/* Top dot */}
      <div className="absolute left-1/2 top-0 -mt-[6px] h-[12px] w-[12px] -translate-x-1/2 rounded-full bg-[#d6d6d6]" />

      {/* Events */}
      <div className="relative flex flex-col gap-[60px] pb-[60px] pt-[60px]">
        {events.map((event, index) => {
          const isLeft = event.position === 'left'
          return (
            <TimelineRow
              key={index}
              fromLeft={isLeft}
              className="relative flex w-full items-center"
            >
              {/* Left side */}
              <div className="flex w-[calc(50%-24px)] justify-center self-center">
                {isLeft ? (
                  <TimelineEventCard event={event} />
                ) : (
                  <TimelineEventImage event={event} />
                )}
              </div>

              {/* Center circle */}
              <div className="flex w-[48px] shrink-0 justify-center self-center">
                <div className="z-10 h-[48px] w-[48px] rounded-full border-4 border-[#d6d6d6] bg-gezairi-blue" />
              </div>

              {/* Right side */}
              <div className="flex w-[calc(50%-24px)] justify-center self-center">
                {isLeft ? (
                  <TimelineEventImage event={event} />
                ) : (
                  <TimelineEventCard event={event} />
                )}
              </div>
            </TimelineRow>
          )
        })}
      </div>

      {/* Bottom dot */}
      <div className="absolute bottom-0 left-1/2 mb-[-6px] h-[12px] w-[12px] -translate-x-1/2 rounded-full bg-[#d6d6d6]" />
    </div>
  )
}

function MobileTimeline({ events }: { events: TimelineEventData[] }) {
  return (
    <div className="relative mx-auto w-[350px] px-[5px]">
      {/* Continuous center line */}
      <div className="absolute bottom-0 left-1/2 top-0 w-[4px] -translate-x-1/2 bg-[#d6d6d6]" />

      {/* Top dot */}
      <div className="absolute left-1/2 top-0 h-[12px] w-[12px] -translate-x-1/2 rounded-full bg-[#d6d6d6]" />

      {/* Events */}
      <div className="relative flex flex-col gap-[40px] pb-[20px] pt-[34px]">
        {events.map((event, index) => {
          const isLeft = event.position === 'left'
          return (
            <TimelineRow
              key={index}
              fromLeft={isLeft}
              className="relative flex w-full items-center"
            >
              {/* Left side */}
              <div className="flex w-[calc(50%-20px)] justify-center self-center">
                {isLeft ? (
                  <TimelineEventCard event={event} mobile />
                ) : (
                  <TimelineEventImage event={event} mobile />
                )}
              </div>

              {/* Blue circle */}
              <div className="flex w-[40px] shrink-0 justify-center self-center">
                <div className="z-10 h-[30px] w-[30px] rounded-full border-4 border-[#d6d6d6] bg-gezairi-blue" />
              </div>

              {/* Right side */}
              <div className="flex w-[calc(50%-20px)] justify-center self-center">
                {isLeft ? (
                  <TimelineEventImage event={event} mobile />
                ) : (
                  <TimelineEventCard event={event} mobile />
                )}
              </div>
            </TimelineRow>
          )
        })}
      </div>

      {/* Bottom dot */}
      <div className="absolute bottom-0 left-1/2 h-[12px] w-[12px] -translate-x-1/2 rounded-full bg-[#d6d6d6]" />
    </div>
  )
}

export default async function WhoWeArePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('whoWeAre')

  const typedLocale = locale as import('payload').TypedLocale
  const [valuesResult, differentiatorsResult, whoWeAreResult, timelineResult] = await Promise.all([
    getValues(typedLocale),
    getDifferentiators(typedLocale),
    getWhoWeAre(typedLocale),
    getTimelineEvents(typedLocale),
  ])

  // Values
  const values: ValueCardData[] =
    valuesResult.docs.length > 0 ? valuesResult.docs.map(transformValue) : fallbackValues

  // Differentiators
  const diffData = differentiatorsResult as Differentiator | null
  const diffLeft =
    diffData?.leftColumn && diffData.leftColumn.length > 0
      ? diffData.leftColumn.map((item) => item.text)
      : fallbackDifferentiators.left
  const diffRight =
    diffData?.rightColumn && diffData.rightColumn.length > 0
      ? diffData.rightColumn.map((item) => item.text)
      : fallbackDifferentiators.right

  // Who We Are global
  const whoWeAre = whoWeAreResult as WhoWeAreType | null

  const highlightedIntro = whoWeAre?.highlightedIntro || fallbackIntro.highlightedIntro
  const introText = whoWeAre?.introText || fallbackIntro.introText
  const additionalParagraphs =
    whoWeAre?.additionalParagraphs && whoWeAre.additionalParagraphs.length > 0
      ? whoWeAre.additionalParagraphs.map((p) => p.text)
      : fallbackIntro.additionalParagraphs

  const stats: StatData[] =
    whoWeAre?.stats && whoWeAre.stats.length > 0
      ? whoWeAre.stats.map((stat) => ({
          type: stat.type,
          icon: stat.icon ? getMediaUrl(stat.icon as Media) : '',
          value: stat.value || '',
          label: stat.label,
          labelWidth: stat.labelWidth || 150,
        }))
      : fallbackStats

  const visionTitle = whoWeAre?.visionTitle || t('visionTitle')
  const visionParagraphs =
    whoWeAre?.visionParagraphs && whoWeAre.visionParagraphs.length > 0
      ? whoWeAre.visionParagraphs.map((p) => p.text)
      : fallbackVision.visionParagraphs

  const differentiatorsTitle = whoWeAre?.differentiatorsTitle || t('differentiators')

  // Timeline
  const timelineEvents: TimelineEventData[] =
    timelineResult.docs.length > 0
      ? timelineResult.docs.map(transformTimelineEvent)
      : fallbackTimelineEvents

  return (
    <PageLayout locale={typedLocale}>
      {/* Hero Section */}
      <section className="w-full px-[10px] pt-0 md:px-5">
        <div className="relative w-full max-w-[1348px] overflow-hidden rounded-[20px] bg-gezairi-blue aspect-[16/9] md:aspect-auto md:h-[350px] lg:h-[486px]">
          <Image
            src="/images/gezairi/heroes/newcover.jpg"
            alt="Who We Are"
            fill
            sizes="(max-width: 768px) 100vw, 1348px"
            className="object-contain md:object-cover"
            priority
          />
          {/* 80 Years Emblem */}
          <div className="absolute end-0 top-[10px] h-[72px] w-[126px] md:top-0 md:h-[132px] md:w-[230px] lg:h-[198px] lg:w-[345px]">
 
          </div>
          {/* <h1 className="absolute start-[17px] top-[28px] w-1/2 text-[32px] font-bold leading-[35px] text-white md:bottom-8 md:start-4 md:w-auto md:text-[42px] md:leading-tight lg:start-[31px] lg:top-[47px] lg:text-[64px] lg:leading-[84px]">
            {t('title')}
          </h1> */}
        </div>
      </section>

      {/* Intro Section */}
      <section className="w-full max-w-[1330px] px-[5px] md:px-[10px]">
        <div className="px-[10px] md:px-[10px]">
          <p className="text-justify text-gezairi-dark">
            <span className="text-[36px] font-bold leading-[32px] text-[#9B7C4B] lg:text-[48px]">
              {highlightedIntro}
            </span>{' '}
            <span className="text-[20px] font-light leading-[28px] lg:text-[24px] lg:leading-[32px]">
              {introText}
            </span>
          </p>
          {additionalParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="mt-0 text-justify text-[20px] font-light leading-[28px] text-gezairi-dark lg:text-[24px] lg:leading-[32px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="flex h-auto w-full max-w-[1380px] flex-col items-stretch justify-between gap-[14px] bg-gezairi-blue px-5 py-5 md:flex-row md:items-center md:gap-0 md:px-[20px] md:py-4 lg:h-[165px] lg:py-0">
        {/* Mobile: reorder to icons first, then numbers */}
        {[...stats]
          .sort((a, b) => {
            if (a.type === 'icon' && b.type === 'number') return -1
            if (a.type === 'number' && b.type === 'icon') return 1
            return 0
          })
          .map((stat, index) => (
            <div key={`mobile-${index}`} className="flex items-center gap-3 md:hidden">
              <div className="flex h-[42px] w-[58px] shrink-0 items-center justify-center">
                {stat.type === 'icon' ? (
                  <div className="relative h-[36px] w-[36px]">
                    <Image
                      src={stat.icon || '/images/gezairi/icons/location-icon.svg'}
                      alt=""
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <span className="text-[34px] font-semibold leading-none text-[#9B7C4B]">
                    {stat.value}
                  </span>
                )}
              </div>
              <p className="flex-1 text-[14px] font-semibold leading-[18px] text-white">{stat.label}</p>
            </div>
          ))}
        {/* Desktop: original order */}
        {stats.map((stat, index) => (
          <div key={`desktop-${index}`} className="hidden items-center gap-[13px] md:flex">
            {stat.type === 'icon' ? (
              <div className="relative h-[50px] w-[50px] shrink-0 lg:h-[65px] lg:w-[65px]">
                <Image
                  src={stat.icon || '/images/gezairi/icons/location-icon.svg'}
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <span className="shrink-0 text-[48px] font-semibold leading-[72px] text-[#9B7C4B] lg:text-[64px]">
                {stat.value}
              </span>
            )}
            <p
              className="text-[16px] font-semibold leading-[23px] text-white lg:text-[18px]"
              style={{ maxWidth: `${stat.labelWidth}px` }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* Founder's Vision Section */}
      <section className="flex w-full max-w-[1330px] flex-col gap-[20px] px-[5px] md:px-[10px]">
        <SectionTitle>{visionTitle}</SectionTitle>
        <div className="flex flex-col gap-[14px] md:gap-[20px] px-[5px] md:px-[10px]">
          {visionParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="w-full text-[15px] font-light leading-[24px] text-gezairi-dark md:text-[20px] md:leading-[32px] lg:text-[24px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* What Differentiates Us Section */}
      <section className="flex w-full max-w-[1330px] flex-col gap-[15px] px-[5px] md:gap-[30px] md:px-[10px]">
        <SectionTitle>{differentiatorsTitle}</SectionTitle>
        {/* Mobile: single column with all items */}
        <div className="flex flex-col gap-[5px] px-[5px] md:hidden">
          {[...diffLeft, ...diffRight].map((item, index) => (
            <div key={index} className="flex items-start gap-[10px]">
              <div className="relative mt-[7px] h-[25px] w-[25px] shrink-0">
                <Image
                  src="/images/gezairi/icons/check-icon.svg"
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <p className="w-[306px] text-[20px] font-light leading-[24px] text-gezairi-dark">
                {item}
              </p>
            </div>
          ))}
        </div>
        {/* Desktop: two columns */}
        <div className="hidden w-full gap-6 px-[10px] md:flex md:flex-col lg:flex-row lg:gap-[50px]">
          <div className="flex flex-col gap-[15px]">
            {diffLeft.map((item, index) => (
              <div key={index} className="flex items-center gap-[10px]">
                <div className="relative h-[30px] w-[30px] shrink-0">
                  <Image
                    src="/images/gezairi/icons/check-icon.svg"
                    alt=""
                    aria-hidden="true"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-[20px] font-light leading-[32px] text-gezairi-dark lg:text-[24px]">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-[15px]">
            {diffRight.map((item, index) => (
              <div key={index} className="flex items-center gap-[10px]">
                <div className="relative h-[30px] w-[30px] shrink-0">
                  <Image
                    src="/images/gezairi/icons/check-icon.svg"
                    alt=""
                    aria-hidden="true"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-[20px] font-light leading-[32px] text-gezairi-dark lg:text-[24px]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="flex w-full max-w-[1330px] flex-col gap-[20px] px-[10px] md:gap-[30px] md:px-[10px]">
        <SectionTitle>{t('ourValues')}</SectionTitle>
        <div className="flex flex-col items-center gap-[10px] md:hidden">
          {values.slice(0, 2).map((value, index) => (
            <div
              key={index}
              className="group relative flex h-[294px] w-full cursor-default flex-col items-center justify-center overflow-hidden rounded-[10px] bg-white px-[20px] py-[49px] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]"
            >
              {/* Sweep overlay — slides up from bottom */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-[#9b7c4bbf] transition-all duration-500 ease-out group-hover:h-full" />
              <div className="relative z-10 flex w-full flex-col items-center gap-[27px]">
                <div className="relative h-[100px] w-[100px] transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={value.icon}
                    alt={value.title}
                    fill
                    className="object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert"
                    unoptimized
                  />
                </div>
                <h3 className="text-[19.3px] font-semibold leading-[25px] tracking-[0.08px] text-gezairi-title transition-colors duration-300 group-hover:text-white">
                  {value.title}
                </h3>
                <p className="text-center text-[14.4px] font-light leading-[19px] tracking-[0.17px] text-black transition-colors duration-300 group-hover:text-white">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center">
            <Image
              src="/images/gezairi/icons/arrow-up-footer.svg"
              alt="Show more"
              width={40}
              height={25}
              className="rotate-180"
              unoptimized
            />
          </div>
        </div>
        <div className="hidden w-full gap-[20px] md:grid md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative flex h-auto min-h-[200px] w-full cursor-default flex-col items-center justify-center overflow-hidden rounded-[10px] bg-white px-[20px] py-8 transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] lg:h-[294px] lg:w-[420px] lg:py-[49px]"
            >
              {/* Sweep overlay — slides up from bottom */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-[#9b7c4bbf] transition-all duration-500 ease-out group-hover:h-full" />
              <div className="relative z-10 flex w-full flex-col items-center gap-[27px]">
                <div className="relative h-[100px] w-[100px] transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={value.icon}
                    alt={value.title}
                    fill
                    className="object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert"
                    unoptimized
                  />
                </div>
                <h3 className="text-[19.3px] font-semibold leading-[25px] tracking-[0.08px] text-gezairi-title transition-colors duration-300 group-hover:text-white">
                  {value.title}
                </h3>
                <p className="text-center text-[14.4px] font-light leading-[19px] tracking-[0.17px] text-black transition-colors duration-300 group-hover:text-white">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gezairi Timeline Section */}
      <section className="flex w-full max-w-[1330px] flex-col gap-[20px] px-[10px] md:gap-[30px] md:px-[10px]">
        <SectionTitle>{t('timeline')}</SectionTitle>

        {/* Desktop Timeline */}
        <div className="hidden w-full md:block">
          <DesktopTimeline events={timelineEvents} />
        </div>

        {/* Mobile Timeline */}
        <div className="block md:hidden">
          <MobileTimeline events={timelineEvents} />
        </div>
      </section>
    </PageLayout>
  )
}
