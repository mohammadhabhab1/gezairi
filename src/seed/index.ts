/* eslint-disable no-console */
import { config as dotenvConfig } from 'dotenv'
dotenvConfig({ path: '.env.local', override: true })
import { getPayload } from 'payload'
import config from '@payload-config'

import { valuesData } from './data/values'
import { servicesData } from './data/services'
import { regionalOfficesData } from './data/regional-offices'
import { partnersData } from './data/partners'
import { timelineEventsData } from './data/timeline-events'
import { privacySectionsData } from './data/privacy-sections'
import {
  navigationData,
  footerData,
  companyStatsData,
  siteSettingsData,
  differentiatorsData,
  whoWeAreData,
} from './data/globals'

async function seed() {
  console.log('🌱 Starting seed...')

  const payload = await getPayload({ config })

  // Clear existing data
  console.log('🗑️  Clearing existing data...')

  await payload.delete({
    collection: 'values',
    where: { id: { exists: true } },
  })
  await payload.delete({
    collection: 'services',
    where: { id: { exists: true } },
  })
  await payload.delete({
    collection: 'regional-offices',
    where: { id: { exists: true } },
  })
  await payload.delete({
    collection: 'partners',
    where: { id: { exists: true } },
  })
  await payload.delete({
    collection: 'timeline-events',
    where: { id: { exists: true } },
  })
  await payload.delete({
    collection: 'privacy-sections',
    where: { id: { exists: true } },
  })

  // Seed Values
  console.log('📝 Seeding values...')
  for (const value of valuesData) {
    await payload.create({
      collection: 'values',
      data: {
        title: value.title,
        description: value.description,
        order: value.order,
        // Note: icon upload requires media to be uploaded first
        // For now, we'll skip the icon field - it can be added via admin
      },
    })
  }
  console.log(`   ✅ Created ${valuesData.length} values`)

  // Seed Services
  console.log('📝 Seeding services...')
  for (const service of servicesData) {
    await payload.create({
      collection: 'services',
      data: {
        title: service.title,
        slug: service.slug,
        shortDescription: service.shortDescription,
        iconWidth: service.iconWidth,
        iconHeight: service.iconHeight,
        features: service.features?.map((f) => ({ feature: f })) || [],
        order: service.order,
        // Note: icon and heroImage require media to be uploaded first
      },
    })
  }
  console.log(`   ✅ Created ${servicesData.length} services`)

  // Seed Regional Offices
  console.log('📝 Seeding regional offices...')
  for (const office of regionalOfficesData) {
    await payload.create({
      collection: 'regional-offices',
      data: {
        country: office.country,
        cities: office.cities,
        phone1: office.phone1,
        phone2: office.phone2,
        email: office.email,
        latitude: office.latitude,
        longitude: office.longitude,
        order: office.order,
      },
    })
  }
  console.log(`   ✅ Created ${regionalOfficesData.length} regional offices`)

  // Seed Partners
  console.log('📝 Seeding partners...')
  for (const partner of partnersData) {
    await payload.create({
      collection: 'partners',
      data: {
        name: partner.name,
        category: partner.category,
        description: partner.description || '',
        order: partner.order,
        // Note: logo requires media to be uploaded first
      },
    })
  }
  console.log(`   ✅ Created ${partnersData.length} partners`)

  // Seed Timeline Events
  console.log('📝 Seeding timeline events...')
  for (const event of timelineEventsData) {
    await payload.create({
      collection: 'timeline-events',
      data: {
        title: event.title,
        date: event.date,
        description: event.description,
        status: event.status,
        position: event.position,
        order: event.order,
        // Note: image requires media to be uploaded first
      },
    })
  }
  console.log(`   ✅ Created ${timelineEventsData.length} timeline events`)

  // Seed Privacy Sections
  console.log('📝 Seeding privacy sections...')
  for (const section of privacySectionsData) {
    await payload.create({
      collection: 'privacy-sections',
      data: {
        number: section.number,
        title: section.title,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [{ type: 'text', text: section.content }],
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: section.order,
      },
    })
  }
  console.log(`   ✅ Created ${privacySectionsData.length} privacy sections`)

  // Seed Globals
  console.log('📝 Seeding globals...')

  // Site Settings
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: siteSettingsData.siteName,
      tagline: siteSettingsData.tagline,
      contactEmail: siteSettingsData.contactEmail,
      contactPhone: siteSettingsData.contactPhone,
      address: siteSettingsData.address,
      socialLinks: siteSettingsData.socialLinks,
    },
  })
  console.log('   ✅ Updated site settings')

  // Company Stats
  await payload.updateGlobal({
    slug: 'company-stats',
    data: {
      establishedYear: companyStatsData.establishedYear,
      countriesCount: companyStatsData.countriesCount,
      employeesCount: companyStatsData.employeesCount,
      successfulShipments: companyStatsData.successfulShipments,
      totalCustomers: companyStatsData.totalCustomers,
    },
  })
  console.log('   ✅ Updated company stats')

  // Navigation
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      mainMenu: navigationData.mainMenu,
      ctaButton: navigationData.ctaButton,
    },
  })
  console.log('   ✅ Updated navigation')

  // Footer
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      tagline: footerData.tagline,
      officeTitle: footerData.officeTitle,
      city: footerData.city,
      addressLines: footerData.addressLines,
      phoneNumbers: footerData.phoneNumbers,
      email: footerData.email,
      navLinks: footerData.navLinks,
      socialLinks: footerData.socialLinks,
      legalLinks: footerData.legalLinks,
      copyrightText: footerData.copyrightText,
    },
  })
  console.log('   ✅ Updated footer')

  // Differentiators
  await payload.updateGlobal({
    slug: 'differentiators',
    data: {
      leftColumn: differentiatorsData.leftColumn,
      rightColumn: differentiatorsData.rightColumn,
    },
  })
  console.log('   ✅ Updated differentiators')

  // Who We Are
  await payload.updateGlobal({
    slug: 'who-we-are',
    data: {
      highlightedIntro: whoWeAreData.highlightedIntro,
      introText: whoWeAreData.introText,
      additionalParagraphs: whoWeAreData.additionalParagraphs,
      stats: whoWeAreData.stats,
      visionTitle: whoWeAreData.visionTitle,
      visionParagraphs: whoWeAreData.visionParagraphs,
      differentiatorsTitle: whoWeAreData.differentiatorsTitle,
    },
  })
  console.log('   ✅ Updated who-we-are')

  console.log('\n🎉 Seed completed successfully!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error)
  process.exit(1)
})
