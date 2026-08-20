import type { Block } from 'payload'

export const TermsOfUseBlock: Block = {
  slug: 'terms-of-use',
  labels: {
    singular: 'Terms of Use',
    plural: 'Terms of Use',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Terms of Use',
    },
    {
      name: 'lastUpdated',
      type: 'date',
    },
    {
      name: 'introduction',
      type: 'textarea',
    },
    {
      name: 'sections',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., 1, 2, 3',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
