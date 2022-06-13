import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatErrorResponse, formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import allProducts from '../../../../../src/api/productList.json';
import schema from './schema';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<
	typeof schema
> = async event => {
	if (!event?.pathParameters?.id) {
		return formatErrorResponse('Product ID is not defined', 400);
	}

	const product =
		allProducts.find(_product => _product.id === event.pathParameters.id) ||
		null;

	if (!product) {
		return formatErrorResponse('Not Found', 404);
	}

	return formatJSONResponse({
		product,
	});
};

export const main = middyfy(getProductById);
