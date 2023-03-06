export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'integer' },
        count: { type: 'integer' },
      },
      required: ['title', 'description', 'price'],
    },
  },
} as const;
