import type { Block } from 'payload'

export const StatsBarBlock: Block = {
  slug: 'statsBar',
  labels: {
    singular: 'Stats Bar',
    plural: 'Stats Bars',
  },
  fields: [
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Icon/Image', value: 'icon' },
            { label: 'Number Value', value: 'number' },
          ],
          defaultValue: 'number',
          required: true,
          admin: {
            description: 'Choose whether to display an icon/image or a number',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'icon',
            description: 'Upload an icon or image to display',
          },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'number',
            placeholder: 'e.g., 22 or 500',
            description: 'Enter the numeric value to display',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., Offices in multiple countries',
          },
        },
        {
          name: 'labelWidth',
          type: 'number',
          admin: {
            description: 'Optional: Label width in pixels (e.g., 137, 159, 175)',
          },
        },
      ],
    },
  ],
}
