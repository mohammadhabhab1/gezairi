import Image from 'next/image'

interface TimelineEvent {
  year: string
  title: string
  description: string
  imageUrl?: string
  status?: string
  position?: string
}

interface EventsTimelineProps {
  events: TimelineEvent[]
  heroImageUrl?: string
}

export function EventsTimeline({ events, heroImageUrl: _heroImageUrl }: EventsTimelineProps) {
  // Calculate vertical spacing between events (approximately 500px per event)
  const eventSpacing = 502
  const totalHeight = events.length * eventSpacing + 100

  return (
    <>
      {/* Mobile/Tablet - simple card list */}
      <section className="lg:hidden w-full px-4 flex flex-col gap-8">
        {events.map((event, index) => (
          <div key={index} className="flex flex-col gap-4">
            {event.imageUrl && (
              <div className="w-full h-[200px] md:h-[280px] relative rounded-[10px] overflow-hidden">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h3 className="text-[22px] md:text-[28px] font-semibold text-gezairi-blue leading-tight">
                {event.title}
              </h3>
              <p className="text-[16px] md:text-[18px] font-semibold text-gezairi-blue">
                Date: {event.year}
              </p>
              {event.status && (
                <p className="text-[14px] md:text-[16px] font-light text-black">
                  {event.status}
                </p>
              )}
              <p className="text-[14px] md:text-[16px] font-light text-black leading-[20px]">
                <span className="font-semibold">Description: </span>
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Desktop - preserved absolute layout */}
      <section className="hidden lg:block relative w-[1140px] pb-[40px]">
        {/* Top gray circle */}
        <div className="absolute left-[564px] top-0 w-[12px] h-[12px] bg-[#d6d6d6] rounded-full" />

        {/* Vertical line */}
        <div
          className="absolute left-[568px] top-[6px] w-[4px] bg-[#d6d6d6]"
          style={{ height: `${totalHeight}px` }}
        >
          {/* Bottom gray circle */}
          <div
            className="absolute left-[-4px] w-[12px] h-[12px] bg-[#d6d6d6] rounded-full"
            style={{ top: `${totalHeight - 6}px` }}
          />
        </div>

        {/* Events */}
        <div className="relative">
          {events.map((event, index) => {
            const topOffset = 102 + index * eventSpacing
            const position = event.position || (index % 2 === 0 ? 'left' : 'right')

            return (
              <div key={index}>
                {/* Blue circle marker */}
                <div
                  className="absolute left-[546px] w-[48px] h-[48px] bg-gezairi-blue border-4 border-[#d6d6d6] rounded-full z-10"
                  style={{ top: `${topOffset}px` }}
                />

                {position === 'left' ? (
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
                          Date: {event.year}
                        </p>
                        {event.status && (
                          <p className="text-[16px] font-light text-black leading-[16px]">
                            {event.status}
                          </p>
                        )}
                      </div>
                      <div className="p-[5px]">
                        <p className="text-[16px] font-light text-black leading-[20px] w-[399px]">
                          <span className="font-semibold">Description: </span>
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Event image - right side */}
                    {event.imageUrl && (
                      <div
                        className="absolute left-[645px] rounded-[10px] overflow-hidden"
                        style={{ top: `${topOffset}px` }}
                      >
                        <div className="w-[495px] h-[279px] relative">
                          <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Event image - left side */}
                    {event.imageUrl && (
                      <div
                        className="absolute left-0 rounded-[10px] overflow-hidden"
                        style={{ top: `${topOffset}px` }}
                      >
                        <div className="w-[495px] h-[289px] relative">
                          <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover rounded-[10px]"
                          />
                        </div>
                      </div>
                    )}

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
                          Date: {event.year}
                        </p>
                        {event.status && (
                          <p className="text-[16px] font-light text-black leading-[16px]">
                            {event.status}
                          </p>
                        )}
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
        <div style={{ height: `${totalHeight + 20}px` }} />
      </section>
    </>
  )
}
