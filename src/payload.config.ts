import { postgresAdapter } from '@payloadcms/db-postgres'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Partners } from '@/collections/Partners'
import { PrivacySections } from '@/collections/PrivacySections'
import { LegalSections } from '@/collections/LegalSections'
import { TermsOfUseSections } from '@/collections/TermsOfUseSection'
import { KVKKSections } from '@/collections/KVKKSections'
import { RegionalOffices } from '@/collections/RegionalOffices'
import { Services } from '@/collections/Services'
import { TimelineEvents } from '@/collections/TimelineEvents'
import { Users } from '@/collections/Users'
import { Values } from '@/collections/Values'
import { CompanyStats } from '@/globals/CompanyStats'
import { Differentiators } from '@/globals/Differentiators'
import { Footer } from '@/globals/Footer'
import { Navigation } from '@/globals/Navigation'
import { SiteSettings } from '@/globals/SiteSettings'
import { WhoWeAre } from '@/globals/WhoWeAre'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Turkish', code: 'tr' },
      { label: 'Arabic', code: 'ar' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [
    Users,
    Media,
    Pages,
    Services,
    Values,
    RegionalOffices,
    Partners,
    TimelineEvents,
    PrivacySections,
    LegalSections,
    TermsOfUseSections,
    KVKKSections,
  ],
  globals: [SiteSettings, CompanyStats, Navigation, Footer, Differentiators, WhoWeAre],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://localhost:5432/gezairi',
    },
    push: process.env.PAYLOAD_DB_PUSH === 'true',
  }),
  sharp,
  plugins: [
    mcpPlugin({
      collections: {
        pages: {
          enabled: true,
          description: 'Website pages with block-based content (hero, stats, vision, values, timeline, services, etc.)',
        },
        services: {
          enabled: true,
          description: 'Shipping and logistics services offered by Gezairi (freight forwarding, customs clearance, etc.)',
        },
        values: {
          enabled: true,
          description: 'Company core values with icons and descriptions',
        },
        'regional-offices': {
          enabled: true,
          description: 'Gezairi regional office locations with contact details (phone, email, coordinates)',
        },
        partners: {
          enabled: true,
          description: 'Shipping line and logistics partners represented by Gezairi',
        },
        'timeline-events': {
          enabled: true,
          description: 'Company history timeline events with dates, descriptions, and images',
        },
        media: {
          enabled: true,
          description: 'Uploaded images and media files',
        },
        'privacy-sections': {
          enabled: true,
          description: 'Privacy policy content sections',
        },
        'legal-sections': {
          enabled: true,
          description: 'Legal notice content sections',
        },
        'terms-of-use-sections': {
          enabled: true,
          description: 'Terms of use content sections',
        },
        'kvkk-sections': {
          enabled: true,
          description: 'KVKK (Turkish data protection law) content sections - Turkish locale only',
        },
      },
    }),
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: {
                prefix: 'media',
              },
            },
            bucket: process.env.S3_BUCKET,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
              region: process.env.S3_REGION || 'us-east-1',
            },
          }),
        ]
      : []),
  ],
})
