import type { Block } from 'payload'

export const PartnershipCardBlock: Block = {
  slug: 'partnershipCard',
  labels: {
    singular: 'Partnership Card',
    plural: 'Partnership Cards',
  },
  fields: [
    {
      name: 'titleLine1',
      type: 'text',
      required: true,
      defaultValue: 'More Than a Partnership',
      admin: {
        description: 'First line of the title',
      },
    },
    {
      name: 'titleLine2',
      type: 'text',
      required: true,
      defaultValue: 'Express Service',
      admin: {
        description: 'Second line of the title',
      },
    },
    {
      name: 'descriptionLine1',
      type: 'text',
      required: true,
      admin: {
        description: 'First line of description',
      },
    },
    {
      name: 'descriptionLine2',
      type: 'text',
      admin: {
        description: 'Second line of description (optional)',
      },
    },
    {
      name: 'partnerLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Partner logo (recommended size: 289x153)',
      },
    },
  ],
}
