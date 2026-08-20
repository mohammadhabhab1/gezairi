import type { Block } from 'payload'

export const ContentSectionsBlock: Block = {
  slug: 'contentSections',
  labels: {
    singular: 'Content Sections',
    plural: 'Content Sections',
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'number',
          type: 'text',
          required: false, // Changed from true to false
          admin: {
            placeholder: 'e.g., 1, 2, 3',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: false, // Changed from true to false
        },
        {
          name: 'content',
          type: 'textarea',
          required: false, // Changed from true to false
        },
      ],
    },
  ],
}
