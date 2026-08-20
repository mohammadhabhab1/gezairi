import Image from 'next/image'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { PageLayoutServer as PageLayout } from '@/components/layout'
import { getRegionalOffices } from '@/lib/payload'
import type { RegionalOffice } from '@/payload-types'
import { SectionTitle } from '@/components/ui/section-title'

const fallbackOffices = [
  {
    country: 'Lebanon',
    cities: 'Beirut, Tripoli',
    phone1: '+961 1 783783',
    phone2: '+961 1 784784',
    email: 'gezairi@gezairi.com',
  },
  {
    country: 'Iraq',
    cities: 'Baghdad, Erbil,Basra',
    phone1: '+964 1 7181318',
    phone2: '+964 1 7181344',
    email: 'iraq@gezairi.com',
  },
  {
    country: 'Cyprus',
    cities: 'Limassol, Nicosia',
    phone1: '+357 25 827 890',
    phone2: '+357 25 827939',
    email: 'cyprus@gezairi.com',
  },
  {
    country: 'Turkey',
    cities: 'Istanbul, Izmir and Mersin',
    phone1: '+90 850 724 04 84',
    phone2: '+90 212 232 33 61',
    email: 'gezairi@gezairi.com',
  },
  {
    country: 'KSA',
    cities: 'Jeddah',
    phone1: '+964 1 7181318',
    phone2: '+964 1 7181344',
    email: 'iraq@gezairi.com',
  },
  {
    country: 'Georgia',
    cities: 'Poti',
    phone1: '+357 25 827 890',
    phone2: '+357 25 827939',
    email: 'cyprus@gezairi.com',
  },
  {
    country: 'Jordan',
    cities: 'Amman, Aqaba',
    phone1: '+961 1 783783',
    phone2: '+961 1 784784',
    email: 'gezairi@gezairi.com',
  },
  {
    country: 'UAE',
    cities: 'Dubai',
    phone1: '+964 1 7181318',
    phone2: '+964 1 7181344',
    email: 'iraq@gezairi.com',
  },
]

interface OfficeCardData {
  country: string
  cities: string
  phone1: string
  phone2: string
  email: string
}

// Individual pin coordinates — adjust each one independently.
// `left` and `top` are percentages of the map container (986x570 aspect).
const turkeyPin = { left: '48%', top: '18%' }
const cyprusPin = { left: '32%', top: '31%' }
const lebanonPin = { left: '38%', top: '32%' }
const jordanPin = { left: '40%', top: '42%' }
const georgiaPin = { left: '50%', top: '5%' }
const iraqPin = { left: '55%', top: '33%' }
const saudiArabiaPin = { left: '48%', top: '63%' }
const uaePin = { left: '76%', top: '67%' }

interface MapPinProps {
  left: string
  top: string
  label: string
}

function MapPin({ left, top, label }: MapPinProps) {
  return (
    <button
      type="button"
      className="absolute -translate-x-1/2 z-10 group bg-transparent border-0 p-0"
      style={{ left, top }}
      aria-label={label}
      title={label}
    >
      <div className="w-[10px] h-[14px] sm:w-[14px] sm:h-[19px] md:w-[20px] md:h-[27px] lg:w-[25px] lg:h-[33px] rotate-180 relative">
        <Image
          src="/images/gezairi/icons/location-marker-red.svg"
          alt=""
          aria-hidden="true"
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-6 md:-top-7 px-2 py-0.5 rounded bg-gezairi-blue text-white text-[10px] md:text-[12px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity">
        {label}
      </span>
    </button>
  )
}

function transformOffice(office: RegionalOffice): OfficeCardData {
  return {
    country: office.country,
    cities: office.cities,
    phone1: office.phone1 || '',
    phone2: office.phone2 || '',
    email: office.email || '',
  }
}

function OfficeCard({ office }: { office: OfficeCardData }) {
  return (
    <div className="flex flex-col gap-[15px] items-start w-full md:w-[268px]">
      <div className="flex flex-col gap-[10px] items-start w-full">
        <p className="text-[28px] md:text-[36px] font-semibold text-gezairi-blue leading-[25px] tracking-[0.5625px] whitespace-nowrap">
          {office.country}
        </p>
        <p className="text-[16px] md:text-[20px] font-light text-gezairi-blue leading-[25px] tracking-[0.3125px]">
          {office.cities}
        </p>
      </div>
      <div className="flex gap-[10px] items-start px-[5px]">
        <div className="w-[18px] h-[55px] md:w-[23px] md:h-[72px] relative shrink-0">
          <Image
            src="/images/gezairi/icons/contact-icons-blue.svg"
            alt=""
            aria-hidden="true"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <div className="text-[14px] md:text-[20px] font-light text-gezairi-dark leading-[18px] md:leading-[24px] w-[217px]">
          <p><a href={`tel:${office.phone1.replace(/\s/g, '')}`} className="hover:underline">{office.phone1}</a></p>
          <p><a href={`tel:${office.phone2.replace(/\s/g, '')}`} className="hover:underline">{office.phone2}</a></p>
          <p><a href={`mailto:${office.email}`} className="hover:underline">{office.email}</a></p>
        </div>
      </div>
    </div>
  )
}

export default async function RegionalOfficesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('regionalOffices')
  const typedLocale = locale as import('payload').TypedLocale

  const officesResult = await getRegionalOffices(typedLocale)

  const offices: OfficeCardData[] =
    officesResult.docs.length > 0
      ? officesResult.docs.map(transformOffice)
      : fallbackOffices

  return (
    <PageLayout locale={typedLocale}>
      {/* Hero Section */}
      <section className="w-full px-[10px] md:px-5 pt-0">
        <div className="relative w-full max-w-[1332px] overflow-hidden rounded-[20px] bg-gezairi-blue aspect-[16/9] md:aspect-auto md:h-[400px] lg:h-[487px]">
          <Image
            src="/images/gezairi/heroes/newcover.jpg"
            alt="Regional Offices"
            fill
            sizes="(max-width: 768px) 100vw, 1332px"
            className="object-contain md:object-cover"
            priority
          />
          {/* 80 Years Emblem */}
         
          {/* <h1 className="absolute start-[17px] top-[28px] md:start-[31px] lg:top-[47px] text-[32px] md:text-[48px] lg:text-[64px] font-bold text-white leading-[35px] md:leading-tight lg:leading-[84px] w-1/2 md:w-auto">
            {t('title')}
          </h1> */}
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="w-full max-w-[1310px] px-[10px] md:px-0 flex flex-col gap-[30px]">
        <SectionTitle>{t('globalReach')}</SectionTitle>

        <div className="flex flex-col gap-[40px] items-center w-full">
          {/* World Map Image with Location Pins */}
          <div className="relative w-full max-w-[986px] mx-auto aspect-[986/570]">
            <Image
              src="/images/gezairi/map.png"
              alt="Gezairi global offices map"
              fill
              className="object-contain"
              priority
            />
            <MapPin {...turkeyPin} label="Turkey" />
            <MapPin {...cyprusPin} label="Cyprus" />
            <MapPin {...lebanonPin} label="Lebanon" />
            <MapPin {...jordanPin} label="Jordan" />
            <MapPin {...georgiaPin} label="Georgia" />
            <MapPin {...iraqPin} label="Iraq" />
            <MapPin {...saudiArabiaPin} label="Saudi Arabia" />
            <MapPin {...uaePin} label="UAE" />
          </div>

          {/* Office Cards Grid */}
          <div className="w-full max-w-[986px]">
            <div className="grid grid-cols-1 gap-[40px] md:grid-cols-3 md:gap-x-[60px] md:gap-y-[50px] lg:gap-x-[100px] justify-items-start px-[10px]">
              {offices.map((office, index) => (
                <OfficeCard key={index} office={office} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
