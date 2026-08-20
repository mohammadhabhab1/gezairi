import type { Block } from 'payload'

export const PartnersGridBlock: Block = {
  slug: 'partnersGrid',
  labels: {
    singular: 'Partners Grid',
    plural: 'Partners Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'SHIPPING AGENCIES IRAQ & SAUDI ARABIA',
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
        description: 'Select which category of partners to display in grid (5 per row)',
      },
    },
  ],
}
