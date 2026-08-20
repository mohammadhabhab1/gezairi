import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order'],
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
        description: 'URL-friendly identifier (e.g., "air-freight")',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'iconWidth',
      type: 'number',
      defaultValue: 65,
      admin: {
        description: 'Icon display width in pixels',
      },
    },
    {
      name: 'iconHeight',
      type: 'number',
      defaultValue: 65,
      admin: {
        description: 'Icon display height in pixels',
      },
    },
    {
      name: 'shortDescription',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Brief description shown on service cards',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero image for the service detail page',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Full description for the service detail page',
      },
    },
    {
      name: 'features',
      type: 'array',
      admin: {
        description: 'List of features/capabilities for this service',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
  ],
}
