export default {
	type: 'object',
	properties: {
		productId: 'string',
	},
	required: ['productId'],
} as const;

// type: 'object',
//   properties: {
//   count: { type: 'number' },
//   description: { type: 'string' },
//   id: { type: 'string' },
//   price: { type: 'number' },
//   title: { type: 'string' },
//   image: { type: 'string' },
// },
// required: ['count', 'id', 'title', 'price'],
