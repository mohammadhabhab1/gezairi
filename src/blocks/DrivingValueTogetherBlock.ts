import type { Block } from 'payload'

export const DrivingValueTogetherBlock: Block = {
  slug: 'drivingValueTogether',
  labels: {
    singular: 'Driving Value Together Section',
    plural: 'Driving Value Together Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'DRIVING VALUE TOGETHER',
    },
    {
      name: 'leftCard',
      type: 'group',
      label: 'Left Card',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'logoWidth',
          type: 'number',
          required: true,
          defaultValue: 418,
        },
        {
          name: 'logoHeight',
          type: 'number',
          required: true,
          defaultValue: 68,
        },
        {
          name: 'points',
          type: 'array',
          label: 'Bullet Points',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'rightCard',
      type: 'group',
      label: 'Right Card',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'logoWidth',
          type: 'number',
          required: true,
          defaultValue: 227,
        },
        {
          name: 'logoHeight',
          type: 'number',
          required: true,
          defaultValue: 59,
        },
        {
          name: 'points',
          type: 'array',
          label: 'Bullet Points',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
