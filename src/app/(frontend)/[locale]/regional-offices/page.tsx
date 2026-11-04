import Image from 'next/image'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { PageLayoutServer as PageLayout } from '@/components/layout'
import { getRegionalOffices } from '@/lib/payload'
import type { RegionalOffice } from '@/payload-types'
import { SectionTitle } from '@/components/ui/section-title'

const fallbackOffices: OfficeCardData[] = [
  {
    country: 'Lebanon',
    cities: 'Beirut, Tripoli',
    phone1: '+961 1 783 783',
    phone2: '+961 1 784 784',
    email: 'lebanon@gezairi.com',
  },
  {
    country: 'Iraq',
    cities: 'Baghdad, Basra and Erbil',
    phone1: '+964 77 044 382 62 (Baghdad)',
    phone2: '+964 79 016 216 13 (Basra)',
    phone2Kind: 'phone',
    phone3: '+964 75 106 339 80 (Erbil)',
    email: 'iraq@gezairi.com',
  },
  {
    country: 'Cyprus',
    cities: 'Limassol, Nicosia',
    phone1: '+357 25 827 800',
    phone2: '+357 25 827 939',
    email: 'cyprus@gezairi.com',
  },
  {
    country: 'Turkey',
    cities: 'Istanbul, Izmir and Mersin',
    phone1: '+90 850 724 04 84',
    phone2: '+90 212 232 33 61',
    phone2Kind: 'phone',
    email: 'turkey@gezairi.com',
  },
  {
    country: 'KSA',
    cities: 'Jeddah, Dammam',
    phone1: '+966 12 581 0244',
    phone2: '',
    email: 'saudiarabia@gezairi.com',
  },
  {
    country: 'Georgia',
    cities: 'Poti',
    phone1: '+995 599 05 78 66',
    phone2: '',
    email: 'georgia@gezairi.com',
  },
  {
    country: 'Jordan',
    cities: 'Amman, Aqaba',
    phone1: '+962 65 686 831',
    phone2: '',
    email: 'jordan@gezairi.com',
  },
  {
    country: 'UAE',
    cities: 'Dubai',
    phone1: '+971 56 429 6918',
    phone2: '',
    email: 'emirates@gezairi.com',
  },
  {
    country: 'Syria',
    cities: 'Damascus, Latakia, Tartous and Aleppo',
    phone1: '+963 11 331 5301',
    phone2: '',
    email: 'syria@gezairi.com',
  },
]

interface OfficeCardData {
  country: string
  cities: string
  phone1: string
  phone2: string
  phone2Kind?: 'phone'
  phone3?: string
  email: string
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

function ContactRow({ icon, value, href }: { icon: string; value: string; href: string }) {
  const labelMatch = value.match(/^(.*?)\s*\((.*)\)$/)
  const main = labelMatch ? labelMatch[1] : value
  const label = labelMatch ? labelMatch[2] : ''
  return (
    <div className="flex gap-[10px] items-start">
      <div className="w-[18px] h-[18px] md:w-[23px] md:h-[23px] relative shrink-0 mt-[1px] md:mt-[1px]">
        <Image src={icon} alt="" aria-hidden="true" fill className="object-contain" unoptimized />
      </div>
      <a
        href={href}
        className="text-[14px] md:text-[20px] font-light text-gezairi-dark leading-[23px] hover:underline"
      >
        {main}
        {label && (
          <span className="ms-[6px] text-[12px] md:text-[15px] text-gezairi-blue whitespace-nowrap">
            ({label})
          </span>
        )}
      </a>
    </div>
  )
}

function OfficeCard({ office }: { office: OfficeCardData }) {
  const tel = (v: string) => `tel:${v.replace(/\(.*?\)|\s/g, '')}`
  const phoneIcon = '/images/gezairi/icons/phone-icon-blue.svg'
  const faxIcon = '/images/gezairi/icons/fax-icon-blue.svg'
  return (
    <div className="flex flex-col gap-[15px] items-start w-full">
      <div className="flex flex-col gap-[10px] items-start w-full">
        <p className="text-[28px] md:text-[36px] font-semibold text-gezairi-blue leading-[25px] tracking-[0.5625px] whitespace-nowrap">
          {office.country}
        </p>
        <p className="text-[16px] md:text-[20px] font-light text-gezairi-blue leading-[25px] tracking-[0.3125px]">
          {office.cities}
        </p>
      </div>
      <div className="flex flex-col gap-[10px] items-start px-[5px] w-full">
        {office.phone1 && <ContactRow icon={phoneIcon} value={office.phone1} href={tel(office.phone1)} />}
        {office.phone2 && (
          <ContactRow
            icon={office.phone2Kind === 'phone' ? phoneIcon : faxIcon}
            value={office.phone2}
            href={tel(office.phone2)}
          />
        )}
        {office.phone3 && <ContactRow icon={phoneIcon} value={office.phone3} href={tel(office.phone3)} />}
        {office.email && (
          <ContactRow icon="/images/gezairi/icons/mail-icon-blue.svg" value={office.email} href={`mailto:${office.email}`} />
        )}
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
          {/* Animated regional offices map */}
          <video
            className="w-full max-w-[1100px] mx-auto aspect-video rounded-[20px] bg-[#f5f5f7]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/videos/our-regional-offices-poster.jpg"
            aria-label="Animated map of Gezairi's nine regional offices: Turkey, Georgia, Cyprus, Lebanon, Syria, Jordan, Iraq, Saudi Arabia and the UAE"
          >
            <source src="/videos/our-regional-offices.mp4" type="video/mp4" />
          </video>

          {/* Office Cards Grid */}
          <div className="w-full max-w-[986px]">
            <div className="grid grid-cols-1 gap-[40px] md:grid-cols-3 md:gap-x-[24px] md:gap-y-[50px] lg:gap-x-[32px] justify-items-start px-[10px]">
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
