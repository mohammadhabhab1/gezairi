import type { Block } from 'payload'

export const PartnersBlock: Block = {
  slug: 'partners',
  labels: {
    singular: 'Partners Section',
    plural: 'Partners Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'OUR PARTNERS',
    },
    {
      name: 'subtitle',
      type: 'text',
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
        description: 'Select which category of partners to display',
      },
    },
  ],
}
