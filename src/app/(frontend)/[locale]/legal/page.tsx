import Image from 'next/image'
import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { PageLayoutServer as PageLayout } from '@/components/layout'
import { getLegalSections } from '@/lib/payload'
import { ContentSections } from '@/components/homepage/content-sections'
import type { LegalSection as LegalSectionType } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Legal | GEZAIRI',
  description:
    'Gezairi Legal - How we collect, use, and protect your data',
}

interface FallbackSection {
  number: string
  title: string
  content: React.ReactNode
}

const fallbackLegalSections: FallbackSection[] = [
  {
    number: '1',
    title: 'Intellectual Property',
    content: (
      <p>
        All content on this Website — including text, graphics, logos, images, videos,
        and software — is the property of GEZAIRI or its licensors, and is protected by
        intellectual property laws, including copyright and trademark law. You may not
        reproduce, modify, distribute, republish, upload, post, transmit or publicly
        display any part of the Website without prior written permission from GEZAIRI. Any
        rights not expressly granted herein are reserved by GEZAIRI.
      </p>
    ),
  },
  {
    number: '2',
    title: 'Use of the Website',
    content: (
      <p>
        You are granted a limited, non-exclusive, non-transferable, revocable license to
        access and use the Website for your own business or personal use, under the
        conditions set out in these Legal Terms. You agree not to use the Website for any
        unlawful or prohibited purpose. You must not: Attempt to gain unauthorized access to the Website, its servers, or its data;
        interfere with the security or integrity of the Website; use the Website in a way
        that could damage, disable, overburden or impair it.
      </p>
    ),
  },
  {
    number: '3',
    title: 'Disclaimers / "As-Is"',
    content: (
      <p>
        The Website and its content are provided &quot;as is,&quot; with no warranties of any
        kind, either express or implied. GEZAIRI disclaims all warranties, including (but
        not limited to) implied warranties of merchantability, fitness for a particular
        purpose, title, and non-infringement. While GEZAIRI strives to ensure the accuracy, completeness, and reliability of
        information on the Website, GEZAIRI does not guarantee that the content is always
        up-to-date or error-free. GEZAIRI does not guarantee that the Website will be
        constantly available, uninterrupted, or free from delays or errors.
      </p>
    ),
  },
  {
    number: '4',
    title: 'Limitation of Liability',
    content: (
      <>
        <p className="mb-4">
          To the maximum extent permitted by applicable law, GEZAIRI and its employees,
          officers, directors, agents, partners, or suppliers will not be liable for any
          indirect, incidental, special, consequential, or punitive damages, including but
          not limited to:
        </p>
        <ul className="list-disc ml-9">
          <li>Loss of profits</li>
          <li>Loss of data</li>
          <li>Business interruption</li>
          <li>Other losses arising out of or in connection with your use of (or inability to use) the Website.</li>
        </ul>
        <p>
          In no event shall GEZAIRI&apos;s total liability to you for all claims arising from
          the use of the Website exceed an amount equal to [you should define a cap — e.g. &quot;the total fees you paid to GEZAIRI in the 12 months preceding the
          claim,&quot; or a fixed amount].
        </p>
        <p>
          These limitations apply even if GEZAIRI has been advised of the possibility of
          such damages.
        </p>
      </>
    ),
  },
  {
    number: '5',
    title: 'Indemnification',
    content: (
      <>
        <p>
          You agree to indemnify, defend, and hold harmless GEZAIRI, its affiliates,
          officers, directors, employees and agents from and against any and all claims,
          liabilities, damages, losses, costs, or expenses (including reasonable legal fees)
          arising from:
        </p>
        <ul className="list-disc ml-9 mt-2">
          <li>Your use of the Website;</li>
          <li>Your violation of these Legal Terms</li>
          <li>Your violation of any third-party right, including intellectual property rights</li>
          <li>Your violation of any applicable law, rule, or regulation.</li>
        </ul>
      </>
    ),
  },
  {
    number: '6',
    title: 'Links to Third-Party Sites',
    content: (
      <p>
        The Website may contain links to third-party websites or services that are not
        owned or controlled by GEZAIRI. GEZAIRI is not responsible for the content,
        privacy policies, or practices of any third-party websites. By using the Website, you acknowledge and agree that GEZAIRI is not liable,
        directly or indirectly, for any loss or damage caused or alleged to be caused by or
        in connection with use of or reliance on any content, goods or services
        available on or through such third-party sites.
      </p>
    ),
  },
  {
    number: '7',
    title: 'Termination',
    content: (
      <p>
        GEZAIRI reserves the right, in its sole discretion, to suspend or terminate your
        access to the Website (or any part thereof) at any time, for any reason
        (including, without limitation, breach of these Legal Terms), without prior notice. Upon termination, your right to use the Website will immediately cease. Sections
        of these Legal Terms that by their nature should survive termination (e.g.,
        intellectual property, indemnification, limitation of liability) will continue to
        apply.
      </p>
    ),
  },
  {
    number: '8',
    title: 'Changes to the Legal Terms',
    content: (
      <p>
        GEZAIRI may modify or change these Legal Terms at any time. Updated terms will
        be posted on the Website, and the &quot;Last Updated&quot; date at the top should be
        revised accordingly. Your continued use of the Website after any modifications constitutes your
        acceptance of the new terms.
      </p>
    ),
  },
  {
    number: '9',
    title: 'Governing Law & Dispute Resolution',
    content: (
      <p>
        These Legal Terms are governed by and construed in accordance with the laws of
        Lebanon. Any disputes arising out of or related to these Legal Terms or your use of the
        Website shall be subject to the exclusive jurisdiction of the courts in [City,
        Lebanon — e.g., Beirut].
      </p>
    ),
  },
  {
    number: '10',
    title: 'Severability',
    content: (
      <p>
        If any provision of these Legal Terms is found to be invalid, illegal, or
        unenforceable by a court of competent jurisdiction, that provision will be enforced to
        the maximum extent permissible, and the remaining provisions will remain in
        full force and effect.
      </p>
    ),
  },
  {
    number: '11',
    title: 'Contact Information',
    content: (
      <p>
        If you have any questions about these Legal Terms, or want to request permission
        for use of content, you can contact us at:<br />
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

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const typedLocale = locale as import('payload').TypedLocale

  const legalResult = await getLegalSections(typedLocale)

  const hasCmsData = legalResult.docs.length > 0
  const cmsSections = hasCmsData
    ? legalResult.docs
        .map((doc: LegalSectionType) => ({
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
            alt="Legal"
            fill
            sizes="(max-width: 768px) 100vw, 1348px"
            className="object-contain md:object-cover"
            priority
          />
          {/* 80 Years Emblem */}
     
        
        </div>
      </section>

      {/* Legal Sections */}
      {hasCmsData ? (
        <ContentSections sections={cmsSections} />
      ) : (
        <section className="w-full flex flex-col gap-[50px] items-center py-[10px]">
          {fallbackLegalSections.map((section) => (
            <FallbackSectionComponent key={section.number} section={section} />
          ))}
        </section>
      )}
    </PageLayout>
  )
}
