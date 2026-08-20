import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { PageLayoutServer as PageLayout } from '@/components/layout'

interface PageProps {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadHMR({ config })

    const pages = await payload.find({
      collection: 'pages',
      where: {
        status: {
          equals: 'published',
        },
      },
      limit: 100,
    })

    return pages.docs.map((page) => ({
      slug: page.slug,
    }))
  } catch {
    // Database may not be available during Docker build
    return []
  }
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const { slug, locale } = await params
    const payload = await getPayloadHMR({ config })

    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      locale: locale as import('payload').TypedLocale,
    })

    const page = pages.docs[0]

    if (!page) {
      return {}
    }

    return {
      title: page.meta?.title || page.title,
      description: page.meta?.description,
      openGraph: {
        title: page.meta?.title || page.title,
        description: page.meta?.description,
        images: page.meta?.image
          ? [
              {
                url:
                  typeof page.meta.image === 'object'
                    ? page.meta.image.url || ''
                    : '',
              },
            ]
          : [],
      },
    }
  } catch {
    return {}
  }
}

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params
  setRequestLocale(locale)
  const typedLocale = locale as import('payload').TypedLocale

  let page
  try {
    const payload = await getPayloadHMR({ config })

    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
      limit: 1,
      locale: typedLocale,
    })

    page = pages.docs[0]
  } catch {
    // Database tables may not exist yet
    notFound()
  }

  if (!page) {
    notFound()
  }

  return (
    <PageLayout locale={typedLocale}>
      {page.layout && page.layout.length > 0 ? (
        <RenderBlocks blocks={page.layout} />
      ) : (
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
          {page.content && (
            <div className="prose prose-lg max-w-none">
              <p>This page has content that requires a rich text renderer.</p>
            </div>
          )}
        </div>
      )}
    </PageLayout>
  )
}
