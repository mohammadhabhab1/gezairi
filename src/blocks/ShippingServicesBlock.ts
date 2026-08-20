import type { Block } from 'payload'

export const ShippingServicesBlock: Block = {
  slug: 'shippingServices',
  labels: {
    singular: 'Shipping Services Section',
    plural: 'Shipping Services Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'SHIPPING SERVICES',
    },
    {
      name: 'leftColumn',
      type: 'array',
      label: 'Left Column Items',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'rightColumn',
      type: 'array',
      label: 'Right Column Items',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
