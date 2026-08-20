import { getPayload } from 'payload'
import config from '@payload-config'
import type { TypedLocale } from 'payload'

// Get the Payload instance
export async function getPayloadInstance() {
  return getPayload({ config })
}

// Empty result for paginated queries
const emptyPaginatedResult = {
  docs: [],
  totalDocs: 0,
  page: 1,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
  limit: 100,
  pagingCounter: 1,
  prevPage: null,
  nextPage: null,
}

// Helper to safely execute CMS queries (handles database not being set up)
async function safeQuery<T>(queryFn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await queryFn()
  } catch {
    // Database might not be set up yet, return fallback
    return fallback
  }
}

// Collections

export async function getServices(locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.find({
      collection: 'services',
      sort: 'order',
      limit: 100,
      locale: locale || 'en',
    })
  }, emptyPaginatedResult)
}

export async function getServiceBySlug(slug: string, locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    const result = await payload.find({
      collection: 'services',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      locale: locale || 'en',
    })
    return result.docs[0] || null
  }, null)
}

export async function getValues(locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.find({
      collection: 'values',
      sort: 'order',
      limit: 100,
      locale: locale || 'en',
    })
  }, emptyPaginatedResult)
}

export async function getRegionalOffices(locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.find({
      collection: 'regional-offices',
      sort: 'order',
      limit: 100,
      locale: locale || 'en',
    })
  }, emptyPaginatedResult)
}

export async function getPartners(category?: string, locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.find({
      collection: 'partners',
      where: category
        ? {
            category: {
              equals: category,
            },
          }
        : {},
      sort: 'order',
      limit: 100,
      locale: locale || 'en',
    })
  }, emptyPaginatedResult)
}

export async function getTimelineEvents(locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.find({
      collection: 'timeline-events',
      sort: 'order',
      limit: 100,
      locale: locale || 'en',
    })
  }, emptyPaginatedResult)
}

export async function getPrivacySections(locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.find({
      collection: 'privacy-sections',
      sort: 'order',
      limit: 100,
      locale: locale || 'en',
    })
  }, emptyPaginatedResult)
}

export async function getLegalSections(locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.find({
      collection: 'legal-sections',
      sort: 'order',
      limit: 100,
      locale: locale || 'en',
    })
  }, emptyPaginatedResult)
}

export async function getKVKKSections(locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.find({
      collection: 'kvkk-sections',
      sort: 'order',
      limit: 100,
      locale: locale || 'tr',
    })
  }, emptyPaginatedResult)
}

export async function getTermsOfUseSections(locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.find({
      collection: 'terms-of-use-sections',
      sort: 'order',
      limit: 100,
      locale: locale || 'en',
    })
  }, emptyPaginatedResult)
}

// Globals

export async function getSiteSettings(locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.findGlobal({
      slug: 'site-settings',
      locale: locale || 'en',
    })
  }, null)
}

export async function getCompanyStats(locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.findGlobal({
      slug: 'company-stats',
      locale: locale || 'en',
    })
  }, null)
}

export async function getNavigation(locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.findGlobal({
      slug: 'navigation',
      locale: locale || 'en',
    })
  }, null)
}

export async function getFooter(locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.findGlobal({
      slug: 'footer',
      locale: locale || 'en',
    })
  }, null)
}

export async function getDifferentiators(locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.findGlobal({
      slug: 'differentiators',
      locale: locale || 'en',
    })
  }, null)
}

export async function getWhoWeAre(locale?: TypedLocale) {
  return safeQuery(async () => {
    const payload = await getPayloadInstance()
    return payload.findGlobal({
      slug: 'who-we-are',
      locale: locale || 'en',
    })
  }, null)
}

// Fetch all layout data (navigation + footer) in one call
export async function getLayoutData(locale?: TypedLocale) {
  const [navigation, footer] = await Promise.all([
    getNavigation(locale),
    getFooter(locale),
  ])
  return { navigation, footer }
}

// Helper to get media URL
export function getMediaUrl(media: { url?: string | null } | string | null | undefined): string {
  if (!media) return ''
  if (typeof media === 'string') return media
  return media.url || ''
}
