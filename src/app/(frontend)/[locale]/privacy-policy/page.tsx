import Image from 'next/image'
import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { PageLayoutServer as PageLayout } from '@/components/layout'
import { getPrivacySections } from '@/lib/payload'
import { ContentSections } from '@/components/homepage/content-sections'
import type { PrivacySection as PrivacySectionType } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Privacy Policy | GEZAIRI',
  description:
    'Gezairi Privacy Policy - How we collect, use, and protect your data',
}

interface FallbackSection {
  number: string
  title: string
  content: React.ReactNode
}

const fallbackPrivacySections: FallbackSection[] = [
  {
    number: '1',
    title: 'Information We Collect',
    content: (
      <>
        <p className="font-semibold mb-2">a) Personal Information You Provide</p>
        <ul className="list-disc ml-9 mb-4">
          <li>Name, email address, phone number, company name, and job title.</li>
          <li>
            Information submitted through contact forms, account registration, or
            service requests.
          </li>
        </ul>
        <p className="font-semibold mb-2">b) Automatically Collected Information</p>
        <ul className="list-disc ml-9">
          <li>IP address, browser type, operating system, and device information.</li>
          <li>Pages visited, links clicked, and time spent on the Website.</li>
          <li>Cookies and similar tracking technologies.</li>
        </ul>
      </>
    ),
  },
  {
    number: '2',
    title: 'How We Use Your Information',
    content: (
      <>
        <p className="mb-4">We use your information for purposes including:</p>
        <ul className="list-disc ml-9">
          <li>
            Providing and improving our logistics and transportation services.
          </li>
          <li>Responding to inquiries, service requests, and support issues.</li>
          <li>
            Sending updates, notifications, or marketing communications (if you
            have opted in).
          </li>
          <li>
            Analyzing Website usage to enhance performance and user experience.
          </li>
          <li>Complying with legal obligations.</li>
        </ul>
      </>
    ),
  },
  {
    number: '3',
    title: 'Cookies and Tracking',
    content: (
      <ul className="list-disc ml-9">
        <li>
          We use cookies and similar technologies to improve Website functionality
          and user experience.
        </li>
        <li>
          Cookies may also be used for analytics, marketing, and performance
          measurement.
        </li>
        <li>
          You can disable cookies through your browser settings; however, some
          features of the Website may not function properly.
        </li>
      </ul>
    ),
  },
  {
    number: '4',
    title: 'Sharing of Information',
    content: (
      <>
        <p className="mb-4">
          We do <span className="font-semibold">not</span> sell, trade, or rent
          your personal information to third parties.
        </p>
        <p className="mb-4">We may share information with:</p>
        <ul className="list-disc ml-9">
          <li>
            Trusted service providers (e.g., hosting, IT support, analytics,
            shipment tracking) to help deliver our services.
          </li>
          <li>Law enforcement or regulatory authorities if required by law.</li>
          <li>
            Third parties in connection with a business transaction, such as a
            merger or sale of assets.
          </li>
        </ul>
      </>
    ),
  },
  {
    number: '5',
    title: 'Data Retention',
    content: (
      <ul className="list-disc ml-9">
        <li>
          We retain personal data only as long as necessary to provide our
          services and fulfill legal obligations.
        </li>
        <li>
          Data that is no longer required will be securely deleted or anonymized.
        </li>
      </ul>
    ),
  },
  {
    number: '6',
    title: 'Your Rights',
    content: (
      <>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc ml-9 mb-4">
          <li>
            Trusted service providers (e.g., hosting, IT support, analytics,
            shipment tracking) to help deliver our services.
          </li>
          <li>Law enforcement or regulatory authorities if required by law.</li>
          <li>
            Third parties in connection with a business transaction, such as a
            merger or sale of assets.
          </li>
        </ul>
        <p>
          To exercise these rights, please contact us at{' '}
          <span className="font-semibold">[contact@gezairi.com]</span>.
        </p>
      </>
    ),
  },
  {
    number: '7',
    title: 'Data Security',
    content: (
      <>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc ml-9">
          <li>
            We implement appropriate technical and organizational measures to
            protect your personal information.
          </li>
          <li>
            While we strive to protect your data, no online system can be
            guaranteed 100% secure.
          </li>
          <li>
            By using our Website, you acknowledge and accept this risk.
          </li>
        </ul>
      </>
    ),
  },
  {
    number: '8',
    title: "Children's Privacy",
    content: (
      <ul className="list-disc ml-9">
        <li>The Website is not directed to children under 13.</li>
        <li>
          We do not knowingly collect personal information from children. If we
          become aware that we have inadvertently collected data from a child, we
          will take steps to delete it.
        </li>
      </ul>
    ),
  },
  {
    number: '9',
    title: 'Third-Party Links',
    content: (
      <ul className="list-disc ml-9">
        <li>The Website may contain links to external websites.</li>
        <li>
          We are not responsible for the privacy practices or content of
          third-party websites.
        </li>
      </ul>
    ),
  },
  {
    number: '10',
    title: 'Changes to This Privacy Policy',
    content: (
      <ul className="list-disc ml-9">
        <li>
          GEZAIRI may update this Privacy Policy from time to time.
        </li>
        <li>
          Changes will be posted on this page with a revised &quot;Last Updated&quot;
          date.
        </li>
        <li>
          Continued use of the Website constitutes acceptance of any changes.
        </li>
      </ul>
    ),
  },
  {
    number: '11',
    title: 'Contact Us',
    content: (
      <p>
        If you have any questions about this Privacy Policy or our data
        practices, please contact us:
        <br />
        <span className="font-semibold">Email:</span> [gezairi@gezairi.com]
        <br />
        <span className="font-semibold">Address:</span> Boulos Fayyad Building
        4th Floor Chafic Wazan Avenue, Beirut, Lebanon
      </p>
    ),
  },
]

function FallbackSectionComponent({ section }: { section: FallbackSection }) {
  return (
    <div className="flex flex-col gap-[20px] items-start px-4 md:px-[10px] w-full max-w-[1330px]">
      <div className="flex flex-col gap-[10px] items-start w-full">
        <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-gezairi-blue leading-[28px] md:leading-[32px] tracking-[0.55px] md:tracking-[0.78px] relative w-fit">
          {section.number}. {section.title}
        </h2>
      </div>
      <div className="text-[14px] md:text-[16px] lg:text-[20px] font-light text-gezairi-dark leading-[24px] md:leading-[28px] w-full [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6">
        {section.content}
      </div>
    </div>
  )
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const typedLocale = locale as import('payload').TypedLocale

  const privacyResult = await getPrivacySections(typedLocale)

  const hasCmsData = privacyResult.docs.length > 0
  const cmsSections = hasCmsData
    ? privacyResult.docs
        .map((doc: PrivacySectionType) => ({
          number: String(doc.number),
          title: doc.title,
          content: doc.content,
        }))
        .sort((a, b) => Number(a.number) - Number(b.number))
    : []

  return (
    <PageLayout locale={typedLocale}>
      {/* Hero Section */}
      <section className="w-full px-[10px] md:px-5 pt-0">
        <div className="relative w-full max-w-[1348px] overflow-hidden rounded-[20px] bg-gezairi-blue aspect-[16/9] md:aspect-auto md:h-[350px] lg:h-[486px]">
          <Image
            src="/images/gezairi/heroes/newcover.jpg"
            alt="Privacy Policy"
            fill
            sizes="(max-width: 768px) 100vw, 1348px"
            className="object-contain md:object-cover"
            priority
          />
       
        </div>
      </section>

      {/* Privacy Sections */}
      {hasCmsData ? (
        <ContentSections sections={cmsSections} />
      ) : (
        <section className="w-full flex flex-col gap-[50px] items-center py-[10px]">
          {fallbackPrivacySections.map((section) => (
            <FallbackSectionComponent key={section.number} section={section} />
          ))}
        </section>
      )}
    </PageLayout>
  )
}
