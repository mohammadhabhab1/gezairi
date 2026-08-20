import type { Block } from 'payload'

export const VisionBlock: Block = {
  slug: 'vision',
  labels: {
    singular: 'Vision Section',
    plural: 'Vision Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: "FOUNDER'S VISION",
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'founderName',
      type: 'text',
    },
    {
      name: 'founderTitle',
      type: 'text',
    },
    {
      name: 'founderImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
