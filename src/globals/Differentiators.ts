import type { GlobalConfig } from 'payload'

export const Differentiators: GlobalConfig = {
  slug: 'differentiators',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'leftColumn',
      type: 'array',
      admin: {
        description: 'Left column checklist items',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'rightColumn',
      type: 'array',
      admin: {
        description: 'Right column checklist items',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
