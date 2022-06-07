export default {
	type: 'object',
	products: [
		{
			type: 'object',
			properties: {
				count: { type: 'number' },
				description: { type: 'string' },
				id: { type: 'string' },
				price: { type: 'number' },
				title: { type: 'string' },
				image: { type: 'string' },
			},
			required: ['count', 'id', 'title', 'price'],
		},
	],
	required: ['products'],
} as const;
