import type { Block } from 'payload'

export const IntroTextBlock: Block = {
  slug: 'introText',
  labels: {
    singular: 'Intro Text Section',
    plural: 'Intro Text Sections',
  },
  fields: [
    {
      name: 'highlightedText',
      type: 'text',
      required: true,
      label: 'Highlighted Text (Gold)',
    },
    {
      name: 'mainText',
      type: 'textarea',
      required: true,
      label: 'Main Text (follows highlighted text)',
    },
    {
      name: 'additionalParagraphs',
      type: 'array',
      label: 'Additional Paragraphs',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
