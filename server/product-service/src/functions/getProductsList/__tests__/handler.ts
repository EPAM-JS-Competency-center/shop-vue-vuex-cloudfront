import { getProductsList } from '../handler';
import allProducts from '../../../../../../src/api/productList.json';

const headersMock = {
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,GET',
};

describe('test for getProductsList', () => {
	it('without params', async () => {
		const data = await getProductsList(null, null, null);

		expect(data).toBeTruthy();
		expect(data).toEqual({
			body: JSON.stringify({ products: allProducts }),
			statusCode: 200,
			headers: headersMock,
		});
	});
});
