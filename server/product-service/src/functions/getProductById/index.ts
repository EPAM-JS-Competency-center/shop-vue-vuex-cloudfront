import { handlerPath } from '@libs/handlerResolver';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'GET',
				path: '/products/{id}',
			},
		},
	],
};
