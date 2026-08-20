import Image from 'next/image'

interface OfficeFromCollection {
  country: string
  cities: string
  phone1?: string
  phone2?: string
  email?: string
}

interface OfficeManual {
  city: string
  country: string
  address: string[]
  phone?: string
  fax?: string
  email?: string
  website?: string
}

interface OfficesSectionProps {
  title: string
  subtitle?: string
  offices: OfficeFromCollection[] | OfficeManual[]
  mapImageUrl?: string
  useCollectionData?: boolean
}

function OfficeCard({ office }: { office: OfficeFromCollection }) {
  return (
    <div className="flex flex-col gap-[15px] items-start w-full">
      <div className="flex flex-col gap-[10px] items-start w-full min-h-[100px]">
        <p className="text-[24px] md:text-[30px] lg:text-[36px] font-bold text-gezairi-blue leading-tight lg:leading-[42px]">
          {office.country}
        </p>
        <p className="text-[16px] md:text-[18px] lg:text-[20px] font-light text-gezairi-blue leading-[25px] tracking-[0.31px]">
          {office.cities}
        </p>
      </div>
      <div className="flex gap-[10px] items-start px-[5px]">
        <div className="w-[23px] h-[72px] relative shrink-0">
          <Image
            src="/images/gezairi/icons/contact-icons.svg"
            alt="Contact"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <div className="text-[16px] md:text-[18px] lg:text-[20px] font-light text-gezairi-blue leading-[24px]">
          {office.phone1 && <p>{office.phone1}</p>}
          {office.phone2 && <p>{office.phone2}</p>}
          {office.email && <p>{office.email}</p>}
        </div>
      </div>
    </div>
  )
}

export function OfficesSection({
  title,
  subtitle,
  offices,
  mapImageUrl,
  useCollectionData = true,
}: OfficesSectionProps) {
  // If using collection data, render the new design
  if (useCollectionData) {
    const collectionOffices = offices as OfficeFromCollection[]

    return (
      <section className="w-full max-w-[1310px] px-4 md:px-0 flex flex-col gap-[30px]">
        <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-gezairi-title leading-[42px] tracking-[0.78px]">
          {title}
        </h2>

        <div className="flex flex-col gap-[40px] items-center w-full">
          {/* Map */}
          {mapImageUrl && (
            <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px]">
              <Image
                src={mapImageUrl}
                alt="Global Offices Map"
                fill
                className="object-contain"
              />
            </div>
          )}

          {/* Office Cards Grid - responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[100px] w-full">
            {collectionOffices.map((office, index) => (
              <OfficeCard key={index} office={office} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Original design for manual entries
  const manualOffices = offices as OfficeManual[]

  return (
    <section className="w-full py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-5">
        <h2 className="text-4xl font-bold text-gezairi-blue tracking-wide mb-4">
          {title}
        </h2>
        <div className="w-full h-0.5 bg-gradient-to-r from-gezairi-blue to-transparent mb-4" />

        {subtitle && (
          <p className="text-lg text-gezairi-dark mb-12">{subtitle}</p>
        )}

        {/* World Map */}
        {mapImageUrl && (
          <div className="relative w-full h-[300px] md:h-[400px] rounded-[20px] overflow-hidden mb-16">
            <Image
              src={mapImageUrl}
              alt="Global Offices Map"
              fill
              className="object-contain"
            />
          </div>
        )}

        {/* Offices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manualOffices.map((office, index) => (
            <div
              key={index}
              className="bg-white rounded-[15px] p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gezairi-blue">
                    {office.city}
                  </h3>
                  <p className="text-sm text-gezairi-gray">{office.country}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gezairi-dark">
                {office.address?.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                {office.phone && (
                  <div className="flex items-center gap-2 text-sm text-gezairi-dark">
                    <span>{office.phone}</span>
                  </div>
                )}
                {office.fax && (
                  <div className="flex items-center gap-2 text-sm text-gezairi-dark">
                    <span>Fax: {office.fax}</span>
                  </div>
                )}
                {office.email && (
                  <div className="flex items-center gap-2 text-sm text-gezairi-dark">
                    <a
                      href={`mailto:${office.email}`}
                      className="hover:text-gezairi-blue"
                    >
                      {office.email}
                    </a>
                  </div>
                )}
                {office.website && (
                  <div className="flex items-center gap-2 text-sm text-gezairi-dark">
                    <a
                      href={office.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gezairi-blue"
                    >
                      {office.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
