import type { CollectionConfig } from 'payload'
import {
  HeroBlock,
  YearsImageBlock,
  IntroTextBlock,
  StatsBarBlock,
  VisionBlock,
  ValuesBlock,
  DifferentiatorsBlock,
  TimelineBlock,
  OfficesBlock,
  PartnersCarouselBlock,
  PartnersGridBlock,
  PartnershipCardBlock,
  ServicesGridBlock,
  ServicesCarouselBlock,
  ServicesParagraphBlock,
  ServiceDetailBlock,
  PrivacyBlock,
  LegalBlock,
  ContentSectionsBlock,
  TermsOfUseBlock,
  ShippingServicesBlock,
  DrivingValueTogetherBlock,
} from '@/blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        YearsImageBlock,
        IntroTextBlock,
        StatsBarBlock,
        VisionBlock,
        ValuesBlock,
        DifferentiatorsBlock,
        TimelineBlock,
        OfficesBlock,
        PartnersCarouselBlock,
        PartnersGridBlock,
        PartnershipCardBlock,
        ServicesGridBlock,
        ServicesCarouselBlock,
        ServicesParagraphBlock,
        ServiceDetailBlock,
        PrivacyBlock,
        LegalBlock,
        ContentSectionsBlock,
        TermsOfUseBlock,
        ShippingServicesBlock,
        DrivingValueTogetherBlock
      ],
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Optional rich text content for simple pages',
      },
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Title',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Meta Image',
        },
      ],
    },
  ],
}
