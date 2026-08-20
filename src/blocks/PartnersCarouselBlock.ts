import type { Block } from 'payload'

export const PartnersCarouselBlock: Block = {
  slug: 'partnersCarousel',
  labels: {
    singular: 'Partners Carousel',
    plural: 'Partners Carousels',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'WHO WE REPRESENT',
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
        description: 'Select which category of partners to display in carousel (4 per view)',
      },
    },
  ],
}
