import type { Block } from 'payload'

export const ServiceDetailBlock: Block = {
  slug: 'serviceDetail',
  labels: {
    singular: 'Service Detail',
    plural: 'Service Details',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'sideImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
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
