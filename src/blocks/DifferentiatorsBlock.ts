import type { Block } from 'payload'

export const DifferentiatorsBlock: Block = {
  slug: 'differentiators',
  labels: {
    singular: 'Differentiators Section',
    plural: 'Differentiators Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'WHAT MAKES US DIFFERENT',
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
