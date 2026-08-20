import type { Block } from 'payload'

export const YearsImageBlock: Block = {
  slug: 'yearsImage',
  labels: {
    singular: 'Years Image Section',
    plural: 'Years Image Sections',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Years Image',
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      label: 'Button Text',
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
      label: 'Button Link',
    },
  ],
}
