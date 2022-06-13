import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import allProducts from '../../../../../src/api/productList.json';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<unknown> = async () => {
	return formatJSONResponse({
		products: allProducts,
	});
};

export const main = middyfy(getProductsList);
