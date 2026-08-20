import Image from 'next/image'
import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { PageLayoutServer as PageLayout } from '@/components/layout'
import { getTermsOfUseSections } from '@/lib/payload'
import { ContentSections } from '@/components/homepage/content-sections'
import type { TermsOfUseSection as TermsOfUseSectionType } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Terms of Use | GEZAIRI',
  description:
    'Gezairi Terms of Use - How we collect, use, and protect your data',
}

interface FallbackSection {
  number: string
  title: string
  content: React.ReactNode
}

const fallbackTermsSections: FallbackSection[] = [
  {
    number: '1',
    title: 'Acceptance of Terms',
    content: (
      <p>
        These Terms of Use govern your access to and use of the Website, including all content, services, and features. Your use of the Website indicates your acceptance of these Terms and any future modifications.
      </p>
    ),
  },
  {
    number: '2',
    title: 'Use of the Website',
    content: (
      <>
        <p>
          You may use the Website only for lawful purposes and in accordance with these Terms. You agree not to:
        </p>
        <ul className="list-disc ml-9 mt-2">
          <li>Violate any applicable local, national, or international laws or regulations.</li>
          <li>Engage in any activity that could damage, disable, overburden, or impair the Website.</li>
          <li>Attempt to gain unauthorized access to any part of the Website, accounts, or computer systems connected to it.</li>
          <li>Use the Website to transmit viruses, malware, or any harmful code.</li>
          <li>Copy, reproduce, distribute, or create derivative works from any content on the Website without written permission from GEZAIRI.</li>
        </ul>
      </>
    ),
  },
  {
    number: '3',
    title: 'Account and Registration',
    content: (
      <p>
        Certain features of the Website may require you to create an account. You must provide accurate, complete, and up-to-date information when registering. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. GEZAIRI reserves the right to suspend or terminate accounts that violate these Terms.
      </p>
    ),
  },
  {
    number: '4',
    title: 'Intellectual Property',
    content: (
      <p>
        All content on the Website, including text, graphics, logos, images, videos, and software, is owned by GEZAIRI or its licensors and protected under intellectual property laws. You may not use any content for commercial purposes without prior written consent. All rights not expressly granted herein are reserved by GEZAIRI.
      </p>
    ),
  },
  {
    number: '5',
    title: 'Third-Party Links',
    content: (
      <p>
        The Website may contain links to third-party websites or services. GEZAIRI is not responsible for the content, accuracy, or practices of third-party websites. Accessing linked websites is at your own risk.
      </p>
    ),
  },
  {
    number: '6',
    title: 'Disclaimers',
    content: (
      <p>
        The Website is provided &quot;as is&quot; and &quot;as available.&quot; GEZAIRI makes no warranties, expressed or implied, regarding the Website, its content, or functionality. GEZAIRI does not guarantee uninterrupted or error-free access. Information on the Website may be updated without notice, and GEZAIRI is not responsible for any outdated or inaccurate information.
      </p>
    ),
  },
  {
    number: '7',
    title: 'Limitation of Liability',
    content: (
      <p>
        To the maximum extent permitted by law, GEZAIRI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Website. GEZAIRI&apos;s total liability to you for any claims related to the Website shall not exceed [insert amount or limitation, e.g., &quot;the total fees paid to GEZAIRI in the last 12 months&quot;].
      </p>
    ),
  },
  {
    number: '8',
    title: 'Indemnification',
    content: (
      <>
        <p>
          You agree to indemnify and hold harmless GEZAIRI, its affiliates, employees, and agents from any claims, damages, or expenses arising from:
        </p>
        <ul className="list-disc ml-9 mt-2">
          <li>Your violation of these Terms.</li>
          <li>Your use of the Website.</li>
          <li>Your violation of any applicable law or third-party rights.</li>
        </ul>
      </>
    ),
  },
  {
    number: '9',
    title: 'Modification of Terms',
    content: (
      <p>
        GEZAIRI may modify these Terms of Use at any time by updating this page. Your continued use of the Website after changes are posted constitutes acceptance of the updated Terms.
      </p>
    ),
  },
  {
    number: '10',
    title: 'Governing Law',
    content: (
      <p>
        These Terms are governed by the laws of Lebanon. Any disputes arising from the use of the Website shall be submitted to the exclusive jurisdiction of the courts in Beirut, Lebanon.
      </p>
    ),
  },
  {
    number: '11',
    title: 'Contact Information',
    content: (
      <p>
        For questions or concerns regarding these Terms of Use, please contact:<br />
        <span className="font-semibold">Email:</span> gezairi@gezairi.com<br />
        <span className="font-semibold">Address:</span> Boulos Fayyad Building 4th Floor, Chafic Wazan Avenue, Beirut, Lebanon
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

export default async function TermsOfUsePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const typedLocale = locale as import('payload').TypedLocale

  const termsResult = await getTermsOfUseSections(typedLocale)

  const hasCmsData = termsResult.docs.length > 0
  const cmsSections = hasCmsData
    ? termsResult.docs
        .map((doc: TermsOfUseSectionType) => ({
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
            alt="Terms of Use"
            fill
            sizes="(max-width: 768px) 100vw, 1348px"
            className="object-contain md:object-cover"
            priority
          />
          {/* 80 Years Emblem */}
         
          {/* <h1 className="absolute start-[17px] top-[28px] md:start-[31px] lg:top-[47px] text-[32px] md:text-[42px] lg:text-[64px] font-bold text-white leading-[35px] md:leading-tight lg:leading-[84px] w-1/2 md:w-auto">
            {t('title')}
          </h1> */}
        </div>
      </section>

      {/* Terms of Use Sections */}
      {hasCmsData ? (
        <ContentSections sections={cmsSections} />
      ) : (
        <section className="w-full flex flex-col gap-[50px] items-center py-[10px]">
          {fallbackTermsSections.map((section) => (
            <FallbackSectionComponent key={section.number} section={section} />
          ))}
        </section>
      )}
    </PageLayout>
  )
}
