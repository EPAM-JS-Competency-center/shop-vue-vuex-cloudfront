import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import allProducts from '../../../../../src/api/productList.json';
import schema from './schema';

const getProductById: ValidatedEventAPIGatewayProxyEvent<
	typeof schema
> = async ({ pathParameters: { id = '' } }) => {
	const product = allProducts.find(_product => _product.id === id) || null;

	return formatJSONResponse({
		product,
	});
};

export const main = middyfy(getProductById);
