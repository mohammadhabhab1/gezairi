import Image from 'next/image'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { PageLayoutServer as PageLayout } from '@/components/layout'
import { getTimelineEvents, getMediaUrl } from '@/lib/payload'
import type { TimelineEvent, Media } from '@/payload-types'

const fallbackEvents = [
  {
    id: 1,
    title: 'Amazon is Born',
    date: 'July 5',
    status: 'Introduced',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim res aperta. Ne discipulum abducam, times. Primum quid tu dicis breve?  An haec ab eo non dicuntur?',
    image: '/images/gezairi/events/event-1.png',
    position: 'left' as const,
  },
  {
    id: 2,
    title: 'Amazon Prime Debuts',
    date: 'February 2',
    status: 'Expanded',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim res aperta. Ne discipulum abducam, times. Primum quid tu dicis breve?  An haec ab eo non dicuntur?',
    image: '/images/gezairi/events/event-2.png',
    position: 'right' as const,
  },
  {
    id: 3,
    title: 'Amazon Acquires Audible',
    date: 'January 31',
    status: 'Expanded',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim res aperta. Ne discipulum abducam, times. Primum quid tu dicis breve?  An haec ab eo non dicuntur?',
    image: '/images/gezairi/events/event-3.png',
    position: 'left' as const,
  },
]

interface EventCardData {
  id: number
  title: string
  date: string
  status: string
  description: string
  image: string
  position: 'left' | 'right'
}

function transformEvent(event: TimelineEvent, index: number): EventCardData {
  const imageUrl = event.image ? getMediaUrl(event.image as Media) : ''
  return {
    id: event.id,
    title: event.title,
    date: event.date,
    status: event.status || 'upcoming',
    description: event.description || '',
    image: imageUrl || `/images/gezairi/events/event-${index + 1}.png`,
    position: (event.position as 'left' | 'right') || 'left',
  }
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('events')
  const typedLocale = locale as import('payload').TypedLocale

  const eventsResult = await getTimelineEvents(typedLocale)

  const events: EventCardData[] =
    eventsResult.docs.length > 0
      ? eventsResult.docs.map(transformEvent)
      : fallbackEvents

  return (
    <PageLayout locale={typedLocale}>
      {/* Hero Section */}
      <section className="w-full px-[10px] md:px-5 pt-0">
        <div className="relative w-full max-w-[1348px] h-[318px] md:h-[350px] lg:h-[486px] rounded-[20px] overflow-hidden">
          <Image
            src="/images/gezairi/heroes/newcover.jpg"
            alt="Our Events"
            fill
            className="object-cover"
            priority
          />
          {/* 80 Years Emblem */}
          <div className="absolute top-[10px] end-0 w-[126px] h-[72px] md:top-0 md:w-[230px] md:h-[132px] lg:w-[345px] lg:h-[198px]">
            <Image
              src="/images/gezairi/heroes/who-we-are-emblem.png"
              alt="80 Years of Excellence"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="absolute start-[17px] top-[28px] md:start-[31px] lg:top-[47px] text-[32px] md:text-[42px] lg:text-[64px] font-bold text-white leading-[35px] md:leading-tight lg:leading-[84px] w-1/2 md:w-auto">
            {t('title')}
          </h1>
        </div>
      </section>

      {/* Mobile/Tablet Timeline - simple card list */}
      <section className="lg:hidden w-full px-4 flex flex-col gap-8">
        {events.map((event) => (
          <div key={event.id} className="flex flex-col gap-4">
            <div className="w-full h-[200px] md:h-[280px] relative rounded-[10px] overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[22px] md:text-[28px] font-semibold text-gezairi-blue leading-tight">
                {event.title}
              </h3>
              <p className="text-[16px] md:text-[18px] font-semibold text-gezairi-blue">
                Date: {event.date}
              </p>
              <p className="text-[14px] md:text-[16px] font-light text-black">
                {event.status}
              </p>
              <p className="text-[14px] md:text-[16px] font-light text-black leading-[20px]">
                <span className="font-semibold">Description: </span>
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Desktop Timeline - preserved absolute layout */}
      <section className="hidden lg:block relative w-[1140px] pb-[40px]">
        {/* Top gray circle */}
        <div className="absolute left-[564px] top-0 w-[12px] h-[12px] bg-[#d6d6d6] rounded-full" aria-hidden="true" />

        {/* Vertical line */}
        <div className="absolute left-[568px] top-[6px] w-[4px] h-[1507px] bg-[#d6d6d6]" aria-hidden="true">
          {/* Bottom gray circle */}
          <div className="absolute left-[-4px] top-[1506px] w-[12px] h-[12px] bg-[#d6d6d6] rounded-full" />
        </div>

        {/* Events */}
        <div className="relative">
          {events.map((event, index) => {
            const topOffset = index === 0 ? 102 : index === 1 ? 604 : 1132

            return (
              <div key={event.id}>
                {/* Blue circle marker */}
                <div
                  className="absolute left-[546px] w-[48px] h-[48px] bg-gezairi-blue border-4 border-[#d6d6d6] rounded-full z-10"
                  style={{ top: `${topOffset}px` }}
                  aria-hidden="true"
                />

                {event.position === 'left' ? (
                  <>
                    {/* Event card - left side */}
                    <div
                      className="absolute left-[16px] w-[430px] p-[5px] flex flex-col gap-[10px]"
                      style={{ top: `${topOffset}px` }}
                    >
                      <div className="p-[5px]">
                        <h3 className="text-[36px] font-semibold text-gezairi-blue leading-[29px]">
                          {event.title}
                        </h3>
                      </div>
                      <div className="p-[5px] flex flex-col gap-[5px]">
                        <p className="text-[22px] font-semibold text-gezairi-blue leading-[22px]">
                          Date: {event.date}
                        </p>
                        <p className="text-[16px] font-light text-black leading-[16px]">
                          {event.status}
                        </p>
                      </div>
                      <div className="p-[5px]">
                        <p className="text-[16px] font-light text-black leading-[20px] w-[399px]">
                          <span className="font-semibold">Description: </span>
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Event image - right side */}
                    <div
                      className="absolute left-[645px] bg-white rounded-[10px] overflow-hidden"
                      style={{ top: `${topOffset}px` }}
                    >
                      <div className="w-[495px] h-[279px] relative">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Event image - left side */}
                    <div
                      className="absolute left-0 bg-white rounded-[10px] overflow-hidden"
                      style={{ top: `${topOffset}px` }}
                    >
                      <div className="w-[495px] h-[289px] relative">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover rounded-[10px]"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Event card - right side */}
                    <div
                      className="absolute left-[645px] w-[430px] p-[5px] flex flex-col gap-[10px]"
                      style={{ top: `${topOffset}px` }}
                    >
                      <div className="p-[5px]">
                        <h3 className="text-[36px] font-semibold text-gezairi-blue leading-[29px]">
                          {event.title}
                        </h3>
                      </div>
                      <div className="p-[5px] flex flex-col gap-[5px]">
                        <p className="text-[22px] font-semibold text-gezairi-blue leading-[22px]">
                          Date: {event.date}
                        </p>
                        <p className="text-[16px] font-light text-black leading-[16px]">
                          {event.status}
                        </p>
                      </div>
                      <div className="p-[5px] w-[410px]">
                        <p className="text-[16px] font-light text-black leading-[20px] w-[396px]">
                          <span className="font-semibold">Description: </span>
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Spacer for timeline height */}
        <div className="h-[1513px]" />
      </section>
    </PageLayout>
  )
}
