import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Arkas Partners', value: 'arkas' },
        { label: 'Shipping Agencies', value: 'shipping-agencies' },
        { label: 'Who We Represent', value: 'who-we-represent' },
        { label: 'FedEx Partnership', value: 'fedex' },
      ],
      admin: {
        description: 'Partner category for grouping',
      },
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional description or tagline',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order within category',
      },
    },
  ],
}
