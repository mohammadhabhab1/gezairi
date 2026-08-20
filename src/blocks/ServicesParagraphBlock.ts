import type { Block } from 'payload'

export const ServicesParagraphBlock: Block = {
  slug: 'servicesParagraph',
  labels: {
    singular: 'Services Paragraph',
    plural: 'Services Paragraphs',
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      defaultValue: 'GEZAIRI offers a broad range of end-to-end,customized logistics solutions worldwide.',
    },
  ],
}
